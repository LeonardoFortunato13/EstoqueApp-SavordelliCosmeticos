import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function ProductsList({data}) {
   const navigation = useNavigation(); 
    
   function handleNavigate({}){
    return(
        
        navigation.navigate("a", {data: data})
        
        )
   }
    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>

            <View style={styles.card}>

                <Image style={styles.img} 
                source={{uri: data.imagem}}/>

                <View style={styles.containerText}>
                    <Text style={styles.styleNome}>{data.nome}</Text>
                    <Text style={styles.styleText}>código: {data.cod_barra}</Text>
                    <Text style={styles.styleText}>quantidade: {data.qtd_estoque}</Text>
               
                    
                </View>
                <View style={styles.containerText2}>
                         <Text style={styles.styleText}>preço venda: {data.preco_venda}</Text>
                    <Text style={styles.styleText} >validade: {data.data_vencimento}</Text>
            
                </View>


            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        width: 360,
        height: 110,
        backgroundColor: 'red',
        borderRadius: 10,
        borderWidth:2,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:10
    },
    containerText: {
        width: '38%',
        height: 90,
        flexDirection: 'column',
        marginStart: 5,
        paddingStart: 10,
        paddingTop: 5,
        backgroundColor: 'purple',
    },
    containerText2: {
        width: '28%',
        height: 90,
        flexDirection: 'column-reverse',
        marginStart: 5,
        paddingStart: 5,
        paddingBottom: 5,
        backgroundColor: 'purple',
        
    }, 
    img: {
        width: '25%',
        height: '80%',
        backgroundColor: 'white',
        marginStart: 12

    },
    styleNome:{
        fontWeight: 'bold',
        
    },
    styleText:{
        fontSize: 12,    
        paddingTop: 4
    }
})