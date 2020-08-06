import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

import giveClassesBgImage from "../../assets/images/give-classes-background.png";

const GiveClasses: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web
        </Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={handleNavigateBack}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
};

export default GiveClasses;
