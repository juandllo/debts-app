import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DebtorsList from '../components/DebtorsList';

export default function Home({ navigation }) {
    const [debtors, setDebtors] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        handleUpdateList()
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('CreateDebtor')}
                    title="Nuevo"
                    color={'#f26008'}
                />
            )
        })
    }, [])

    const handleClick = (debt) => {
        navigation.navigate('Deudor', {
            debtor: debt
        })
    }

    const handleUpdateList = () => {
        setIsRefreshing(true)
        fetch('https://debts-backend.herokuapp.com/api/v1/debtors/getDebtors', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setDebtors(response.data)
                setIsRefreshing(false)
            })
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <DebtorsList data={debtors} handleClick={handleClick} handleUpdateList={handleUpdateList} isRefreshing={isRefreshing} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    container: {
        marginHorizontal: 15
    }
});