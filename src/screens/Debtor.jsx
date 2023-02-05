import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Alert, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import DebtsList from '../components/DebtsList';

export default function Debtor({ route, navigation }) {
    const { debtor } = route.params
    const [ debtorData, setDebtorData ] = useState(debtor)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            title: debtorData.name,
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('CreateDebt', { debtor })}
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

        fetch(`https://debts-backend.herokuapp.com/api/v1/debtors/getDebtor/${debtorData._id}`, {
            method: 'GET'
        })
            .then(response => response.json())
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