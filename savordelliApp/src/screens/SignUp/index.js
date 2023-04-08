import { Button, View, StyleSheet } from "react-native";

export function SignUp({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Home"
            onPress={() => navigation.navigate("Main")}
          />
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },

})