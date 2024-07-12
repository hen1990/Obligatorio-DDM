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
import MyInputText from "../../components/MyInputText";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const VerTodoMaquina = () => {
    // estado
    const [users, setUsers] = useState([]);
    const [tipoMaquina, setTipoMaquina] = useState([]);

    const getMaquinaDB = async () => {
        const readOnly = false;
        let result = null;
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllMaquina(tx);
        }, readOnly);
        // seteara test
        return result;
    };

    useEffect(() => {
        const loadUser = async () => {
            const res = await getMaquinaDB()
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setUsers(elements)
            }
        }
        loadUser()
    }, []);

    const listItemView = (item) => {
        return (
            <View key={item.id} style={styles.listItemView}>
                <MyText text={`Tipo: ${item.tipoMaquina}`} style={styles.text_data} />
                
                <MyText text={`Nº de Sala: ${item.sala}`} style={styles.text_data1} />


            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    {users.length ? (
                        <FlatList
                            data={users}
                            contentContainerStyle={styles.flatContainer}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                        />
                    ) : (
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}> No se encuentran usuarios</Text>
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
        backgroundColor: "#ecf8e8",
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
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
        fontSize: 20,
    },
    inputStyle: {
        padding: 10,
        margin: 10,
        color: "black",
    },
    presenterView: {
        // flex: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        fontSize: 30,
        height: 100,
        backgroundColor: "2f2f2f",
        borderColor: "2f2f2f",
        borderRadius: 5,
        borderWidth: 0,
        padding: 20
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
});

export default VerTodoMaquina;
