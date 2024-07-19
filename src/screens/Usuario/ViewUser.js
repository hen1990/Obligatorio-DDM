import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView, FlatList, Text,
  View,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const ViewUser = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [userData, setUserData] = useState(null);
  const [rutinas, setRutinas] = useState([]);

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
      setRutinas([]);

    } else {
      Alert.alert("Usuario no encontrado")
      setUserData(null)
    }
  };

  const cargarRutinas = async () => {
    const res = await buscarRutinas();
    if (res.rows.length > 0) {
      let elements = []
      for (let i = 0; i < res.rows.length; i++) {
        elements.push(res.rows[i])
      }
      setRutinas(elements);

    }
  }

  const buscarRutinas = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.getOneRutina(tx, nombre + "%");
    }, readOnly);
    return result;
  }


  const agruparRutinas = () => {
    const grupos = {};
    rutinas.forEach(item => {
      const { nom_usuario, dia_rutina, nom_ejercicio, series, repeticiones } = item;
      if (!grupos[nom_usuario]) {
        grupos[nom_usuario] = {};
      }
      if (!grupos[nom_usuario][dia_rutina]) {
        grupos[nom_usuario][dia_rutina] = [];
      }
      grupos[nom_usuario][dia_rutina].push({ nom_ejercicio, series, repeticiones });
    });
    return grupos;
  };

  // Función para renderizar cada elemento de la lista
  const listItemView = (usuario, diaRutina, ejercicios) => {
    return (
      <View key={`${usuario}-${diaRutina}`} style={styles.listItemView}>
        <View style={styles.textContainer}>
          <Text style={styles.text_data1}>{diaRutina}</Text>
          {ejercicios.map((ejercicio, index) => (
            <View key={index} style={styles.ejercicioContainer}>
              <Text style={styles.text_data1}>{ejercicio.nom_ejercicio}</Text>
              <View style={styles.series}>
                <Text style={styles.text_data1}>Series: {ejercicio.series}</Text>
                <Text style={styles.text_data1}>Repeticiones: {ejercicio.repeticiones}</Text>
              </View>
            </View>
          ))}
        </View>
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

                <MySingleButton title="Ver Rutinas"
                  onPress={() => {cargarRutinas(), setUserData("")}}  style={{backgroundColor: 'orange' }} />
              </>}
          </ScrollView>
          {rutinas.length ? (
            <FlatList style={styles.flatList}
              data={Object.keys(agruparRutinas())}
              contentContainerStyle={styles.flatContainer}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const grupos = agruparRutinas();
                const usuario = item;
                return (
                  <>
                    {Object.keys(grupos[usuario]).map(diaRutina => (
                      listItemView(usuario, diaRutina, grupos[usuario][diaRutina])
                    ))}
                  </>
                );
              }}
            />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>  </Text>
            </View>
          )}
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
  presenterText: {
    margin: 5,
    fontSize: 18,
    color: "black"
  },
  inputStyle: {
    padding: 0,
    margin: 1,
    color: "black",
    height: 20,
  },
  listItemView: {
    marginVertical: 10,
    padding: 10,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#AFB42B"
  },
  textContainer: {
    flexDirection: 'column',
  },
  text_data: {
    fontSize: 18,
    marginBottom: 5,
  },
  text_data1: {
    fontSize: 16,
    marginBottom: 3,
    marginLeft: 20,
  },
  series: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdea2",
  },
  ejercicioContainer: {
    marginLeft: 20,
    padding: 10,
  },
  presenterView: {
      marginLeft: 24,
      marginRight: 24,
      marginTop: 5,
      backgroundColor: "2f2f2f",
      padding: 5
  },
});

export default ViewUser;
