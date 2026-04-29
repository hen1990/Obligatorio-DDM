import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, FlatList } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"
import { globalStyles } from "../globalStyles";

import databaseConection from "../../database/database-manager";

const UpdateUser = ({ navigation }) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para el usuario a hacer update
    const [userData, setUserData] = useState(null);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [ci, setCi] = useState("");
    const [dia, setDia] = useState("")
    const [mes, setMes] = useState("")
    const [anio, setAnio] = useState("")
    const [id, setId] = useState("")

    const updateUserDB = async () => {
        try {
            const fechaNac = `${dia}/${mes}/${anio}`;
            const result = await databaseConection.updateUser(nombre, apellido, ci, fechaNac, id);
            return result;
        } catch (error) {
            console.error("Error:", error);
            return { rowsAffected: 0 };
        }
    };

    const getUserData = async () => {
        //  validar username
        if (!buscarNombre.trim()) {
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
        try {
            const result = await databaseConection.getOneUser(buscarNombre + "%");
            return result;
        } catch (error) {
            console.error("Error:", error);
            return { rows: [] };
        }
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
            for (let i = 0; i < ci.length; i++) {
                const code = ci.charCodeAt(i);
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
            for (let i = 0; i < dia.length; i++) {
                const code = dia.charCodeAt(i);
                if (code < 48 || code > 57) {
                    Alert.alert("Ingrese solo números.");
                    return false;
                } else if (dia.length != 2) {
                    Alert.alert("Día debe contener 2 dígitos.");
                    return false;
                }
            }
        }
        //Mes
        if (!mes.trim()) {
            Alert.alert("Ingresar mes.");
            return false;
        } else {
            for (let i = 0; i < mes.length; i++) {
                const code = mes.charCodeAt(i);
                if (code < 48 || code > 57) {
                    Alert.alert("Ingrese solo números.");
                    return false;
                } else if (mes.length != 2) {
                    Alert.alert("Mes debe contener 2 dígitos.");
                    return false;
                }
            }
        }
        //Año
        if (!anio.trim()) {
            Alert.alert("Ingresar año.");
            return false;
        } else {
            for (let i = 0; i < anio.length; i++) {
                const code = anio.charCodeAt(i);
                if (code < 48 || code > 57) {
                    Alert.alert("Ingrese solo números.");
                    return false;
                } else if (anio.length != 4) {
                    Alert.alert("Año debe contener 4 dígitos.");
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
        try {
            const result = await databaseConection.usuarioExisteDB(ci);
            return result;
        } catch (error) {
            console.error("Error:", error);
            return { rows: [] };
        }
    };

    const validarUsuario = async () => {
        const res = await usuarioExiste()
        console.log(res.rows[0])
        if (res.rows[0]) {
            if (res.rows[0].user_id != id) {
                return true;
            }
        }
        return false;
    }


        // funcion que se encargue de guardar los datos.
        const updateUser = async () => {
            if (validateData()) {
                let existe = await validarUsuario();
                if (!existe) {
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
                    <MySingleButton title="Editar" style={{ backgroundColor: 'orange' }}
                        onPress={() => {
                            setNombre(item.nom_usuario)
                            setApellido(item.apellido)
                            setCi(item.ci)
                            setDia(item.fechaNac.slice(0, -8))
                            setMes(item.fechaNac.slice(3, -5))
                            setAnio(item.fechaNac.slice(6))
                            setId(item.user_id)
                        }} />
                    {!(item.user_id == id) ? "" :
                        <View style={styles.form}>
                            <Text style={globalStyles.label}>Actualizar Datos</Text>
                            {/* Nombre */}
                            <MyInputText
                                placeholder="Ingrese el nombre"
                                onChangeText={setNombre}
                                value={nombre}
                            />

                            {/* Apellido */}
                            <MyInputText
                                placeholder="Ingrese el apellido"
                                onChangeText={setApellido}
                                value={apellido}
                            />

                            {/* Cedula */}
                            <MyInputText
                                placeholder="12345678"
                                onChangeText={setCi}
                                maxLength={8}
                                value={ci}
                            />

                            <Text style={globalStyles.label}>Fecha de Nacimiento (DD/MM/AAAA)</Text>
                            <View style={styles.enLinea}>
                                {/* Fecha */}
                                {/* Dia */}
                                <MyInputText
                                    placeholder="DD"
                                    onChangeText={setDia}
                                    maxLength={2}
                                    value={dia}
                                />
                                {/* Mes */}
                                <MyInputText
                                    placeholder="MM"
                                    onChangeText={setMes}
                                    maxLength={2}
                                    value={mes}
                                />
                                {/* Año */}
                                <MyInputText
                                    placeholder="AAAA"
                                    onChangeText={setAnio}
                                    minLength={4}
                                    maxLength={4}
                                    value={anio}
                                />
                            </View>
                            <MySingleButton title="Actualizar Datos" style={styles.button}
                                onPress={updateUser} />
                        </View>
                    }
                </View>
            );
        };

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.viewContainer}>
                    <View styles={styles.generalView}>
                        <ScrollView >
                            <KeyboardAvoidingView style={styles.keyBoardView}>
                                <Text style={globalStyles.label}>Buscar Usuario</Text>
                                <MyInputText
                                    placeholder="Ingrese Nombre, Apellido o C.I."
                                    onChangeText={(text) => setBuscarNombre(text)}
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
        flatList: {
            height: '70%',
        },
        input: {
            padding: 1,
            margin: 1,
            color: "black",
            height: 20,
        },
        texto: {
            padding: 10,
            marginLeft: 25,
            color: "black",
            fontSize: 18,
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
    })

    export default UpdateUser;