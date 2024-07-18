import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, FlatList } from "react-native"
import { Picker } from '@react-native-picker/picker';
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const ActualizarRutina = ({ navigation }) => {
    // Definir los estados.
    const [usuarios, setUsuarios] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [dia, setDia] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [rutinaId, setRutinaId] = useState("");
    const [ejercicioId, setEjercicioId] = useState(null);
    const [series, setSeries] = useState("");
    const [repeticiones, setRepeticiones] = useState("");

    const [nombre, setNombre] = useState("");
    const [userData, setUserData] = useState(null);
    const [rutinas, setRutinas] = useState([]);

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
            setRutinas([]);

        } else {
            Alert.alert("Usuario no encontrado")
            setUserData(null)
        }
    };

    
    // Validar Datos
    const validateData = () => {
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

    const actualizarRutinas = async () => {
        if (validateData()) {
            //guardar datos
            const result = await actualizarRutinasDB();

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

    const actualizarRutinasDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateRutina(tx, dia, usuarioId, ejercicioId, series, repeticiones, rutinaId);
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

    const renderizarEjercicios = () => {
        return ejercicios.map(tipo => (
            <Picker.Item key={tipo.id} label={tipo.nom_ejercicio} value={tipo.id_ejercicio} />
        ));
    };

    const agruparRutinas = () => {
        const grupos = {};
        rutinas.forEach(item => {
            const {id, nom_usuario, dia_rutina, nom_ejercicio, series, repeticiones } = item;
            if (!grupos[nom_usuario]) {
                grupos[nom_usuario] = {};
            }
            if (!grupos[nom_usuario][dia_rutina]) {
                grupos[nom_usuario][dia_rutina] = [];
            }
            grupos[nom_usuario][dia_rutina].push({id, nom_ejercicio, series, repeticiones });
        });
        return grupos;
    };

    // Función para renderizar cada elemento de la lista
    const listItemView = ( usuario, diaRutina, ejercicios) => {
        return (
            <View key={`${usuario}-${diaRutina}`} style={styles.listItemView}>
                <View style={styles.textContainer}>
                    <Text style={styles.text_data1}>{diaRutina}</Text>
                    {ejercicios.map((ejercicio, index) => (
                        <View key={index} style={styles.ejercicioContainer}>
                            <Text style={styles.text_data1}>{ejercicio.nom_ejercicio}</Text>
                            <View style={styles.series}>
                                <Text style={styles.text_data1}>Series: {ejercicio.series}</Text>
                                <Text style={styles.text_data1}>Repeticiones: {ejercicio.repeticiones}</Text>
                            </View>
                            <MySingleButton onPress={() => {
                                setDia(diaRutina);
                                setEjercicioId(index);
                                setSeries(ejercicio.series);
                                setRepeticiones(ejercicio.repeticiones);
                                setUsuarioId(usuario.user_id)
                           
                          
                            }
                            } title={"Editar"} style={styles.boton} />
                            {ejercicioId == index ? <>
                                <Text style={styles.texto}>Cambiar Día</Text>
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
                                <Text style={styles.text}>Nuevo Ejercicio</Text>
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

                                {/* Series */}
                                <Text style={styles.texto}>Series</Text>
                                <MyInputText
                                    placeholder="Nueva cantidad de series"
                                    onChangeText={setSeries}
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={series}
                                />

                                {/* Repeticiones */}
                                <Text style={styles.texto}>Repeticiones</Text>
                                <MyInputText
                                    placeholder="Nueva cantidad de repeticiones"
                                    onChangeText={setRepeticiones}
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={repeticiones}
                                />

                                {/* button */}
                                <MySingleButton onPress={actualizarRutinas} title={"Buscar Rutinas"} style={styles.boton} />
                            </> : <></>}


                        </View>

                    ))}
                </View>


            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
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
                                    onPress={cargarRutinas} style={{ backgroundColor: 'orange' }} />
                            </>}
                        {rutinas.length ? (
                            <FlatList
                                data={Object.keys(agruparRutinas())}
                                contentContainerStyle={styles.flatContainer}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    const grupos = agruparRutinas();
                                    const usuario = item;
                                    return (
                                        <>
                                            {Object.keys(grupos[usuario]).map(diaRutina => (
                                                listItemView(usuario, diaRutina, grupos[usuario][diaRutina])
                                            ))}
                                        </>
                                    );
                                }}
                            />
                        ) : (
                            <View style={styles.empty}>
                                <Text style={styles.emptyText}>  </Text>
                            </View>
                        )}
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
        backgroundColor: "#e3fafc",
    },
    generalView: {
        flex: 1,
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
        height: 20,
    },
    listItemView: {
        marginVertical: 10,
        padding: 10,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#AFB42B"
    },
    listItemView2: {
        marginVertical: 10,
        padding: 10,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#AFB42B"
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
        borderBottomColor: "#dbdea2",
    },
    ejercicioContainer: {
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: "#AFB42B"
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
        // flex: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        backgroundColor: "2f2f2f",
        borderColor: "2f2f2f",
        borderRadius: 5,
        borderWidth: 0,
        padding: 20
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
        marginBottom: 50,
    }
});



export default ActualizarRutina;