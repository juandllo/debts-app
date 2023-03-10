import { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native'
import { endpoints } from '../helpers/http/endpoints'
import { patchHttp } from '../helpers/http/fetchHelpers'

export default function CreateDue({ route, navigation }) {
    const { debtor, debtId } = route.params
    const [amount, setAmount] = useState(0)

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
        if (amount === "" || amount === 0) {
            Alert.alert('Por favor ingrese todos los datos!')
            return
        }

        const body = {
            amount
        }

        patchHttp(`${endpoints.createDue}/${debtor._id}/debt/${debtId}`, body)
            .then(response => {
                if (response.status !== 200) {
                    Alert.alert('Se ha producido un error!')
                    return
                }

                Alert.alert('Se a pagado una cuota!')
                navigation.goBack()
            })
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <Text style={{ fontSize: 15 }}>Monto</Text>
                <TextInput keyboardType="number-pad" style={styles.input} value={amount} onChangeText={setAmount} />
                <View style={styles.button}>
                    <Button color={'#fff'} onPress={() => handleCreation()} title="Pagar" />
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

    },
    closeModal: {
        fontSize: 18,
        color: '#f26008'
    }
});

