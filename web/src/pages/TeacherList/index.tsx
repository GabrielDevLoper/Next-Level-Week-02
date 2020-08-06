import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import "./styles.css";

import api from "../../services/api";

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const [teacher, setTeacher] = useState([]);

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    const { data } = await api.get(
      `/classes?week_day=${week_day}&subject=${subject}&time=${time}`
    );

    setTeacher(data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Matemática", label: "Matemática" },
              { value: "Geografia", label: "Geografia" },
              { value: "Inglês", label: "Inglês" },
              { value: "História", label: "História" },
              { value: "Ciências", label: "Ciências" },
              { value: "Português", label: "Português" },
              { value: "Quimica", label: "Quimica" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <input type="submit" className="submit" value="Buscar" />
        </form>
      </PageHeader>

      <main>
        {teacher.map((teache: Teacher) => (
          <TeacherItem key={teache.id} teacher={teache} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
