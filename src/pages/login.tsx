import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Dashboard: undefined;
  ForgotPassword: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(storedData);

        if (email === storedEmail && password === storedPassword) {
          Alert.alert("Login bem-sucedido", "Bem-vindo de volta!");
          navigation.navigate("Dashboard");
        } else {
          Alert.alert("Erro", "E-mail ou senha incorretos.");
        }
      } else {
        Alert.alert("Erro", "Nenhuma conta encontrada. Cadastre-se primeiro.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um problema ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar na sua conta</Text>
      <Text style={styles.subtitle}>Bem-vindo de volta!</Text>

      {/* Campos de login */}
      <View style={styles.inputContainer}>
        <Image source={require("../assets/images/email.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require("../assets/images/password.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Ou entrar com</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("../assets/images/google.png")} style={styles.socialIcon} />
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("../assets/images/facebook.png")} style={styles.socialIcon} />
          <Text>Facebook</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signupText}>
        Não tem uma conta?{" "}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Home')}>Cadastre-se</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    color: "#150050",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#150050",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 8,
    color: "#64748B",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    color: "#150050",
    fontWeight: "bold",
  },
});
