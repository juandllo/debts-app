import { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native'

export default function CreateDebtor({ route, navigation }) {

    const [name, setName] = useState("")

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    onPress={() => navigation.goBack()}
                    title="Cancelar"
                    color={'#f26008'}
                />
            )
        })
    })

    const handleCreation = () => {
        if (name === "") {
            Alert.alert('Por favor ingrese todos los datos!')
            return
        }

        const body = {
            name,
            status: true
        }

        fetch('https://debts-backend.herokuapp.com/api/v1/debtors/addDebtor', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.status !== 200) {
                Alert.alert('Se ha producido un error!')
                return
            }

            return response.json()
        }).then(response => {
            Alert.alert('Se a creado el nuevo deudor!')
            navigation.goBack()
        })
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <Text style={{ fontSize: 15 }}>Nombre</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
                <View style={styles.button}>
                    <Button color={'#fff'} onPress={() => handleCreation()} title="Crear" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    container: {
        marginVertical: 8,
        marginHorizontal: 15
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 7,
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#f26008',
        padding: 5,
        marginVertical: 8,
        borderRadius: 7,
        fontWeight: 'bold'
        
    }
});

