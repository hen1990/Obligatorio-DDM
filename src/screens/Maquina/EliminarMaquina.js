import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const EliminarMaquina = ( {navigation}) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para el usuario a hacer update
    const [tipoMaquina, setTipoMaquina] = useState("");
    const [sala, setSala] = useState("");
    const [id, setId] = useState("")

    const updateMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateMaquina(tx, tipoMaquina, sala, id);
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

    // TODO funcion que busque al usuario
    const searchUser = async () => {
        if (!buscarNombre.trim()) {
            Alert.alert("El nombre de Máquina no puede estar vacio.")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if (res && res.rows && res.rows.length > 0) {
            setTipoMaquina(res.rows[0].nombre)
            setSala(res.rows[0].fotoUrl)
            setId(res.rows[0].id)
        } else {
            Alert.alert("No se encontró Máquina.")
            setTipoMaquina("")
            setSala("")
            setId("")
        }
    }

    // TODO funcion de hacer el update
    const updateMaquina = async () => {
        if (!tipoMaquina.trim()) {
            Alert.alert("El nombre de Máquina no puede estar vacio.")
            return
        }

        if (!sala.trim()) {
            Alert.alert("El número de sala no puede estar vacio.")
            return
        }
        // update
        const res = await updateMaquinaDB()
        console.log("res", res)
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito!",
                "Máquina actualizado correctamente.",
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
        } else {
            Alert.alert("No se pudo actualizar el Tipo de Máquina")

        }
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
                            <MySingleButton title="Buscar" onPress={searchUser} />


                            <View style={styles.form}>
                                <Text style={styles.texto}>Actualizar Datos</Text>
                                {/* Nombre */}
                                <MyInputText
                                    placeholder="Tipo de Máquina"
                                    onChangeText={setNombre}
                                    style={styles.input}
                                    value={nombre}
                                />

                                {/* URL foto*/}
                                <MyInputText
                                    placeholder="URL de la imágen"
                                    onChangeText={setFotoUrl}
                                    style={styles.input}
                                    value={fotoUrl}
                                />

                                <MySingleButton
                                    title="Actualizar"
                                    onPress={updateTipoMaquina}
                                    style={styles.button}
                                />
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
})

export default EliminarMaquina;