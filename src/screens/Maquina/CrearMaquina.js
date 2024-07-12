import { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    View,
    Text,
    Button,
} from "react-native";
// importar inputs
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const CrearMaquina = ({ navigation }) => {
    // Definir los estados.
    const [tipoMaquina, setTipoMaquina] = useState("");
    const [sala, setSala] = useState("");

    // funcion de borrar los estados
    const clearData = () => {
        setTipoMaquina("");
        setSala("");
    };

    // Validar datos
    //Tipo Maquina
    const validateData = () => {
        if (!tipoMaquina.trim()) {
            Alert.alert("Ingresr Tipo de Máquina.");
            return false;
        }
        //Sala
        if (!sala.trim()) {
            Alert.alert("Ingresar número de sala.");
            return false;
        }
        return true;
    }

    const guardarMaquina = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.createMaquina(tx, tipoMaquina, sala);
        }, readOnly);

        return result
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboard}>

                            <Text style={styles.texto}>Máquina</Text>
                            {/* Tipo Maquina */}
                            <MyInputText
                                placeholder="Tipo de Maquina"
                                onChangeText={setTipoMaquina}
                                style={styles.input}
                                value={tipoMaquina}
                            />
                            <Text style={styles.texto}>Número de Sala</Text>
                            {/* Sala */}
                            <MyInputText
                                placeholder="Número de Sala"
                                onChangeText={setSala}
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
        gap: 30,
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
        padding: 5,
        textAlignVertical: "top",
    },
    texto: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 50,
        marginTop: 8
    },
});

export default CrearMaquina;
