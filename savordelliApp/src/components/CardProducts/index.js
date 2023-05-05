import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export function Card({text1, text2, text3, text4, text5, img}) { 
    
    return (
        <TouchableOpacity style={styles.container} >

            <View style={styles.card}>

                <Image style={styles.img} 
                source={{uri: img}}/>

                <View style={styles.containerText}>
                    <Text style={styles.styleNome}>{text1}</Text>
                    <Text style={styles.styleText}>código: {text2}</Text>
                    <Text style={styles.styleText}>quantidade: {text3}</Text>
               
                    
                </View>
                <View style={styles.containerText2}>
                         <Text style={styles.styleText}>preço venda: {text4}</Text>
                    <Text style={styles.styleText} >validade: {text5}</Text>
            
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