import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';
import axios from 'axios';

//criando uma const que configura a rota da
const api = axios.create({
  baseURL: 'http://18.231.16.235:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});
export function VerificaUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastrar = async () => {
    const usuarioVerificado = await verificarUsuario(username, password);
    console.log(usuarioVerificado);
  };

  const verificarUsuario = async (username, password) => {
    try {
      const response = await api.post('/User/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <TextInput value={nome} onChangeText={setNome} /> */}
      <TextInput value={username} onChangeText={setUsername} />
      <TextInput value={password} onChangeText={setPassword} />
      <Button title="Cadastrar" onPress={handleCadastrar} />
    </>
  );
};
