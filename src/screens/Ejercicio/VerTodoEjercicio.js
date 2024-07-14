import { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Text,
    Image,
} from "react-native";
import MyText from "../../components/MyText";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const VerTodoEjercicio = () => {
    // estado
    const [maquina, setMaquina] = useState([]);
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);

    useEffect(() => {
        const cargarTiposMaquinas = async () => {
            console.log("holaaa")
            const res = await buscarTiposMaquinas();
            console.log("Resultado de buscarTiposMaquinas:", res);
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setListaTiposMaquinas(elements);
                console.log("tipoMaquinas", elements);
                cargarMaquinas();
            }
        }
        const cargarMaquinas = async () => {
            const res = await buscarMaquinas();
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setMaquina(elements);
                console.log("Maquinas", elements);
            }
        }
        cargarTiposMaquinas();
    }, []);

    const buscarMaquinas = async () => {
        const readOnly = false;
        let result = null;
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllMaquina(tx);
        }, readOnly);
        // seteara test
        return result;
    };

    const buscarTiposMaquinas = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllTipoMaquina(tx);
        }, readOnly);
        return result;
    }

    const listItemView = (item) => {
        const tipoMaquina = listaTiposMaquinas.find(tipo => tipo.id == item.tipoMaquina);
        console.log(tipoMaquina)
        return (
            <View key={item.id} style={styles.listItemView}>
            <View style={styles.textContainer}>
                <MyText text={tipoMaquina.nombre} style={styles.text_data} />
                <MyText text={`Nº de Sala: ${item.sala}`} style={styles.text_data1} />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: tipoMaquina.fotoUrl }}
                    style={styles.image}
                />
            </View>
        </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    {maquina.length ? (
                        <FlatList
                            data={maquina}
                            contentContainerStyle={styles.flatContainer}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                        />
                    ) : (
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}> No se encuentran máquinas</Text>
                        </View>
                    )}
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
        backgroundColor: "#fff",
    },
    generalView: {
        flex: 1,
    },
    listView: {
        marginTop: 0,
    },
    listItemView: {
        backgroundColor: "#d9f1d1",
        padding: 30,
        borderColor: "#c6eab9",
        borderWidth: 2,
    },
    text_data: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
        fontSize: 28,
    },
    text_data1: {
        padding: 5,
        marginLeft: 10,
        color: "#2f2f2f",
        alignContent: "center",
        alignItems: "center",
        fontSize: 24,
    },
    empty: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    emptyText: {
        fontSize: 30,
        alignSelf: "center",
        alignContent: "center",
    },

    listItemView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#A9DFBF',
    },
    textContainer: {
        flex: 1, 
        marginRight: 10,
    },
    imageContainer: {
        width: 120, 
        height: 120,
    },
    image: {
        flex: 1, // Para que la imagen ocupe todo el espacio disponible
        resizeMode: 'cover', // Ajustar tamaño de la imagen según el espacio disponible
    },
});

export default VerTodoEjercicio;
