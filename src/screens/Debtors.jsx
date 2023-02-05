import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DebtorsList from '../components/DebtorsList';
import { getHttp } from '../helpers/http/fetchHelpers';
import { endpoints } from '../helpers/http/endpoints';

export default function Debtors({ navigation }) {
    const [debtors, setDebtors] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)

    useFocusEffect(
        useCallback(() => {
            handleUpdateList()
        }, [])
    )

    const openModal = () => {
        navigation.navigate('CreateDebtor')
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={openModal}
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
        getHttp(endpoints.getDebtors)
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