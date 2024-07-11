import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

// importo todas las pantallas
import HomeScreen from "../screens/HomeScreen";
import RegisterUser from "../screens/Usuario/RegisterUser";
import UpdateUser from "../screens/Usuario/UpdateUser";
import DeleteUser from "../screens/Usuario/DeleteUser";
import ViewUser from "../screens/Usuario/ViewUser";
import ViewAllUsers from "../screens/Usuario/ViewAllUsers"
import Usuario from "../screens/Usuario";
import UsuarioBorrarTodo from "../screens/Usuario/UsuarioBorrarTodo";

const RootStack = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    {/* home */}
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            title: "Inicio - CTC GYM",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/*usuario */}
                    <Stack.Screen
                        name="Usuario"
                        component={Usuario}
                        options={{
                            title: "Usuario",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* crear usuario */}
                    <Stack.Screen
                        name="RegisterUser"
                        component={RegisterUser}
                        options={{
                            title: "Registrar Usuario",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* update de usuario */}
                    <Stack.Screen
                        name="UpdateUser"
                        component={UpdateUser}
                        options={{
                            title: "Actualizar Usuario",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* borrar un usuario */}
                    <Stack.Screen
                        name="DeleteUser"
                        component={DeleteUser}
                        options={{
                            title: "Borrar Usuario",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* ver un usuario */}
                    <Stack.Screen
                        name="ViewUser"
                        component={ViewUser}
                        options={{
                            title: "Ver Usuario",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* ver todos los usuario */}
                    <Stack.Screen
                        name="ViewAllUsers"
                        component={ViewAllUsers}
                        options={{
                            title: "Todos los Usuarios",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }} 
                    />
                    {/* ver todos los usuario */}
                    <Stack.Screen
                        name="UsuarioBorrarTodo"
                        component={UsuarioBorrarTodo}
                        options={{
                            title: "Borrar Todos los Usuario",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default RootStack
