import { Button, View, StyleSheet } from "react-native";

export function SignIn({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="SignUp"
            onPress={() => navigation.navigate("SignUp")}
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