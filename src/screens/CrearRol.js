import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, View, Text, Platform } from "react-native";
import MyInputText from "../components/MyInputText";
import MyButton from "../components/MyButton";
import { globalStyles } from "./globalStyles";
import databaseConection from "../database/database-manager";

const CrearRol = ({ navigation }) => {
  const [nombre, setNombre] = useState("");

  const saveRol = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre del rol es obligatorio");
      return;
    }

    try {
      const result = await databaseConection.createRol(nombre);
      if (result && result.rowsAffected > 0) {
        Alert.alert("Éxito", "Rol creado correctamente", [
          { text: "OK", onPress: () => navigation.navigate("Rol") }
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el rol (posiblemente ya existe)");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <ScrollView contentContainerStyle={globalStyles.standardPadding}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboard}>
            <Text style={globalStyles.label}>Nombre del Rol *</Text>
            <MyInputText
              placeholder="Ej: Entrenador, Alumno"
              onChangeText={setNombre}
              value={nombre}
            />
            <MyButton onPress={saveRol} title="◽ Guardar" btnColor="#795548" style={globalStyles.btnSmall} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1, backgroundColor: "#efebe9" },
  keyboard: { flex: 1 },
});

export default CrearRol;