import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  TextInput,
  RectButton,
  BorderlessButton,
} from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

const TeacherList: React.FC = () => {
  const [openFilters, setOpenFilters] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [teachersFavorites, setTeachersFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  async function loadTeacherFavorites() {
    const response = await AsyncStorage.getItem("favorites");
    if (response) {
      const favorites = JSON.parse(response);
      const favoritesTeacherIds = favorites.map(
        (teacher: Teacher) => teacher.id
      );

      setTeachersFavorites(favoritesTeacherIds);
    }
  }

  useFocusEffect(() => {
    loadTeacherFavorites();
  });

  const showFilters = () => {
    setOpenFilters(!openFilters);
  };

  const handleSubmit = async () => {
    loadTeacherFavorites();
    const { data } = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    showFilters();
    setTeachers(data);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton
            onPress={showFilters}
            style={styles.buttonOpenFilter}
          >
            <Feather name="filter" size={20} color="#fff" />
            {openFilters ? (
              <Feather name="chevron-down" size={20} color="#fff" />
            ) : (
              <Feather name="chevron-up" size={20} color="#fff" />
            )}
          </BorderlessButton>
        }
      >
        {openFilters && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(text) => setSubject(text)}
              style={styles.input}
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.grow}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>
            <RectButton style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={teachersFavorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
