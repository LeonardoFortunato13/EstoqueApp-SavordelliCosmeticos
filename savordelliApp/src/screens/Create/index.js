import { View, Text, StyleSheet, KeyboardAvoidingView , Image} from 'react-native';
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
          <Text style={styles.title}>Organize do seu jeito </Text>
          <Text style={styles.text}>Escolha o que cadastrar no seu sistema de estoque.</Text>
        </View>


        <View style={styles.containerButtonsOne}>
          <TouchableOpacity style={styles.cardButton} onPress={()=> navigation.navigate("Cadastrar Produto")}>
           <Image
           source ={require("../../assets/produtos-de-higiene.png")}/>
            <Text style={styles.text}>Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardButton}  onPress={()=> navigation.navigate("Cadastrar Categoria")}>
          <Image
           source ={require("../../assets/categorias.png.png")}/>
            <Text style={styles.text}>Categoria</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.containerButtonsTwo}>
          <TouchableOpacity style={styles.cardButton} onPress={()=> navigation.navigate("Cadastrar Subcategoria")}>
          <Image
           source ={require("../../assets/subcategorias.png")}/>
            <Text style={styles.text}>Subcategoria</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.cardButton} onPress={()=> navigation.navigate("Cadastrar Marca")}>
          <Image
           source ={require("../../assets/logo-eudora-256.png")}/>
            <Text style={styles.text}>Marca</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.containerButtonsOne}>
          <TouchableOpacity style={styles.cardButton} onPress={()=> navigation.navigate("Menu")}>
            <Ionicons name="people" size={32} />
            <Text style={styles.text}>Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <Ionicons name="receipt-outline" size={32} />
            <Text style={styles.text}>Fornecedor</Text>
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
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
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
  containerText: {

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 32,
    paddingTop: 8
  }
})