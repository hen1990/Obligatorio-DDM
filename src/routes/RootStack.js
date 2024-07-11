import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

// importo todas las pantallas
//Home Screen
import HomeScreen from "../screens/HomeScreen";
import Usuario from "../screens/Usuario";

//Usuario screen
import RegisterUser from "../screens/Usuario/RegisterUser";
import UpdateUser from "../screens/Usuario/UpdateUser";
import DeleteUser from "../screens/Usuario/DeleteUser";
import ViewUser from "../screens/Usuario/ViewUser";
import ViewAllUsers from "../screens/Usuario/ViewAllUsers"
import UsuarioBorrarTodo from "../screens/Usuario/UsuarioBorrarTodo";
import TipoMaquina from "../screens/TipoMaquina";
import CrearTipoMaquina from "../screens/TipoMaquina/CrearTipoMaquina";
import ActualizarTipoMaquina from "../screens/TipoMaquina/ActualizarTipoMaquina";

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


                    {/* Tipo Maquina */}
                    <Stack.Screen
                        name="TipoMaquina"
                        component={TipoMaquina}
                        options={{
                            title: "Tipos de Maquinas",
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
                    {/* Crear Tipo Maquina */}
                    <Stack.Screen
                        name="CrearTipoMaquina"
                        component={CrearTipoMaquina}
                        options={{
                            title: "Tipos de Maquinas",
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
                    {/* Crear Tipo Maquina */}
                    <Stack.Screen
                        name="ActualizarTipoMaquina"
                        component={ActualizarTipoMaquina}
                        options={{
                            title: "Actualizar Tipos de Maquinas",
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

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default RootStack
