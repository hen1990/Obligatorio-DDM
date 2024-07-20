import { useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text } from "react-native"
import { Picker } from '@react-native-picker/picker';
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const ActualizarEjercicio = ({ navigation }) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para el usuario a hacer update
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);
    const [nombre, setNombre] = useState("");
    const [tipoMaquina, setTipoMaquina] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [id, setId] = useState("");

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

    const searchDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getOneEjercicio(tx, buscarNombre + "%");
        }, readOnly);
        return result
    }

    // Buscar ejercicio
    const buscarEjercicio = async () => {
        if (!buscarNombre.trim()) {
            Alert.alert("El nombre del ejercicio no puede estar vacio.")
            return
        }
        //  llamar a funcion buscar
        const res = await searchDB()
        if (res && res.rows && res.rows.length > 0) {
            setTipoMaquina(res.rows[0].id_tipoMaquina)
            setNombre(res.rows[0].nom_ejercicio)
            setVideoUrl(res.rows[0].videoUrl)
            setId(res.rows[0].id_ejercicio)
        } else {
            Alert.alert("No se encontró ejercicio.")
            setTipoMaquina("")
            setNombre("")
            setVideoUrl("")
            setId("")
        }
    }

    // Actualizar datos
    const updateEjercicio = async () => {

        //Validar Datos
        if (!nombre.trim()) {
            Alert.alert("Ingresar nombre.");
            return false;
        }

        // update
        const res = await updateEjercicioDB()
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito!",
                "Ejercicio actualizado correctamente.",
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
            Alert.alert("No se pudo actualizar el Ejercicio")

        }
    }

    const updateEjercicioDB = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateEjercicio(tx, nombre, tipoMaquina, videoUrl, id);
        }, readOnly);
        return result
    }

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
                <View styles={styles.generalView}>
                    <ScrollView >
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Ejercicio" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese nombre de ejercicio"
                                style={styles.input}
                                onChangeText={(text) => setBuscarNombre(text)}
                            />
                            <MySingleButton title="Buscar" onPress={buscarEjercicio} />

                           
                                <View style={styles.form}>
                                    {/* Ejercicio */}
                                    <Text style={styles.texto}>Nombre</Text>

                                    {/* Nombre*/}
                                    <MyInputText
                                        placeholder="Nombre del ejercicio"
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
                                    {/* VideoUrl*/}
                                    <Text style={styles.texto}>URL del video</Text>
                                    <MyInputText
                                        placeholder="URL de video"
                                        onChangeText={setVideoUrl}
                                        style={styles.input}
                                        value={videoUrl}
                                    />
                                    <MySingleButton
                                        title="Actualizar"
                                        onPress={updateEjercicio}
                                        style={styles.button}
                                    />
                                </View>
                          


                        </KeyboardAvoidingView>
                    </ScrollView>
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
        backgroundColor: "white"
    },
    generalView: {
        flex: 1,
        marginTop: 30,
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 18
    },
    input: {
        padding: 0,
        height: 20
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
    texto: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 40,
        marginTop: 20,
      },
    picker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ecf8e8",
        borderColor: "#E0E0E0",
        borderRadius: 0,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        margin: 30,
        height: 55,
    }
})

export default ActualizarEjercicio;