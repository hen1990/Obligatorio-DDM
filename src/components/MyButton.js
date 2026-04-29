import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import FontAwesome from '@expo/vector-icons/FontAwesome';

const MyButton = ({onPress, title, iconName, btnColor, style}) => {
    console.log("params",title, iconName, btnColor )
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: btnColor}, style]} onPress={onPress}>
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
        paddingLeft: 30,
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "left",
    },
    icon: {
       paddingBottom: 5,
       flexDirection: "column",
       alignItems: "center" 
    }
})

export default MyButton