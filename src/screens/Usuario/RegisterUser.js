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
  const anioActual = new Date().getFullYear();

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
  //Nombre
  const validateData = () => {
    if (!nombre.trim()) {
      Alert.alert("Ingresr nombre.");
      return false;
    }
    //Apellido
    if (!apellido.trim()) {
      Alert.alert("Ingresar apellido.");
      return false;
    }
    //Cedula
    if (!ci.trim()) {
      Alert.alert("Ingresar cedula.");
      return false;
    } else {
      for (i = 0; i < ci.length; i++) {
        var code = ci.charCodeAt(i);
        if (code < 48 || code > 57) {
          Alert.alert("Ingrese solo números.");
          return false;
        } else if (ci.length != 8) {
          Alert.alert("Cédula debe contener 8 dígitos.");
          return false;
        }
      }
    }
    //Dia
    if (!dia.trim()) {
      Alert.alert("Ingresar dia.");
      return false;
    } else {
      for (i = 0; i < dia.length; i++) {
        var code = dia.charCodeAt(i);
        if (code < 48 || code > 57) {
          Alert.alert("Ingrese solo números.");
          return false;
        } else if (dia.length != 2) {
          Alert.alert("Día debe contener 2 dígitos.");
          return false;
        } else if (dia < 1 || dia > 31) {
          Alert.alert("Día fuera de rango.");
          return false;
        }
      }
    }
    //Mes
    if (!mes.trim()) {
      Alert.alert("Ingresar mes.");
      return false;
    } else {
      for (i = 0; i < mes.length; i++) {
        var code = mes.charCodeAt(i);
        if (code < 48 || code > 57) {
          Alert.alert("Ingrese solo números.");
          return false;
        } else if (mes.length != 2) {
          Alert.alert("Mes debe contener 2 dígitos.");
          return false;
        } else if (mes < 1 || mes > 12) {
          Alert.alert("Mes fuera de rango.");
          return false;
        }
      }
    }
    //Año
    if (!anio.trim()) {
      Alert.alert("Ingresar año.");
      return false;
    } else {
      for (i = 0; i < anio.length; i++) {
        var code = anio.charCodeAt(i);
        if (code < 48 || code > 57) {
          Alert.alert("Ingrese solo números.");
          return false;
        } else if (anio.length != 4) {
          Alert.alert("Año debe contener 4 dígitos.");
          return false;
        } else if (anio < 1900 || anio > anioActual) {
          Alert.alert("Año fuera de rango.");
          return false;
        }
      }
    }
    if (!nombre.trim()) {
      Alert.alert("Ingresr nombre.");
      return false;
    }
    return true;
  };

  const usuarioExiste = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.usuarioExisteDB(tx, ci);
    }, readOnly);

    return result
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
      const res = await usuarioExiste()
      if (!res.rows[0]) {
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
      } else {
        Alert.alert(
          "Usuario existente.",
          "La cédula ingresada ya se encuentra registrada.",
          [
            {
              text: "Aceptar",

            },

          ],
          {

            cancelable: false,
          }
        )
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
                keyboardType="numeric"
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
                  keyboardType="numeric"
                  style={styles.inputFecha}
                  value={dia}
                />
                {/* Mes */}
                <MyInputText
                  placeholder="Mes"
                  onChangeText={setMes}
                  maxLength={2}
                  keyboardType="numeric"
                  style={styles.inputFecha}
                  value={mes}
                />
                {/* Año */}
                <MyInputText
                  placeholder="Año"
                  onChangeText={setAnio}
                  maxLength={4}
                  keyboardType="numeric"
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
    backgroundColor: "#fcfceb",
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
    padding: 0,
    height: 20,
  },
  enLinea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFecha: {
    padding: 0,
    margin: 0,
    height: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  texto: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 50,
    marginTop: 8
  },
});

export default RegisterUser;
