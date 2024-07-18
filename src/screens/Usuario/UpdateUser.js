import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const UpdateUser = ( {navigation}) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para el usuario a hacer update
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [ci, setCi] = useState("");
    const [dia, setDia] = useState("")
    const [mes, setMes] = useState("")
    const [anio, setAnio] = useState("")
    const [id, setId] = useState("")

    const updateUserDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            const fechaNac = `${dia}/${mes}/${anio}`;
            result = await databaseConection.updateUser(tx, nombre, apellido, ci, fechaNac, id);
        }, readOnly);
        return result
    }

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneUser(tx, buscarNombre + "%");
        }, readOnly);
        return result
    }

    // TODO funcion que busque al usuario
    const searchUser = async () => {
        if (!buscarNombre.trim()) {
            Alert.alert("El nombre de usuario no puede estar vacio.")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if (res && res.rows && res.rows.length > 0) {
            setNombre(res.rows[0].nom_usuario)
            setApellido(res.rows[0].apellido)
            setCi(res.rows[0].ci)
            setDia(res.rows[0].fechaNac.slice(0, -8))
            setMes(res.rows[0].fechaNac.slice(3, -5))
            setAnio(res.rows[0].fechaNac.slice(6))
            setId(res.rows[0].user_id)
        } else {
            Alert.alert("No se encontró usuario.")
            setNombre("")
            setApellido("")
        }
    }

    // TODO funcion de hacer el update del usuario
    const updateUser = async () => {
        if (!nombre.trim()) {
            Alert.alert("El nombre de usuario no puede estar vacio.")
            return
        }

        if (!apellido.trim()) {
            Alert.alert("El email de usuario no puede estar vacio.")
            return
        }
        // update
        const res = await updateUserDB()
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito!",
                "Usuario actualizado correctamente.",
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
            Alert.alert("No se pudo actualizar el usuario")

        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Usuario" style={styles.texto} />
                            <MyInputText
                                placeholder="Ingrese el nombre de Usuario"
                                style={styles.input}
                                onChangeText={(text) => setBuscarNombre(text)}
                            />
                            <MySingleButton title="Buscar" onPress={searchUser} />


                            <View style={styles.form}>
                                <Text style={styles.texto}>Actualizar Datos</Text>
                                {/* Nombre */}
                                <MyInputText
                                    placeholder="Nombre"
                                    onChangeText={setNombre}
                                    style={styles.input}
                                    value={nombre}
                                />

                                {/* Apellido */}
                                <MyInputText
                                    placeholder="Apellido"
                                    onChangeText={setApellido}
                                    style={styles.input}
                                    value={apellido}
                                />


                                {/* Cedula */}
                                <MyInputText
                                    placeholder="Cédula (Sin puntos ni guión)"
                                    onChangeText={setCi}
                                    maxLength={8}
                                    style={styles.input}
                                    value={ci}
                                />
                                <Text style={styles.texto}>Fecha de Nacimiento: DD/MM/AAAA</Text>
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
                                <MySingleButton
                                    title="Actualizar"
                                    onPress={updateUser}
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
        backgroundColor: "#fcfceb"
    },
    generalView: {
        flex: 1
    },
    input: {
        height: 20,
      },
    texto: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 40,
        marginTop: 8,
        color: "black",
    },
    keyBoardView: {
        flex: 1,
        justifyContent: "space-between",
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
        padding: 0,
        margin: 0,
        height: 20,
        textAlign: "center",
        justifyContent: "center",
        
    },
})

export default UpdateUser