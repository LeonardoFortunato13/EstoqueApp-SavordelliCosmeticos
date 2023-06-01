import { View, Text, StyleSheet } from 'react-native'

export function AtributeView({ data }) {
    return (
        <View style={styles.container}>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeName}>Nome: {data.nome}</Text>

            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeName}>Marca: {data.marca_id }</Text>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeName}>Categoria:</Text>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeName}>Preço unitário: {data.preco_venda}</Text>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeName}>Quantidade: {data.qtd_estoque}</Text>
            </View>
            <View style={styles.atributeContainer}>
                <Text style={styles.atributeName}>Validade:  {data.data_vencimento}</Text>
            </View>
        </View>


    )

}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        fontWeight: 'Bold',
    }, atributeContainer: {
        backgroundColor: '#DFDFDF',
        marginBottom: 14,
        padding: 12,
        borderRadius: 5
    },
    atributeName: {
        fontWeight: '400',
        fontSize: 14
    }
})