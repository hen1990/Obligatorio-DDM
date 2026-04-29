import { useState, useEffect, useMemo } from "react"
import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Alert, Text, FlatList } from "react-native"
import { Picker } from '@react-native-picker/picker';
import MySingleButton from "../../components/MySingleButton"
import MyInputText from "../../components/MyInputText"
import MyText from "../../components/MyText"

import databaseConection from "../../database/database-manager";

const ActualizarEjercicio = ({ navigation }) => {
    // estado para busqueda 
    const [buscarNombre, setBuscarNombre] = useState("")
    // estado para el usuario a hacer update
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [nombre, setNombre] = useState("");
    const [tipoMaquina, setTipoMaquina] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [id, setId] = useState("");
    const [originalData, setOriginalData] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

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

    const searchDB = async () => {
        try {
            const result = await databaseConection.getOneEjercicio(buscarNombre);
            return result;
        } catch (error) {
            console.error("Error:", error);
            return { rows: [] };
        }
    };

    // Buscar ejercicio
    const buscarEjercicio = async () => {
        if (!buscarNombre.trim()) {
            Alert.alert("El nombre del ejercicio no puede estar vacio.")
            return
        }
        const res = await searchDB()
        setSearchPerformed(true)
        if (res && res.rows && res.rows.length > 0) {
            let elements = []
            for (let i = 0; i < res.rows.length; i++) {
                elements.push(res.rows[i])
            }
            setEjercicios(elements)
            setSelectedId(null)
            setOriginalData(null)
            setNombre("")
            setTipoMaquina("")
            setVideoUrl("")
            setId("")
        } else {
            setEjercicios([])
            setSelectedId(null)
            setOriginalData(null)
            setNombre("")
            setTipoMaquina("")
            setVideoUrl("")
            setId("")
            Alert.alert("No se encontró ejercicio.")
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
        try {
            const result = await databaseConection.updateEjercicio(nombre, tipoMaquina, videoUrl, id);
            return result;
        } catch (error) {
            console.error("Error:", error);
            return { rowsAffected: 0 };
        }
    };

    const handleEdit = (item) => {
        setSelectedId(item.id)
        setId(item.id)
        setNombre(item.nombre)
        setTipoMaquina(item.maquina)
        setVideoUrl(item.videoUrl || "")
        setOriginalData({
            nombre: item.nombre,
            tipoMaquina: item.maquina,
            videoUrl: item.videoUrl || "",
        })
    }

    const hasChanges = useMemo(() => {
        if (!selectedId || !originalData) {
            return false
        }
        return (
            nombre !== originalData.nombre ||
            String(tipoMaquina) !== String(originalData.tipoMaquina) ||
            (videoUrl || "") !== (originalData.videoUrl || "")
        )
    }, [selectedId, originalData, nombre, tipoMaquina, videoUrl])

    const renderizarListaTiposMaquinas = () => {
        //Agrego atributo "Sin Maquina" a la lista
        let nuevaLista = [...listaTiposMaquinas];
        nuevaLista.unshift({ id: 0, nombre: "Sin Máquina" });
    
        return nuevaLista.map(tipo => (
            <Picker.Item key={tipo.id} label={tipo.nombre} value={tipo.id} />
        ));
    };

    const listItemView = (item) => {
        const isEditing = item.id === selectedId;

        return (
            <View style={styles.presenterView2}>
                <View style={styles.presenterView}>
                    <MyText text={`Ejercicio: ${item.nombre}`} style={styles.presenterText} />
                    <MyText text={`Máquina: ${item.maquina || "Sin Máquina"}`} style={styles.presenterText} />
                    <MyText text={`Video: ${item.videoUrl ? "Sí" : "No"}`} style={styles.presenterText} />
                </View>
                <MySingleButton
                    title="Editar"
                    style={styles.editButton}
                    onPress={() => handleEdit(item)}
                />
                {isEditing && (
                    <View style={styles.form}>
                        <Text style={styles.texto}>Editar Ejercicio</Text>
                        <Text style={styles.label}>Nombre</Text>
                        <MyInputText
                            placeholder="Nombre del ejercicio"
                            onChangeText={setNombre}
                            style={styles.input}
                            value={nombre}
                        />
                        <Text style={styles.label}>Selecciona el tipo de Máquina</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={tipoMaquina}
                                style={{ height: 100, width: "100%" }}
                                onValueChange={(itemValue) => setTipoMaquina(itemValue)}
                            >
                                {renderizarListaTiposMaquinas()}
                            </Picker>
                        </View>
                        <Text style={styles.label}>URL del video</Text>
                        <MyInputText
                            placeholder="URL de video"
                            onChangeText={setVideoUrl}
                            style={styles.input}
                            value={videoUrl}
                        />
                        <MySingleButton
                            title="Actualizar"
                            style={[styles.button, !hasChanges && styles.disabledButton]}
                            onPress={updateEjercicio}
                            disabled={!hasChanges}
                        />
                    </View>
                )}
            </View>
        )
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <KeyboardAvoidingView style={styles.keyBoardView}>
                <MyText text="Buscar Ejercicio" style={styles.text} />
                <MyInputText
                    placeholder="Ingrese nombre de ejercicio"
                    style={styles.searchInput}
                    onChangeText={(text) => setBuscarNombre(text)}
                    value={buscarNombre}
                />
                <MySingleButton title="Buscar" onPress={buscarEjercicio} />
            </KeyboardAvoidingView>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={ejercicios}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={searchPerformed ? <View style={styles.empty}><Text style={styles.emptyText}>No se encontraron ejercicios</Text></View> : null}
                style={styles.flatList}
                contentContainerStyle={styles.flatContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => listItemView(item)}
                keyboardShouldPersistTaps="handled"
            />
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
        padding: 5,
        marginLeft: 25,
        marginRight: 25,
        color: "black",
        height: 40,
    },
    searchInput: {
        padding: 0,
        marginLeft: 25,
        marginRight: 25,
        color: "black",
        height: 20,
    },
    keyBoardView: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 30,
    },
    form: {
        flex: 1,
        marginTop: 15,
        marginBottom: 25,
    },
    button: {
        backgroundColor: 'orange',
    },
    disabledButton: {
        opacity: 0.5,
    },
    texto: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 25,
        marginTop: 15,
    },
    label: {
        fontSize: 16,
        marginLeft: 25,
        marginTop: 15,
    },
    picker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ecf8e8",
        borderColor: "#E0E0E0",
        borderRadius: 0,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        height: 55,
        overflow: 'hidden',
    },
    flatList: {
        backgroundColor: "white",
    },
    flatContainer: {
        paddingBottom: 40,
    },
    headerContainer: {
        backgroundColor: "white",
        paddingBottom: 10,
    },
    presenterView: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
    },
    presenterView2: {
        marginHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingBottom: 15,
    },
    presenterText: {
        marginVertical: 2,
        fontSize: 16,
        color: "black"
    },
    editButton: {
        backgroundColor: 'orange',
        marginHorizontal: 30,
        marginTop: 10,
    }
})

export default ActualizarEjercicio;