import { useState } from "react"
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from "react-native"
import MyInputText from "../../components/MyInputText"
import MySingleButton from "../../components/MySingleButton"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const DeleteUser = ({navigation}) => {
    const [nombre, setNombre] = useState("");
  const [userData, setUserData] = useState(null);

  const getUserDB = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.getOneUser(tx, nombre + "%");
    }, readOnly);
    return result;
  };

  const getUserData = async () => {
    //  validar username
    if (!nombre.trim()) {
      Alert.alert("El nombre de usuario es requerido");
      return;
    }
    // consultar por los datos del usuario
    const res = await getUserDB()

    if (res.rows.length > 0) {
      setUserData(res.rows[0])

    } else {
      Alert.alert("Usuario no encontrado")
      setUserData(null)
    }
  };

  const deleteUserDB = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.deleteUser(tx, userData.user_id);
    }, readOnly);
    return result
  }

  const deleteUser = async () => {
    // TODO hacer funcionalidad de borrado
    const res = await deleteUserDB()
    if (res.rowsAffected > 0) {
      Alert.alert(
        "Exito!",
        "Usuario eliminado.",
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
      setUserData(null)
    } else {
      Alert.alert("El usuario no existe")
      setUserData(null)
    }
  }

    //Confirmar Eliminar
    const confirmarEliminar = async () => {
      Alert.alert(
        "Se eliminará un usuario de la base de datos.",
        "¿Seguro desea eliminar?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelado"),
          },
          {
            text: "Aceptar",
            onPress: () => deleteUser(),
          },
        ],
      );
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Buscar Usuario" style={styles.text} />
              <MyInputText
                style={styles.inputStyle}
                placeholder="Nombre"
                onChangeText={(text) => setNombre(text)}
              />
            
              <MySingleButton title="Buscar" onPress={getUserData} />
            </KeyboardAvoidingView>

            {(!userData) ? "" :
              <>
                <View style={styles.presenterView}>
                  <MyText
                    text={`Usuario: ${userData == null ? "" : userData.nom_usuario + " " + userData.apellido}`}
                    style={styles.presenterText}
                  />
                  <MyText
                    text={`Cédula: ${userData == null ? "" : userData.ci}`}
                    style={styles.presenterText}
                  />
                  <MyText
                    text={`F. Nacimiento: ${userData == null ? "" : userData.fechaNac}`}
                    style={styles.presenterText}
                  />
                </View>

                <MySingleButton title="Eliminar" style={{backgroundColor: 'orange' }}
                  onPress={confirmarEliminar} />
              </>}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#fcfceb",
  },
  generalView: {
    flex: 1,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
    fontSize: 18,
  },
  inputStyle: {
    padding: 1,
    margin: 1,
    color: "black",
    height: 20,
  },
  presenterView: {
    // flex: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    fontSize: 30,
    backgroundColor: "2f2f2f",
    borderColor: "2f2f2f",
    borderRadius: 5,
    borderWidth: 0,
    padding: 20
  },
  presenterText: {
    margin: 5,
    fontSize: 18,
    color: "black"
  },
});

export default DeleteUser;
