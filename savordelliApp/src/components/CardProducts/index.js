import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export function Card({text1, text2, text3, text4, text5, img}) { 
    
    return (
        <TouchableOpacity style={styles.container} >

            <View style={styles.card}>

                <Image style={styles.img} 
                resizeMode='contain'
                source={require("../../assets/silhueta-de-formato-simples-de-coracao.png")}/>

                <View style={styles.containerText}>
                    <Text style={styles.styleNome}>{text1}</Text>
                    <Text style={styles.styleText}>Produtos favoritados {text2}</Text>
                    
               
                    
                </View>
                


            </View>

        </TouchableOpacity>
    )
    }
const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 110,
        borderRadius: 10,
        borderWidth:2,
        backgroundColor: '#fff',
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

    },
    containerText2: {
        width: '28%',
        height: 90,
        flexDirection: 'column-reverse',
        marginStart: 5,
        paddingStart: 5,
        paddingBottom: 5,    
    }, 
    img: {
        width: '25%',
        height: '80%',
        backgroundColor: '#a2a2a2',
        marginStart: 12

    },
    styleNome:{
        fontWeight: 'bold',
        
    },
    styleText:{
        fontSize: 15,    
        paddingStart:10,
        fontWeight: 'bold'
    }
})