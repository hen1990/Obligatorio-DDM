import { useState } from "react"
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView, Image } from "react-native"
import MyInputText from "../../components/MyInputText"
import MySingleButton from "../../components/MySingleButton"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const EliminarTipoMaquina = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [tipoMaquinaDatos, setTipoMaquinaDatos] = useState(null);

  const getUserDB = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.getOneTipoMaquina(tx, nombre + "%");
    }, readOnly);
    return result;
  };

  const getUserData = async () => {
    //  validar username
    if (!nombre.trim()) {
      Alert.alert("Ingrese un Tipo de Máquina.");
      return;
    }
    // consultar por los datos del usuario
    const res = await getUserDB()

    if (res.rows.length > 0) {
      setTipoMaquinaDatos(res.rows[0])

    } else {
      Alert.alert("Tipo de máquina no encontrado")
      setTipoMaquinaDatos(null)
    }
  };

  const maquinaEnUso = async () => {
    const readOnly = false;
    let result = null
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.maquinaEnUsoBD(tx, tipoMaquinaDatos.id);
    }, readOnly);
    return result
  };

  const deleteTipoMaquinaDB = async () => {
    const readOnly = false;
    const res = await maquinaEnUso()
    if (!res.rows[0]) {
      let result = null
      await db.transactionAsync(async (tx) => {
        result = await databaseConection.deleteTipoMaquina(tx, tipoMaquinaDatos.id);
      }, readOnly);
      return result
    } else {
      Alert.alert(
      "Tipo de Máquina en uso.",
      "Elimine las máquinas que contengan este tipo de máquina.",
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
  };

  const deleteTipoMaquina = async () => {
    // TODO hacer funcionalidad de borrado
    const res = await deleteTipoMaquinaDB()
    if (res.rowsAffected > 0) {
      Alert.alert(
        "Exito!",
        "Tipo de Máquina eliminado.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("TipoMaquina"),
          },
        ],
        {
          cancelable: false,
        }
      );
      setTipoMaquinaDatos(null)
    } else {
      Alert.alert("El Tipo de máquina no existe")
      setTipoMaquinaDatos(null)
    }
  };

  //Confirmar Eliminar
  const confirmarEliminar = async () => {
    Alert.alert(
      "Se eliminará un tipo de máquina de la base de datos.",
      "¿Seguro desea eliminar?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
        },
        {
          text: "Aceptar",
          onPress: () => deleteTipoMaquina(),
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
              <MyText text="Buscar Tipo de Máquina" style={styles.text} />
              <MyInputText
                style={styles.inputStyle}
                placeholder="Tipo de máquina"
                onChangeText={(text) => setNombre(text)}
              />

              <MySingleButton title="Buscar" onPress={getUserData} />
            </KeyboardAvoidingView>

            {(!tipoMaquinaDatos) ? "" :
              <>
                <View style={styles.presenterView}>
                  <MyText
                    text={`${tipoMaquinaDatos == null ? "" : tipoMaquinaDatos.nombre}`}
                    style={styles.presenterText}
                  />
                  <Image
                    source={{
                      uri: `${tipoMaquinaDatos.fotoUrl}`,
                      method: 'POST',
                      headers: {
                        Pragma: 'no-cache',
                      },
                      body: 'Your Body goes here',
                    }}
                    style={{ width: "100%", height: 300 }}
                  />

                </View>

                <MySingleButton title="Eliminar" style={{ backgroundColor: 'orange' }}
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
    backgroundColor: "#ecf8e8",
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
    padding: 0,
    margin: 1,
    color: "black",
    height: 20,
  },
  presenterView: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    padding: 1,
    fontSize: 30,
    backgroundColor: "#fff",
    borderColor: "#A9DFBF",
    borderRadius: 5,
    borderWidth: 1,
  },
  presenterText: {
    textAlign: "center",
    margin: 5,
    fontSize: 30,
    color: "black",
    backgroundColor: "#A9DFBF"
  },
});

export default EliminarTipoMaquina;
