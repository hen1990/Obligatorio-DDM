import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import FontAwesome from '@expo/vector-icons/FontAwesome';

const MyButton = ({onPress, title, iconName, btnColor}) => {
    console.log("params",title, iconName, btnColor )
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: btnColor}]} onPress={onPress}>
            <View style={styles.view}>
                {/* <FontAwesome style={styles.icon} name={iconName} size="40" color="white" /> */}
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        flex: 1,
        color: "white",
        padding: 30,
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 35,
        borderRadius:5,
    },
    /*
    button: {
        flex: 1,
        color: "white",
        paddingLeft: 50,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderRadius:0,
        borderBlockColor: "white",
        borderWidth: 2,
        height:120
    },*/
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "500"
    },
    icon: {
       paddingBottom: 5,
       flexDirection: "column",
       alignItems: "center" 
    }
})

export default MyButton