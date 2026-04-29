import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    btnSmall: {
        paddingVertical: 10,
        borderRadius: 12,
        marginVertical: 6,
        marginHorizontal: 20,
        minHeight: 45,
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    standardPadding: {
        padding: 10,
        paddingBottom: 20,
    },
    // Estilos para labels/títulos de campos
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
        marginHorizontal: 20,
        marginBottom: 1,
        marginTop: 14,
    },
    // Estilo para inputs (a usar cuando necesites personalizar)
    inputContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    // Estilo para textarea (multilínea)
    textareaContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 12, // Más padding vertical para texto largo
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    // Estilo para pickers y selects
    pickerContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    // Estilo para botones de fecha
    dateButton: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    // Texto de leyenda
    legend: {
        marginHorizontal: 20,
        color: '#999',
        fontSize: 12,
        marginTop: 16,
        marginBottom: 12,
    },
});