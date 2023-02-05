import { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Alert, Button } from 'react-native';
import { useMaskCurrency } from '../hooks/maskCurrency';
import DuesList from '../components/DuesList';
import Header from '../components/Header';

export default function DebtDetails({ route, navigation }) {

    const { debtor, debt } = route.params
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [debtorData, setDebtorData] = useState(debtor)
    const [debtData, setDebtData] = useState(debt)
    const { setMask } = useMaskCurrency()

    useEffect(() => {
        navigation.setOptions({
            title: debtData.name,
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('CreateDue', { debtor, debtId: debtData._id })}
                    title="Pagar"
                    color={'#f26008'} />
            )
        })
    }, [])

    const sumDuesAmount = (item) => {
        if (!item.dues) {
            return 0
        }

        const values = item.dues.map(due => due.amount)

        if (values.length === 0) {
            return 0
        }

        return values.reduce((accum, current) => accum + current)
    }

    const Col = ({ numRows, children }) => {
        return (
            <View style={styles[`${numRows}col`]}>{children}</View>
        )
    }

    const Row = ({ children }) => (
        <View style={styles.row}>{children}</View>
    )

    const handleClick = () => {
        Alert.alert('En construccion!')
    }

    const handleUpdateList = () => {
        setIsRefreshing(true)

        fetch(`https://debts-backend.herokuapp.com/api/v1/debtors/getDebtor/${debtorData._id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setDebtData(response.data.debts.find(item => item._id === debtData._id))
                setIsRefreshing(false)
            })
    }

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.containerGrid}>
                <View style={styles.hero}>
                    <Row>
                        <Col numRows={2}>
                            <Text style={styles.label}>Total Deuda</Text>
                        </Col>
                        <Col numRows={2}>
                            <Text style={styles.label}>Abonado</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col numRows={2}>
                            <Text style={styles.body}>{setMask(debt.amount)}</Text>
                        </Col>
                        <Col numRows={2}>
                            <Text style={styles.body}>{debtData.dues ? setMask(sumDuesAmount(debtData)) : 0}</Text>
                        </Col>
                    </Row>
                </View>
                <View style={styles.container}>
                    { debtData.dues.length > 0
                        ?
                        <DuesList data={debtData.dues} handleClick={handleClick} handleUpdateList={handleUpdateList} isRefreshing={isRefreshing} />
                        :
                        <Header title={"No registra cuotas!"} />
                    }
                    
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    container: {
        marginVertical: 15
    },
    hero: {
        marginVertical: 30,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 7
    },
    containerGrid: {
        flex: 4, // the number of columns you want to devide the screen into
        marginHorizontal: 15,
        width: 'auto',
    },
    label: {
        fontSize: 13,
        color: 'gray'
    },
    row: {
        flexDirection: "row"
    },
    body: {
        fontSize: 15,
        //fontWeight: 'bold',
    },
    "1col": {
        flex: 1
    },
    "2col": {
        flex: 2
    },
    "3col": {
        flex: 3
    },
    "4col": {
        flex: 4
    }
});