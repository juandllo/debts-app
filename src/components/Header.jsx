import { StyleSheet, Text } from 'react-native';

export default function Header({ title }) {
    return (
        <Text style={styles.header}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        //fontWeight: 'bold',
    }
});