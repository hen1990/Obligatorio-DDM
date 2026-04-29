import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import MyText from "../components/MyText";
import databaseConection from "../database/database-manager";

const VerTodosRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const loadRoles = async () => {
      const res = await databaseConection.getAllRoles();
      if (res && res.rows) {
        setRoles(res.rows);
      }
    };
    loadRoles();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <MyText text={item.nombre} style={styles.roleText} />
      <Text style={styles.idText}>ID: {item.id}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        {roles.length > 0 ? (
          <FlatList
            data={roles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.empty}>
            <Text>No hay roles registrados</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContainer: { flex: 1, backgroundColor: "#efebe9" },
  listItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d7ccc8",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  roleText: { fontSize: 18, fontWeight: "bold" },
  idText: { color: "#8d6e63" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default VerTodosRoles;