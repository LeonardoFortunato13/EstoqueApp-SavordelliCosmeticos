import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export function CardMarca({ data }) {

    return (
        <TouchableOpacity style={styles.container} >

            <View style={styles.card}>


                <View style={styles.containerText}>
                    <Text style={styles.styleNome}>{data.marca}</Text>
                </View>


            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        width: 100,
        height: 100,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
       
        alignItems: 'center',
        flexDirection: 'row',
        marginEnd:8
    },
    containerText: {
        width: '100%',
        alignItems: 'center',
        
    },
    styleNome: {
        fontSize: 12,
        fontWeight:'bold'
    }
})