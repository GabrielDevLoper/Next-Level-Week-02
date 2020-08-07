import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";

const Favorites: React.FC = () => {
  const [teachersFavorites, setTeachersFavorites] = useState([]);

  async function loadTeacherFavorites() {
    const response = await AsyncStorage.getItem("favorites");
    if (response) {
      const favorites = JSON.parse(response);

      setTeachersFavorites(favorites);
    }
  }

  useFocusEffect(() => {
    loadTeacherFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachersFavorites.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
