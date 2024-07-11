import {StyleSheet, TextInput, View} from "react-native"

const MyInputText = (props) => {
    return (
        <View style={styles.container}>
            <TextInput 
                underlineColorAndroid="transparent"
                maxLength={props.maxLength}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor="grey"
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                returnKeyType={props.returnKeyType}
                numberOfLines={props.numberOfLines}
                multiline={props.multiline}
                onSubmitEditing={props.onSubmitEditing}
                style={props.style}
                blurOnSubmit={props.blurOnSubmit}
                value={props.value}
                defaultValue={props.defaultValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#d3d3d3",
        borderWidth: 1,
        padding: 15
    },
    input: {
        
    }
})

export default MyInputText