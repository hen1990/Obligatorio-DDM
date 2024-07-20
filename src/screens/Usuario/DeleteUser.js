import { useState } from "react"
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, FlatList } from "react-native"
import MyInputText from "../../components/MyInputText"
import MySingleButton from "../../components/MySingleButton"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const DeleteUser = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    //  validar username
    if (!nombre.trim()) {
      Alert.alert("Campo requerido!", "Ingrese Nombre, Apellido o C.I. para buscar un usuario.");
      return;
    }
    // consultar por los datos del usuario
    const res = await getUserDB()
    if (res.rows.length > 0) {
      let elements = []
      for (let i = 0; i < res.rows.length; i++) {
        elements.push(res.rows[i])
      }
      setUserData(elements)

    } else {
      Alert.alert("Usuario no encontrado")
      setUserData(null)
    }
  };
  
  const getUserDB = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.getOneUser(tx, nombre + "%");
    }, readOnly);
    return result;
  };

  const deleteUserDB = async (id) => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.deleteUser(tx, id);
    }, readOnly);
    return result
  }

  const deleteUser = async (id) => {
    // TODO hacer funcionalidad de borrado
    const res = await deleteUserDB(id)
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
  const confirmarEliminar = async (id) => {
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
          onPress: () => deleteUser(id),
        },
      ],
    );
  };

  const listItemView = (item) => {
    return (
      <View style={styles.presenterView2}>
        <View style={styles.presenterView}>
          <MyText
            text={`Usuario: ${item.nom_usuario + " " + item.apellido}`}
            style={styles.presenterText}
          />
          <MyText
            text={`Cédula: ${item.ci}`}
            style={styles.presenterText}
          />
          <MyText
            text={`F. Nacimiento: ${item.fechaNac}`}
            style={styles.presenterText}
          />
        </View>
        <MySingleButton title="Eliminar" style={{ backgroundColor: 'orange' }}
          onPress={() => { confirmarEliminar(item.user_id) }} />
      </View>
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
                placeholder="Ingrese Nombre, Apellido o C.I."
                onChangeText={(text) => setNombre(text)}
              />
              <MySingleButton title="Buscar" onPress={getUserData} />
            </KeyboardAvoidingView>
          </ScrollView>
          {(!userData) ? "" :
            <>
              <FlatList style={styles.flatList}
                data={userData}
                contentContainerStyle={styles.flatContainer}
                keyExtractor={(item) => item.user_id.toString()}
                renderItem={({ item }) => listItemView(item)}
              />
            </>}
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
  flatList: {
    height: '70%',
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    fontSize: 30,
    backgroundColor: "2f2f2f",
    padding: 20,
    paddingBottom: 0,
    paddingTop: 0,
  },
  presenterView2: {
    backgroundColor: "2f2f2f",
    borderBottomWidth: 1,
    borderBottomColor: "#AFB42B",
    paddingBottom: 30
  },
  presenterText: {
    margin: 5,
    fontSize: 18,
    color: "black"
  },
});

export default DeleteUser;
