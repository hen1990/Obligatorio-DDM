import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, FlatList, Alert, Text, Image } from "react-native"
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const EliminarMaquina = ({ navigation }) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para almacenar las maquinas
    const [maquinas, setMaquinas] = useState([]);

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneMaquina(tx, buscarNombre + "%");
        }, readOnly);
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
        if (res.rows.length > 0) {
            let elements = []
            for (let i = 0; i < res.rows.length; i++) {
                elements.push(res.rows[i])
            }
            setMaquinas(elements)
        } else {
            Alert.alert("No se encontró Máquina.")
        }
    }

    //Confirmar Eliminar
    const confirmarEliminar = async (id) => {
        Alert.alert(
            "Se eliminará una máquina de la base de datos.",
            "¿Seguro desea eliminar?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                },
                {
                    text: "Aceptar",
                    onPress: () => deleteMaquina(id),
                },
            ],
        );
    };

    const deleteMaquina = async (id) => {
        // Borrar maquina
        const res = await deleteMaquinaDB(id)
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito!",
                "Máquina eliminada.",
                [
                    {
                        text: "Aceptar",
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

    const deleteMaquinaDB = async (id) => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.deleteMaquina(tx, id);
        }, readOnly);
        return result
    }

    const listItemView = (item) => {
        return (
            <ScrollView styles={styles.generalView}>
                <View style={styles.viewContainer}>
                    <View key={item.id} style={styles.listItemView}>
                        <View style={styles.textContainer}>
                            <MyText text={item.nombre} style={styles.text_data} />
                            <MyText text={`Nº de Sala: ${item.sala}`} style={styles.text_data1} />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.fotoUrl }}
                                style={styles.image}
                            />
                        </View>
                    </View>
                    <MySingleButton title="Eliminar" style={{ backgroundColor: 'orange' }}
                        onPress={() => { confirmarEliminar(item.id) }} />
                </View>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView >
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Tipo de Máquina" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese nombre de Tipo de Máquina"
                                style={styles.input}
                                onChangeText={(text) => setBuscarNombre(text)}
                            />
                            <MySingleButton title="Buscar" onPress={buscarMaquina} />
                        </KeyboardAvoidingView>
                    </ScrollView>

                    {maquinas.length ? (
                        <FlatList style={styles.flatList}
                            data={maquinas}
                            contentContainerStyle={styles.flatContainer}
                            keyExtractor={(item) => item.id.toString()}
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
        backgroundColor: "#e3f7dc",
    },
    generalView: {
        flex: 1
    },
    flatList: {
        height: '70%',
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 18
    },
    text_data: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
        fontSize: 20,
    },
    text_data1: {
        padding: 5,
        marginLeft: 10,
        color: "#2f2f2f",
        alignContent: "center",
        alignItems: "center",
        fontSize: 18,
    },
    listItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 15,
    },
    input: {
        padding: 0,
        height: 20,
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
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    imageContainer: {
        width: 110,
        height: 110,
    },
    image: {
        flex: 1, // Para que la imagen ocupe todo el espacio disponible
        resizeMode: 'cover', // Ajustar tamaño de la imagen según el espacio disponible
    },
    emptyText: {
        fontSize: 20,
        alignSelf: "center",
        alignContent: "center",
    },
})

export default EliminarMaquina;