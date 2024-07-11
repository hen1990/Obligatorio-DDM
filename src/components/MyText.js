import { StyleSheet, Text } from "react-native"

const MyText = ({text, style}) => {
    return <Text style={[styles.text, style]}>{text}</Text>
}

const styles = StyleSheet.create({
    text: {
        color: "#0000"
    }
})

export default MyText