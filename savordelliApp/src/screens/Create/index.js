import { View, Text, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { RegisterProduct } from '../RegisterProduct';

export function Create() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.containerText}>
          <Text style={styles.title}>Escolha o que cadastrar no seu sistema de estoque.</Text>
        
        </View>



        <View style={styles.containerButtonsOne} >
          <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate("Cadastrar Produto")}>

          
              <Image
                source={require("../../assets/produtos-de-higiene.png")} />
        
         
              <Text style={styles.text}>Produto</Text>
              <Ionicons
                name="add"
                color={"black"}
                size={32}
                style={{alignSelf: 'flex-end'}}
              />
         
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate("Cadastrar Categoria")}>
            <Image
              source={require("../../assets/categorias.png.png")} />
            <Text style={styles.text}>Categoria</Text>
            <Ionicons
                name="add"
                color={"black"}
                size={32}
              style={{alignSelf: 'flex-end'}}
              />
          </TouchableOpacity>

        </View>

        <View style={styles.containerButtonsTwo}>
          <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate("Cadastrar Subcategoria")}>
            <Image
              source={require("../../assets/subcategorias.png")} />
            <Text style={styles.text}>Subcategoria</Text>
            <Ionicons
                name="add"
                color={"black"}
                size={32}
              style={{alignSelf: 'flex-end'}}
              />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate("Cadastrar Marca")}>
            <Image
              source={require("../../assets/logo-eudora-256.png")} />
            <Text style={styles.text}>Marca</Text>
            <Ionicons
                name="add"
                color={"black"}
                size={32}
              style={{alignSelf: 'flex-end'}}
              />
          </TouchableOpacity>
        </View>

        <View style={styles.containerButtonsOne}>
          <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate("Menu")}>
            <Ionicons name="people" size={32} />
            <Text style={styles.text}>Cliente</Text>
            <Ionicons
                name="add"
                color={"black"}
                size={32}
              style={{alignSelf: 'flex-end'}}
              />
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.cardButton}>
            <Ionicons name="receipt-outline" size={32} />
            <Text style={styles.text}>Fornecedor</Text>
            <Ionicons
                name="add"
                color={"black"}
                size={32}
              style={{alignSelf: 'flex-end'}}
              />
          </TouchableOpacity>

        </View>


      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    alignItems: 'center'
  },
  cardButton: {
    width: 130,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  containerButtonsOne: {
    height: 180,
    alignItems: 'center',
    width: '95%',
    backgroundColor: '#F0A500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    borderTopLeftRadius: 15,
    borderBottomStartRadius: 15
  },
  containerButtonsTwo: {
    height: 180,
    alignItems: 'center',
    width: '95%',
    backgroundColor: '#1A1C20',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    borderTopRightRadius: 15,
    borderBottomStartRadius: 15
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   margin:10,
 
  },
  iconContainer: {
    backgroundColor: "green"

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    paddingBottom:16
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    padding: 5
  }
})