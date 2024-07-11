import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
  Button,
} from "react-native";
// importar inputs
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const RegisterUser = ({ navigation }) => {
  // Definir los estados.
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ci, setCi] = useState("");
  const [dia, setDia] = useState("")
  const [mes, setMes] = useState("")
  const [anio, setAnio] = useState("")

  // funcion de borrar los estados
  const clearData = () => {
    setNombre("");
    setApellido("");
    setCi("");
    setFechaNac("");
    setDia("");
    setMes("");
    setAnio("");
  };

  // Validar datos
  const validateData = () => {
    if (!nombre.trim()) {
      Alert.alert("Ingresr nombre.");
      return false;
    }

    if (!apellido.trim()) {
      Alert.alert("Ingresar apellido.");
      return false;
    }

    if (!ci.trim()) {
      Alert.alert("Ingresar cedula.");
      return false;
    }
    if (!dia.trim()) {
      Alert.alert("Ingresar dia.");
      return false;
    }
    if (!mes.trim()) {
      Alert.alert("Ingresar mes.");
      return false;
    }
    if (!anio.trim()) {
      Alert.alert("Ingresar año.");
      return false;
    }
    return true;
  };

  const saveUser = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
      const fechaNac = `${dia}/${mes}/${anio}`;
      result = await databaseConection.createUser(tx, nombre, apellido, ci, fechaNac);
    }, readOnly);

    return result
  };

  // funcion que se encargue de guardar los datos.
  const registerUser = async () => {
    if (validateData()) {
      //guardar datos
      const result = await saveUser();
      if (result.rowsAffected > 0) {
        //  validar si se guardar los datos
        Alert.alert(
          "Exito",
          "Usuario registrado correctamente.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Usuario"),
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert("Error al registrar usuario.")
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboard}>

              <Text style={styles.texto}>Nombre</Text>
              {/* Nombre */}
              <MyInputText
                placeholder="Nombre"
                onChangeText={setNombre}
                style={styles.input}
                value={nombre}
              />
              <Text style={styles.texto}>Apellido</Text>
              {/* Apellido */}
              <MyInputText
                placeholder="Apellido"
                onChangeText={setApellido}
                style={styles.input}
                value={apellido}
              />

              <Text style={styles.texto}>Cédula</Text>
              {/* Cedula */}
              <MyInputText
                placeholder="Cédula (Sin puntos ni guión)"
                onChangeText={setCi}
                maxLength={8}
                style={styles.input}
                value={ci}
              />
              <Text style={styles.texto}>Fecha de Nacimiento:</Text>
              <View style={styles.enLinea}>
                {/* Fecha */}
                {/* Dia */}
                <MyInputText
                  placeholder="Dia"
                  onChangeText={setDia}
                  maxLength={2}
                  style={styles.inputFecha}
                  value={dia}
                />
                {/* Mes */}
                <MyInputText
                  placeholder="Mes"
                  onChangeText={setMes}
                  maxLength={2}
                  style={styles.inputFecha}
                  value={mes}
                />
                {/* Año */}
                <MyInputText
                  placeholder="Año"
                  onChangeText={setAnio}
                  minLength={4}
                  maxLength={4}
                  style={styles.inputFecha}
                  value={anio}
                />

              </View>
              {/* button */}
              <MySingleButton onPress={registerUser} title={"Guardar"} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#ecf8e8",
  },
  generalView: {
    flex: 1,
    marginTop: 30,
  },
  keyboard: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    padding: 5,
    textAlignVertical: "top",
  },
  enLinea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFecha: {
    padding: 5,
    margin: 0,
    textAlignVertical: "top",
  },
  texto: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 50,
    marginTop: 8
  },
});

export default RegisterUser;
