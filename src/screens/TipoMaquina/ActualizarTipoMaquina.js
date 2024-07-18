import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, Image } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const ActualizarTipoMaquina = ({ navigation }) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para el usuario a hacer update
    const [nombre, setNombre] = useState("");
    const [fotoUrl, setFotoUrl] = useState("");
    const [id, setId] = useState("")

    const updateUserDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateTipoMaquina(tx, nombre, fotoUrl, id);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneTipoMaquina(tx, buscarNombre + "%");
        }, readOnly);
        console.log(result)
        return result
    }

    // TODO funcion que busque al usuario
    const searchUser = async () => {
        if (!buscarNombre.trim()) {
            Alert.alert("El nombre de Tipo de Máquina no puede estar vacio.")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if (res && res.rows && res.rows.length > 0) {
            setNombre(res.rows[0].nombre)
            setFotoUrl(res.rows[0].fotoUrl)
            setId(res.rows[0].id)
        } else {
            Alert.alert("No se encontró Tipo de Máquina.")
            setNombre("")
            setFotoUrl("")
            setId("")
        }
    }

    // TODO funcion de hacer el update
    const updateTipoMaquina = async () => {
        if (!nombre.trim()) {
            Alert.alert("El nombre de Tipo de Máquina no puede estar vacio.")
            return
        }

        if (!fotoUrl.trim()) {
            Alert.alert("El URL de la imagen no puede estar vacio.")
            return
        }
        // update
        const res = await updateUserDB()
        console.log("res", res)
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito!",
                "Tipo de Máquina actualizado correctamente.",
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
                            <MyText text="Buscar Tipo de Máquina" style={styles.texto} />
                            <MyInputText
                                placeholder="Ingrese nombre de Tipo de Máquina"
                                style={{}}
                                onChangeText={(text) => setBuscarNombre(text)}
                            />
                            <MySingleButton title="Buscar" onPress={searchUser} />

                            {/*Presentacion de la FOTO*/}
                            {/* Se utiliza fotoUrl para prevenir error al cargar la imagen*/}
                            {(!fotoUrl) ? "" :
                                <>
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
                                        <View style={styles.presenterView}>
                                            <Image
                                                source={{
                                                    uri: `${fotoUrl}`,
                                                    method: 'POST',
                                                    headers: {
                                                        Pragma: 'no-cache',
                                                    },
                                                    body: 'Your Body goes here',
                                                }}
                                                style={{ width: "100%", height: 300 }}
                                            />
                                        </View>

                                        <MySingleButton
                                            title="Actualizar"
                                            onPress={updateTipoMaquina}
                                            style={styles.button}
                                        />
                                    </View>
                                </>
                            }
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
        backgroundColor: "#ecf8e8"
    },
    generalView: {
        flex: 1
    },
    texto: {
        fontSize: 18,
        textAlign: 'left',
        color: "black",
        marginLeft: 40,
        marginTop: 20
    },
    input: {
        padding: 0,
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
})

export default ActualizarTipoMaquina;