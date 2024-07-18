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
    Image,
} from "react-native";
// importar inputs
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const CrearTipoMaquina = ({ navigation }) => {
    // Definir los estados.
    const [nombre, setNombre] = useState("");
    const [fotoUrl, setFotoUrl] = useState("");

    // Validar datos
    const validateData = () => {
        //Nombre
        if (!nombre.trim()) {
            Alert.alert("Ingresr nombre.");
            return false;
        }
        //fotoUrl
        if (!fotoUrl.trim()) {
            Alert.alert("Ingresar URL de la imagen.");
            return false;
        }
        return true;
    }

    const guardarTipoMaquina = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.createTipoMaquina(tx, nombre, fotoUrl);
        }, readOnly);

        return result
    };

    // funcion que se encargue de guardar los datos.
    const crearTipoMaquina = async () => {
        if (validateData()) {
            //guardar datos
            const result = await guardarTipoMaquina();
            if (result.rowsAffected > 0) {
                //  validar si se guardar los datos
                Alert.alert(
                    "Exito",
                    "Tipo de Máquina ingresada correctamente.",
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
                Alert.alert("Error al registrar usuario.")
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboard}>

                            <Text style={styles.texto}>Tipo de Máquina</Text>
                            {/* Nombre */}
                            <MyInputText
                                placeholder="Nombre"
                                onChangeText={setNombre}
                                style={styles.input}
                                value={nombre}
                            />
                            <Text style={styles.texto}>URL de la Imágen</Text>
                            {/* URL de imagen */}
                            <MyInputText
                                placeholder="URL de la imágen"
                                onChangeText={setFotoUrl}
                                style={styles.input}
                                value={fotoUrl}
                            />
                            {/*Presentacion de la FOTO*/}
                            <View style={styles.presenterView}>
                                {fotoUrl.length == 0 ?
                                    <Text style={{ fontSize: 18, margin: 20, lineHeight: 36 }}>
                                        Esperando la imágen... {"\n"}
                                        Aquí verás la imágen al ser cargada.{"\n"}
                                        Si no se visualiza correctamente verifiqueque que la URL sea correcta.
                                    </Text>

                                    :
                                    <Image
                                        source={{
                                            uri: `${fotoUrl}`,
                                            method: 'POST',
                                            headers: {
                                                Pragma: 'no-cache',
                                            },
                                            body: 'Your Body goes here',
                                        }}
                                        style={{ width: "100%", height: "100%" }}
                                    />}
                            </View>
                            {/* button */}
                            <MySingleButton onPress={crearTipoMaquina} title={"Crear"} />
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
        padding: 0,
        height: 20,
    },
    presenterView: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        padding: 1,
        fontSize: 18,
        backgroundColor: "#fff",
        borderColor: "#A9DFBF",
        borderRadius: 5,
        borderWidth: 1,
        height: 300
    },
    texto: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 40,
        marginTop: 8
    },
});

export default CrearTipoMaquina;
