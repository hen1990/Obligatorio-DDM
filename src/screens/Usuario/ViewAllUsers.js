import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const ViewAllUsers = () => {
  // estado
  const [users, setUsers] = useState([]);

  const getUsersDB = async () => {
    const readOnly = false;
    let result = null;
    await db.transactionAsync(async (tx) => {
      result = await databaseConection.getAllUsers(tx);
    }, readOnly);
    // seteara test
    return result;
  };

  useEffect(() => {
    const loadUser = async () => {
        const res = await getUsersDB()
        if(res.rows.length > 0) {
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
        <MyText text= {item.nom_usuario + " " + item.apellido}   style={styles.text_data} />
        <MyText text={item.fechaNac} style={styles.text_data1} />
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
    backgroundColor: "#feffe3",
    padding: 20,
    borderColor: "#AFB42B",
    borderWidth: 1,
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
    padding: 3,
    marginLeft: 5,
    color: "black",
    alignContent: "center",
    alignItems: "center",
    fontSize: 28,
},
text_data1: {
    padding: 3,
    marginLeft: 5,
    color: "#2f2f2f",
    alignContent: "center",
    alignItems: "center",
    fontSize: 20,
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

export default ViewAllUsers;
