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

const VerTodoMaquina = () => {
    // estado
    const [maquina, setMaquina] = useState([]);
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);

    useEffect(() => {
        const cargarTiposMaquinas = async () => {
            const res = await buscarTiposMaquinas();
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setListaTiposMaquinas(elements);
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
        return (
            <View key={ `${item.id}-${tipoMaquina.id}` } style={styles.listItemView}>
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
                            keyExtractor={(item) => item.id.toString()}
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
        backgroundColor: "#e3f7dc",
    },
    generalView: {
        flex: 1,
    },
    listView: {
        marginTop: 0,
    },
    text_data: {
        padding: 3,
        marginLeft: 5,
        color: "black",
        alignContent: "center",
        alignItems: "center",
        fontSize: 20,
    },
    text_data1: {
        padding: 3,
        marginLeft: 5,
        color: "#2f2f2f",
        alignContent: "center",
        alignItems: "center",
        fontSize: 18,
    },
    empty: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    emptyText: {
        fontSize: 20,
        alignSelf: "center",
        alignContent: "center",
    },

    listItemView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'green',
    },
    textContainer: {
        flex: 1, 
        marginRight: 10,
    },
    imageContainer: {
        width: 110, 
        height: 110,
    },
    image: {
        flex: 1, // Para que la imagen ocupe todo el espacio disponible
        resizeMode: 'cover', // Ajustar tamaño de la imagen según el espacio disponible
    },
});

export default VerTodoMaquina;
