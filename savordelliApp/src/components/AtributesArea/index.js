import {View, Text,StyleSheet} from 'react-native'

export function AtributeArea(){
    return(
        <View style={styles.container}>
            <Text style={styles.atributeName}>Nome:</Text>     
          
        </View>
    
    )

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#DFDFDF',
        marginBottom:14,   
        padding:12,
        borderRadius:5
    },
    atributeName:{
        fontWeight:'600',
        fontSize:14
    }
})