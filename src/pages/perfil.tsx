import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const [userData, setUserData] = useState<{ name: string; email: string; password: string } | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setName(parsedData.name);
          setEmail(parsedData.email);
          setPassword(parsedData.password);
        } else {
          Alert.alert("Erro", "Nenhum dado de usuário encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao carregar os dados.");
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    if (name && email && password) {
      const updatedUserData = { name, email, password };
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
        setUserData(updatedUserData); // Atualiza os dados no estado
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações.");
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      {userData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
          />
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Digite sua senha"
          />
          <Button title="Salvar alterações" onPress={handleSaveChanges} />
        </View>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
});
