import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useMaskCurrency } from '../hooks/maskCurrency';
import { useMaskDate } from '../hooks/maskDate';

export default function DuesList({ data, handleClick, handleUpdateList, isRefreshing }) {
    const { setMask } = useMaskCurrency()
    const { setMaskDate } = useMaskDate()

    const Item = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={styles.item}>
                <Row>
                    <Col numRows={2}>
                        <Text style={styles.leftText}>{setMask(item.amount)}</Text>
                    </Col>
                    <Col numRows={2}>
                        <Text style={styles.rightText}>{setMaskDate(item.date)}</Text>
                    </Col>
                </Row>
            </View>
        </TouchableWithoutFeedback>
    );

    const Col = ({ numRows, children }) => {
        return (
            <View style={styles[`${numRows}col`]}>{children}</View>
        )
    }

    const Row = ({ children }) => (
        <View style={styles.row}>{children}</View>
    )

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
        marginBottom: 1,
        borderRadius: 7,
        //borderBottomWidth: 1,
        //borderBottomColor: 'grey',
        flex: 4,
        width: 'auto'
    },
    leftText: {
        fontSize: 15,
        color: '#f26008',
        fontWeight: 'bold'
    },
    rightText: {
        marginLeft: 'auto',
        fontSize: 12,
        color: 'gray'
    },
    row: {
        flexDirection: "row"
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