import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Button, Platform, FlatList, Alert, Text, Image, Dimensions } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const EliminarEjercicio = ({ navigation }) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para cargar ejercicios
    const [ejercicio, setEjercicio] = useState([]);

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneEjercicio(tx, buscarNombre + "%");
        }, readOnly);
        return result
    }

    // Buscar ejercicio
    const buscarMaquina = async () => {
        if (!buscarNombre.trim()) {
            Alert.alert("El nombre del ejercicio no puede estar vacio.")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if (res.rows.length > 0) {
            let elements = []
            for (let i = 0; i < res.rows.length; i++) {
                elements.push(res.rows[i])
            }
            setEjercicio(elements)
        } else {
            Alert.alert("No se encontró Tipo de Máquina.")
        }
    }

    const confirmarEliminar = async (id) => {
        Alert.alert(
            "Se eliminará un ejercicio de la base de datos.",
            "¿Seguro desea eliminar?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                },
                {
                    text: "Aceptar",
                    onPress: () => deleteEjercicio(id),
                },
            ],
        );
    };

    const deleteEjercicio = async (id) => {
        // Borrar maquina
        const res = await deleteEjercicioDB(id)
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito!",
                "Ejercicio eliminada.",
                [
                    {
                        text: "Aceptar",
                        onPress: () => navigation.navigate("Ejercicio"),
                    },

                ],
                {

                    cancelable: false,
                }
            );
        } else {
            Alert.alert("Ejercicio no existe")
        }
    }

    const deleteEjercicioDB = async (id) => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteEjercicio(tx, id);
        }, readOnly);
        return result
    }

    const buttonColor = Platform.select({
        ios: 'orange',
        android: 'orange'
    });

    const listItemView = (item) => {
        return (
            <ScrollView styles={styles.generalView}>
                <View key={item.id_ejercicio} style={styles.listItemView}>
                    <View style={styles.textContainer}>
                        <MyText text={item.nom_ejercicio} style={styles.text_data} />
                        <Button title="Eliminar" color={buttonColor}
                            onPress={() => { confirmarEliminar(item.id_ejercicio) }} />
                    </View>
                    <View style={styles.imageContainer}>
                        {item.fotoUrl ? (
                            <Image
                                source={{ uri: item.fotoUrl }}
                                style={styles.image}
                            />
                        ) : (
                            <Image
                                source={{ uri: 'https://st4.depositphotos.com/3265223/24936/v/450/depositphotos_249366040-stock-illustration-fitness-gym-logo-with-strong.jpg' }}
                                style={styles.image}
                            />
                        )}
                    </View>
                </View>
            </ScrollView >
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView style={styles.generalView}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Ejercicio" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese nombre del ejercicio"
                                style={{}}
                                onChangeText={(text) => setBuscarNombre(text)}
                            />
                            <MySingleButton title="Buscar" onPress={buscarMaquina} />
                        </KeyboardAvoidingView>
                    </ScrollView>

                    {ejercicio.length ? (
                        <FlatList style={styles.flatList}
                            data={ejercicio}
                            contentContainerStyle={styles.flatContainer}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                        />
                    ) : (
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}></Text>
                        </View>
                    )}

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
        backgroundColor: "white",
    },
    generalView: {
        flex: 1
    },
    flatList: {
        height: '40%'
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
        fontSize: 26,
    },
    text_data1: {
        padding: 5,
        marginLeft: 10,
        color: "#2f2f2f",
        alignContent: "center",
        alignItems: "center",
        fontSize: 20,
    },
    listItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#673AB7',
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
    emptyText: {
        fontSize: 20,
        alignSelf: "center",
        alignContent: "center",
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

export default EliminarEjercicio;