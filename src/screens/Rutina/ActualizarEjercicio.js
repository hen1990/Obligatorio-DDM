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
    const [tipoMaquina, setTipoMaquina] = useState("");
    const [nombreMaquina, setNombreMaquina] = useState("");
    const [sala, setSala] = useState("");
    const [id, setId] = useState("")

    useEffect(() => {
        const cargarTiposMaquinas = async () => {
            const res = await buscarTiposMaquinas()
            console.log("Resultado de buscarTiposMaquinas:", res);
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
            result = await databaseConection.getOneMaquina(tx, buscarNombre + "%");
        }, readOnly);
        console.log(result)
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
        if (res && res.rows && res.rows.length > 0) {
            setTipoMaquina(res.rows[0].tipoMaquina)
            setNombreMaquina(res.rows[0].nombre)
            setSala(res.rows[0].sala)
            setId(res.rows[0].id)
        } else {
            Alert.alert("No se encontró Tipo de Máquina.")
            setTipoMaquina("")
            setSala("")
            setId("")
        }
    }

    // Actualizar datos
    const updateMaquina = async () => {
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
            for (i = 0; i < sala.length; i++) {
                var code = sala.charCodeAt(i);
                if (code < 48 || code > 57) {
                    Alert.alert("Sala: Ingrese solo números.");
                    return false;
                }
            }
        }

        // update
        const res = await updateMaquinaDB()
        console.log("res", res)
        if (res.rowsAffected > 0) {
            Alert.alert(
                "Exito!",
                "Máquina actualizado correctamente.",
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
            Alert.alert("No se pudo actualizar la Máquina")

        }
    }

    const updateMaquinaDB = async () => {
        const readOnly = false;
        let result = null
        
        console.log(tipoMaquina)
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.updateMaquina(tx, tipoMaquina, sala, id);
        }, readOnly);
        return result
    }

    const renderizarListaTiposMaquinas = () => {
        return listaTiposMaquinas.map(tipo => (
            <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
                            {/* Formulario */}
                            <MyText text="Buscar Máquina" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese nombre de Máquina"
                                style={{}}
                                onChangeText={(text) => setBuscarNombre(text)}
                            />
                            <MySingleButton title="Buscar" onPress={buscarMaquina} />


                            <View style={styles.form}>
                                {/* Tipo Maquina */}
                                <Text style={styles.texto}>Datos Actuales</Text>
                                <Text style={styles.texto}>{nombreMaquina}</Text>
                                <Text style={styles.texto}>Nº de Sala: {sala}</Text>
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

                                {/* Sala*/}
                                <MyInputText
                                    placeholder="Número de sala"
                                    onChangeText={setSala}
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={sala}
                                />

                                <MySingleButton
                                    title="Actualizar"
                                    onPress={updateMaquina}
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
        flex: 1
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 20
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
})

export default ActualizarEjercicio;