import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, Image } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const EliminarMaquina = ({ navigation }) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para el usuario a hacer update
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);
    const [tipoMaquina, setTipoMaquina] = useState("");
    const [nombreMaquina, setNombreMaquina] = useState("");
    const [fotoUrl, setFotoUrl] = useState("");
    const [sala, setSala] = useState("");
    const [id, setId] = useState("")

    useEffect(() => {
        const cargarTiposMaquinas = async () => {
            const res = await buscarTiposMaquinas()
            console.log("Resultado de buscarTiposMaquinas:", res);
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setListaTiposMaquinas(elements)
            }
        }
        cargarTiposMaquinas()
    }, []);

    const buscarTiposMaquinas = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllTipoMaquina(tx);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneMaquina(tx, buscarNombre + "%");
        }, readOnly);
        console.log(result)
        return result
    }

    // Buscar maquina
    const buscarMaquina = async () => {
        if (!buscarNombre.trim()) {
            Alert.alert("El nombre de Tipo de Máquina no puede estar vacio.")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if (res && res.rows && res.rows.length > 0) {
            setTipoMaquina(res.rows[0].tipoMaquina)
            setNombreMaquina(res.rows[0].nombre)
            setFotoUrl(res.rows[0].fotoUrl)
            setSala(res.rows[0].sala)
            setId(res.rows[0].id)
        } else {
            Alert.alert("No se encontró Tipo de Máquina.")
            setTipoMaquina("")
            setSala("")
            setId("")
        }
    }

    const deleteMaquina = async () => {
        // Borrar maquina
        const res = await deleteMaquinaDB()
        if (res.rowsAffected > 0) {
          Alert.alert(
            "Exito!",
            "Máquina eliminada.",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("Maquina"),
              },
            ],
            {
              cancelable: false,
            }
          );
        } else {
          Alert.alert("La máquina no existe")
        }
      }

      const deleteMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
          result = await databaseConection.deleteMaquina(tx, id);
        }, readOnly);
        return result
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Tipo de Máquina" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese nombre de Tipo de Máquina"
                                style={{}}
                                onChangeText={(text) => setBuscarNombre(text)}
                            />
                            <MySingleButton title="Buscar" onPress={buscarMaquina} />


                            <View style={styles.generalView}>

                                {nombreMaquina.trim() ? <>
                                    <View key={id} style={styles.listItemView}>

                                        <View style={styles.textContainer}>
                                            <MyText text={nombreMaquina} style={styles.text_data} />
                                            <MyText text={`Nº de Sala: ${sala}`} style={styles.text_data1} />
                                        </View>
                                        <View style={styles.imageContainer}>
                                            <Image
                                                source={{ uri: fotoUrl }}
                                                style={styles.image}
                                            />
                                        </View>


                                    </View>
                                    <MySingleButton title="Eliminar" style={{backgroundColor: 'orange' }}
                  onPress={deleteMaquina} />
                                </> : ""
                                }


                            </View>


                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    generalView: {
        flex: 1
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 20
    },
    text_data: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
        fontSize: 28,
    },
    text_data1: {
        padding: 5,
        marginLeft: 10,
        color: "#2f2f2f",
        alignContent: "center",
        alignItems: "center",
        fontSize: 24,
    },
    listItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        borderBottomWidth: 0,
        borderBottomColor: '#A9DFBF',
    },
    input: {
        padding: 15
    },
    keyBoardView: {
        flex: 1,
        justifyContent: "space-between"
    },
    form: {
        flex: 1,
        marginTop: 25
    },
    button: {
        backgroundColor: 'orange',
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
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    imageContainer: {
        width: 120,
        height: 120,
    },
    image: {
        flex: 1, // Para que la imagen ocupe todo el espacio disponible
        resizeMode: 'cover', // Ajustar tamaño de la imagen según el espacio disponible
    },
})

export default EliminarMaquina;