import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import MyText from "../../components/MyText";

import databaseConection from "../../database/database-manager";

const ViewAllUsers = () => {
  // estado
  const [users, setUsers] = useState([]);

  const getUsersDB = async () => {
    try {
      const result = await databaseConection.getAllUsers();
      return result;
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      return { rows: [] };
    }
  };

  useEffect(() => {
    const loadUser = async () => {
        const res = await getUsersDB()
        if(res && res.rows && res.rows.length > 0) {
            let elements = []
            for(let i=0; i < res.rows.length; i++) {
                elements.push(res.rows[i])
            }
            setUsers(elements)
        }
    }
    loadUser()
  }, []);

  const listItemView = (item) => {
    return (
      <View key={item.user_id} style={styles.listItemView}>
        <MyText text= {"Usuario: " + item.nom_usuario + " " + item.apellido}   style={styles.text_data} />
        <MyText text={"Cédula: " + item.ci} style={styles.text_data1} />
        <MyText text={"F. Nacimiento: " + item.fechaNac} style={styles.text_data1} />
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
              keyExtractor={(item) => item.user_id.toString()}
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
    backgroundColor: "#fcfceb",
  },
  generalView: {
    flex: 1,
  },
  listView: {
    marginTop: 0,
  },
  listItemView: {
    backgroundColor: "#fcfceb",
    padding: 20,
    borderColor: "#AFB42B",
    borderWidth: 1,
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
    fontSize: 18,
    alignSelf: "center",
    alignContent: "center",
  },
});

export default ViewAllUsers;
