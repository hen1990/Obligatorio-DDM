import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, View, Text, } from "react-native";
import { Picker } from '@react-native-picker/picker';
// importar inputs
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const CrearEjercicio = ({ navigation }) => {
    // Definir los estados.
    const [nombre, setNombre] = useState("");
    const [tipoMaquina, setTipoMaquina] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);

    //Buscar tipoMaquina para Listar
    useEffect(() => {
        const cargarTiposMaquinas = async () => {
            const res = await buscarTiposMaquinas()
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

    // Validar Datos
    const validateData = () => {
        //Validar Tipo Maquina
        if (!nombre.toString().trim()) {
            Alert.alert("Ingresar Tipo de Máquina.");
            return false;
        }

        return true;
    }

    const guardarEjercicio = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.createEjercicio(tx, nombre, tipoMaquina, videoUrl);
        }, readOnly);

        return result
    };

    // funcion que se encargue de guardar los datos.
    const crearEjercicio = async () => {
        if (validateData()) {
            //guardar datos
            const result = await guardarEjercicio();
            console.log("guardado: ", result)
            if (result.rowsAffected > 0) {
                //  validar si se guardar los datos
                Alert.alert(
                    "Exito",
                    "Ejercicio ingresada correctamente.",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("Ejercicio"),
                        },
                    ],
                    {
                        cancelable: false,
                    }
                );
            } else {
                Alert.alert("Error al ingresar ejercicio.")
            }
        }
    };

    const renderizarListaTiposMaquinas = () => {
        //Agrego atributo "Sin Maquina" a la lista
        let nuevaLista = [...listaTiposMaquinas];
        nuevaLista.unshift({ id: 0, nombre: "Sin Máquina" });

        return nuevaLista.map(tipo => (
            <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboard}>

                            <Text style={styles.texto}>Nombre</Text>
                            {/* Nombre */}
                            <MyInputText
                                placeholder="Nombre"
                                onChangeText={setNombre}
                                style={styles.input}
                                value={nombre}
                            />

                            <Text style={styles.texto}>Selecciona el tipo de Máquina</Text>
                            {/* Tipo Maquina Lista*/}
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={tipoMaquina}
                                    style={{ height: 100, width: "100%" }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setTipoMaquina(itemValue)
                                    }>
                                    {renderizarListaTiposMaquinas()}
                                </Picker>
                            </View>
                            <Text style={styles.texto}>Video Demostrativo</Text>
                            {/* Sala */}
                            <MyInputText
                                placeholder="URL del video"
                                onChangeText={setVideoUrl}
                                style={styles.input}
                                value={videoUrl}
                            />

                            {/* button */}
                            <MySingleButton onPress={crearEjercicio} title={"Ingresar"} />
                        </KeyboardAvoidingView>
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
        marginTop: 30,
    },
    keyboard: {
        flex: 1,
        justifyContent: "space-between",
    },
    input: {
        padding: 0,
        textAlignVertical: "top",
        height: 20,
    },
    texto: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 50,
        marginTop: 8
    },
    picker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ecf8e8",
        borderColor: "#E0E0E0",
        borderRadius: 0,
        borderWidth: 1,
        margin: 30,
        height: 60,
    }
});

export default CrearEjercicio;
