import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text, Image,} from "react-native";
import MyText from "../../components/MyText";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const VerTodosTipoMaquina = () => {
    // estado
    const [users, setUsers] = useState([]);

    const getUsersDB = async () => {
        const readOnly = false;
        let result = null;
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllTipoMaquina(tx);
        }, readOnly);
        // seteara test
        return result;
    };

    useEffect(() => {
        const loadUser = async () => {
            const res = await getUsersDB()
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
            <View key={item.id} style={styles.presenterView}>
                <MyText text={item.nombre} style={styles.presenterText} />

                <Image
                    source={{
                        uri: `${item.fotoUrl}`,
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache',
                        },
                        body: 'Your Body goes here',
                    }}
                    style={{ width: "100%", height: 300 }}
                />

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
                            <Text style={styles.emptyText}> No se encuentran Tipos de máquinas.</Text>
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
        alignItems:  "center",
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
        padding: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        fontSize: 30,
        backgroundColor: "#fff",
        borderColor: "#A9DFBF",
        borderRadius: 5,
        borderWidth: 1,
      },
      presenterText: {
        textAlign: "center",
        margin: 5,
        fontSize: 30,
        color: "black",
        backgroundColor: "#A9DFBF"
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
        fontSize: 16,
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

export default VerTodosTipoMaquina;
