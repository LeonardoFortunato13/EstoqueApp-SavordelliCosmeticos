import { Text, View, StyleSheet } from "react-native";
import { Inputt } from "../../../components/inputs/input";

export function Estoque() {
    return (
        <View style={styles.container}>
            <Inputt />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#312D7A',
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14
    },


})