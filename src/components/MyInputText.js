import {StyleSheet, TextInput, View} from "react-native"

const MyInputText = (props) => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            <TextInput 
                underlineColorAndroid="transparent"
                maxLength={props.maxLength}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor="#999"
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                returnKeyType={props.returnKeyType}
                numberOfLines={props.numberOfLines}
                multiline={props.multiline}
                onSubmitEditing={props.onSubmitEditing}
                style={[styles.input, props.style]}
                blurOnSubmit={props.blurOnSubmit}
                value={props.value}
                defaultValue={props.defaultValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    input: {
        fontSize: 16,
        color: '#333',
        padding: 0,
        minHeight: 40, // Cambia aquí la altura mínima
    }
})

export default MyInputText