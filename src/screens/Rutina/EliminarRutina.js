import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, FlatList, Dimensions } from "react-native"
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const EliminarRutina = ({ navigation }) => {
    // Definir los estados.
    const [nombre, setNombre] = useState("");
    const [userData, setUserData] = useState(null);
    const [rutinas, setRutinas] = useState([]);

    useEffect(() => {
        const cargarEjercicios = async () => {
            const res = await buscarEjercicios()
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setEjercicios(elements)
            }
        }
        cargarEjercicios()
    }, []);


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
            setNombre(res.rows[0].nom_usuario)
            setRutinas([]);

        } else {
            Alert.alert("Usuario no encontrado")
            setUserData(null)
        }
    };

    const buscarEjercicios = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllEjercicio(tx);
        }, readOnly);
        return result
    }

    const confirmarEliminar = async (id) => {
        Alert.alert(
            "Se eliminará una rutina de la base de datos.",
            "¿Seguro desea eliminar?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                },
                {
                    text: "Aceptar",
                    onPress: () => eliminarRutinas(id),
                },
            ],
        );
    };

    const eliminarRutinas = async (id) => {
        const result = await eliminarRutinasDB(id);
        if (result.rowsAffected > 0) {
            //  validar si se guardar los datos
            Alert.alert(
                "Exito",
                "Rutina eliminada correctamente.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Rutina"),
                    },
                ],
                {
                    cancelable: false,
                }
            );
        } else {
            Alert.alert("Error al eliminar rutina.")
        }
    };

    const eliminarRutinasDB = async (id) => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteRutina(tx, id);
        }, readOnly);

        return result
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

    // Función para renderizar cada elemento de la lista
    const listItemView = (item) => {
        return (
            <View key={`${item.id}+${item.id_usuario}+${item.id_usuario}`} style={styles.listItemView}>
                <View style={styles.textContainer}>
                    <View style={styles.ejercicioContainer}>
                        <Text style={styles.text_data}>{item.dia_rutina}</Text>
                        <Text style={styles.text_data1}>{item.nom_ejercicio}</Text>
                        <View style={styles.series}>
                            <Text style={styles.text_data1}>Series: {item.series}</Text>
                            <Text style={styles.text_data1}>Repeticiones: {item.repeticiones}</Text>
                        </View>
                        <MySingleButton onPress={() => {confirmarEliminar(item.id)}} 
                        title={"Eliminar"} style={styles.boton} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView style={styles.generalView}>
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
                                    onPress={() => {cargarRutinas(), setUserData("")}}  style={{ backgroundColor: 'orange' }} />
                            </>}

                    </ScrollView>

                    {rutinas.length ? (

                        <FlatList style={styles.flatList}
                            data={rutinas}
                            contentContainerStyle={styles.flatContainer}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                        >
                            <ScrollView>

                            </ScrollView> </FlatList>
                    ) : (
                        <View style={styles.empty}></View>
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
        backgroundColor: "#e3fafc",
    },
    generalView: {
        flex: 1,
    },
    flatList: {
        height: '45%',
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
        height: 15,
    },
    listItemView: {
        marginVertical: 10,
        padding: 10,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#00838F"
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
        borderBottomColor: "#acdee3",
    },
    ejercicioContainer: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#00838F"
    },
    input: {
        padding: 0,
        textAlignVertical: "top",
        backgroundColor: "#e3fafc",
        height: 15,
    },
    texto: {
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 40,
        marginTop: 8
    },
    presenterView: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        backgroundColor: "2f2f2f",
        padding: 5
    },
    picker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e3fafc",
        borderColor: "#E0E0E0",
        borderRadius: 0,
        borderWidth: 1,
        margin: 30,
        marginTop: 0,
        marginBottom: 0,
        height: 40,
    },
    boton: {
        marginBottom: 20,
        backgroundColor: '#e05c04',
    },
    emptyText: {
        margin: 30,
        fontSize: 20,
        textAlign: 'center',
    },
});



export default EliminarRutina;