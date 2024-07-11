import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const MySingleButton = ({ onPress, title, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <View style={styles.view}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
            alignContent: 'center',
            backgroundColor: 'green',
            color: '#ffffff',
            padding: 15,
            marginTop: 15,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 5,
            flex: 1,
            alignItems: 'center',
        },
        text: {
            color: "white",
            fontSize: 20,
            fontWeight: "500"
        },
        view: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
})

export default MySingleButton