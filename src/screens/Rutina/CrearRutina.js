import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, View, Text, } from "react-native";
import { Picker } from '@react-native-picker/picker';
// importar inputs
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const CrearRutina = ({ navigation }) => {
    // Definir los estados.
    const [usuarios, setUsuarios] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [dia, setDia] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [ejercicioId, setEjercicioId] = useState("");
    const [series, setSeries] = useState("");
    const [repeticiones, setRepeticiones] = useState("");

    useEffect(() => {
        const cargarUsuarios = async () => {
            const res = await buscarUsuarios()
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setUsuarios(elements)
            }
            cargarEjercicios()
        }
        cargarUsuarios()

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
        
    }, []);

    const buscarUsuarios = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllUsers(tx);
        }, readOnly);
        return result
    }

    const buscarEjercicios = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllEjercicio(tx);
        }, readOnly);
        return result
    }

    // Validar Datos
    const validateData = () => {
        //Validar usuario
        if (!usuarioId.toString().trim()) {
            Alert.alert("Ingresar usuario.");
            return false;
        }
        //Validar ejercicio
        if (!ejercicioId.toString().trim()) {
            Alert.alert("Ingresar ejercicio.");
            return false;
        }
        //Validar dia
        if (!dia.trim()) {
            Alert.alert("Ingresar día.");
            return false;
        }
        //Validar series
        if (!series.toString().trim()) {
            Alert.alert("Ingresar Cantidad de series.");
            return false;
        }
        //Validar repeticiones
        if (!repeticiones.toString().trim()) {
            Alert.alert("Ingresar cantidad de repeticiones.");
            return false;
        }
        return true;
    }

    const guardarRutina = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.createRutina(tx, dia, usuarioId, ejercicioId, series, repeticiones);
        }, readOnly);

        return result
    };

    // funcion que se encargue de guardar los datos.
    const crearRutina = async () => {
        if (validateData()) {
            //guardar datos
            const result = await guardarRutina();

            if (result.rowsAffected > 0) {
                //  validar si se guardar los datos
                Alert.alert(
                    "Exito",
                    "Rutina ingresada correctamente.",
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
                Alert.alert("Error al ingresar rutina.")
            }
        }
    };

    const renderizarUsuarios = () => {
        return usuarios.map(tipo => (
            <Picker.Item key={tipo.user_id} label={tipo.nom_usuario} value={tipo.user_id} />
        ));
    };

    const renderizarEjercicios = () => {
        return ejercicios.map(tipo => (
            <Picker.Item key={tipo.id} label={tipo.nom_ejercicio} value={tipo.id} />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboard}>

                            {/* Usuario Lista*/}
                            <Text style={styles.texto}>Seleccionar Usuario</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={usuarioId}
                                    style={{ height: 100, width: "100%" }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setUsuarioId(itemValue)
                                    }>
                                    {renderizarUsuarios()}
                                </Picker>
                            </View>

                            {/* Ejercicio Lista*/}
                            <Text style={styles.texto}>Seleccionar Ejercicio</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={ejercicioId}
                                    style={{ height: 100, width: "100%" }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setEjercicioId(itemValue)
                                    }>
                                    {renderizarEjercicios()}
                                </Picker>
                            </View>

                            {/* Dias Lista*/}
                            <Text style={styles.texto}>Seleccionar Día</Text>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={dia}
                                    style={{ height: 100, width: "100%" }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDia(itemValue)
                                    }>
                                    <Picker.Item key={"Lunes"} label="Lunes" value="Lunes" />
                                    <Picker.Item key={"Martes"} label="Martes" value="Martes" />
                                    <Picker.Item key={"Miercoles"} label="Miercoles" value="Miercoles" />
                                    <Picker.Item key={"Jueves"} label="Jueves" value="Jueves" />
                                    <Picker.Item key={"Viernes"} label="Viernes" value="Viernes" />
                                    <Picker.Item key={"Sabado"} label="Sabado" value="Sabado" />
                                </Picker>
                            </View>

                            {/* Series */}
                            <Text style={styles.texto}>Series</Text>
                            <MyInputText
                                placeholder="Cantidad de series"
                                onChangeText={setSeries}
                                keyboardType="numeric"
                                style={styles.input}
                                value={series}
                            />

                            {/* Repeticiones */}
                            <Text style={styles.texto}>Repeticiones</Text>
                            <MyInputText
                                placeholder="Cantidad de repeticiones"
                                onChangeText={setRepeticiones}
                                keyboardType="numeric"
                                style={styles.input}
                                value={repeticiones}
                            />

                            {/* button */}
                            <MySingleButton onPress={crearRutina} title={"Ingresar"} />
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
    picker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ecf8e8",
        borderColor: "#E0E0E0",
        borderRadius: 0,
        borderWidth: 1,
        margin: 30,
        height: 70,
    }
});

export default CrearRutina;
