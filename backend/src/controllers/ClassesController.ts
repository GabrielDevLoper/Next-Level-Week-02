import db from "../database/connection";
import ConvertHourToMinutes from "../utils/ConvertHourToMinutes";
import { Response, Request } from "express";

interface ScheduleItems {
  week_day: number;
  from: string;
  to: string;
}

class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    if (!filters.subject || !filters.week_day || !filters.time) {
      return res.status(400).json({ error: "Faltou os filtros de pesquisas" });
    }

    const timeInMinutes = ConvertHourToMinutes(filters.time as string);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`. `id`")
          .whereRaw("`class_schedule`. `week_day` = ??", [
            Number(filters.week_day),
          ])
          .whereRaw("`class_schedule`. `from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`. `to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", filters.subject as string)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, cost, subject, schedule } = req.body;

    const trx = await db.transaction();

    try {
      const insertedUsersId = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersId[0];

      const inserClassesId = await trx("classes").insert({
        cost,
        subject,
        user_id,
      });

      const class_id = inserClassesId[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItems) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: ConvertHourToMinutes(scheduleItem.from),
          to: ConvertHourToMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({ error: "Erro inesperado" });
    }
  }
}

export default new ClassesController();
