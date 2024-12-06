import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";

const emailIcon = require("../assets/images/email.png"); // Imagem de email

interface ForgotPasswordProps {
  navigation: any; // Tipo de navegação
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um e-mail.");
      return;
    }

    // Aqui você pode adicionar lógica para enviar o e-mail para recuperação de senha
    Alert.alert("Sucesso", "Link de recuperação enviado para o e-mail.");
    navigation.goBack(); // Voltar para a tela anterior (Login)
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Alterar senha</Text>
        <Text style={styles.description}>
          Digite o endereço de e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
        </Text>

        <View style={styles.inputContainer}>
          <Image source={emailIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Não tem uma conta?{" "}
        <Text style={styles.signupLink} onPress={() => navigation.navigate("Signup")}>
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#150050",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
    color: "#150050",
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
  },
  signupLink: {
    color: "#150050",
    fontWeight: "bold",
  },
});

export default ForgotPassword;
