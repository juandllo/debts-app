import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useMaskCurrency } from '../hooks/maskCurrency';

export default function DebtorsList({ data, handleClick, handleUpdateList, isRefreshing }) {
    
    const sumDebtsAmount = (item) => {
        if (!item.debts) {
           return 0 
        }

        const values = item.debts.map(debt => debt.amount)

        if (values.length === 0) {
            return 0
        } 

        return values.reduce((accum, current) => accum + current)
    }

    const { setMask } = useMaskCurrency()

    const Item = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.body}>{item.debts ? setMask(sumDebtsAmount(item)) : 0}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <FlatList style={styles.flat}
            onRefresh={handleUpdateList}
            refreshing={isRefreshing}
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item._id}>
        </FlatList>
    )
}

const styles = StyleSheet.create({
    flat: {
        height: '100%'
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 7
    },
    title: {
        fontSize: 16,
    },
    body: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f26008'
    },
});