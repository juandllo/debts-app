import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Alert, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg'
import DebtsList from '../components/DebtsList';
import { endpoints } from '../helpers/http/endpoints'
import { getHttp } from '../helpers/http/fetchHelpers';

export default function Debtor({ route, navigation }) {
    const { debtor } = route.params
    const [debtorData, setDebtorData] = useState(debtor)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useFocusEffect(
        useCallback(() => {
            handleUpdateList()
        }, [])
    )

    const openModal = () => {
        navigation.navigate('CreateDebt', { debtor })
    }

    useEffect(() => {
        navigation.setOptions({
            title: debtorData.name,
            headerRight: () => (
                <Button
                    onPress={openModal}
                    title="Prestar"
                    color={'#f26008'}
                />
            )
        })
    }, [])

    const handleClick = (debt) => {
        navigation.navigate('DebtDetail', {
            debtor: debtorData,
            debt
        })
    }

    const handleUpdateList = () => {
        setIsRefreshing(true)

        getHttp(`${endpoints.getDebtor}/${debtorData._id}`)
            .then(response => {
                setDebtorData(response.data)
                setIsRefreshing(false)
            })
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.centered}>
                    <QRCode size={250} value={debtorData._id} />
                </View>
                <View>
                    <DebtsList data={debtorData.debts} handleClick={handleClick} handleUpdateList={handleUpdateList} isRefreshing={isRefreshing} />
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
        marginHorizontal: 15
    },
    centered: {
        marginVertical: 15,
        alignItems: 'center'
    }
});