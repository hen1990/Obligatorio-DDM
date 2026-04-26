import { useState, useEffect } from "react";
import {StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, View, Text,} from "react-native";
import { Picker } from '@react-native-picker/picker';
// importar inputs
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";

const CrearMaquina = ({ navigation }) => {
    // Definir los estados.
    const [tipoMaquina, setTipoMaquina] = useState("1");
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);
    const [sala, setSala] = useState("");

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
        try {
            const result = await databaseConection.getAllTipoMaquina();
            return result;
        } catch (error) {
            console.error("Error:", error);
            return { rows: [] };
        }
    };

    // Validar Datos
    const validateData = () => {
        //Validar Tipo Maquina
        if (!tipoMaquina.toString().trim()) {
            Alert.alert("Ingresar Tipo de Máquina.");
            return false;
        }
        //Validar Sala
        if (!sala.trim()) {
            Alert.alert("Ingresar número de sala.");
            return false;
        } else {
            for (let i = 0; i < sala.length; i++) {
                const code = sala.charCodeAt(i);
                if (code < 48 || code > 57) {
                    Alert.alert("Sala: Ingrese solo números.");
                    return false;
                }
            }
        }
        return true;
    }

    const guardarMaquina = async () => {
        try {
            const result = await databaseConection.createMaquina(tipoMaquina, sala);
            return result;
        } catch (error) {
            console.error("Error:", error);
            return { rowsAffected: 0 };
        }
    };

    // funcion que se encargue de guardar los datos.
    const crearMaquina = async () => {
        if (validateData()) {
            //guardar datos
            const result = await guardarMaquina();

            if (result.rowsAffected > 0) {
                //  validar si se guardar los datos
                Alert.alert(
                    "Exito",
                    "Máquina ingresada correctamente.",
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
                Alert.alert("Error al ingresar una máquina.")
            }
        }
    };
    
    const renderizarListaTiposMaquinas = () => {
        return listaTiposMaquinas.map(tipo => (
            <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboard}>

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
                            <Text style={styles.texto}>Número de Sala</Text>
                            {/* Sala */}
                            <MyInputText
                                placeholder="Número de Sala"
                                onChangeText={setSala}
                                keyboardType="numeric"
                                style={styles.input}
                                value={sala}
                            />

                            {/* button */}
                            <MySingleButton onPress={crearMaquina} title={"Ingresar"} />
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
        backgroundColor: "#e3f7dc",
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
        backgroundColor: "#e3f7dc",
        borderColor: "#E0E0E0",
        borderRadius: 0,
        borderWidth: 1,
        margin: 30,
        height: 60,
    }
});

export default CrearMaquina;
