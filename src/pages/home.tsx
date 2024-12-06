import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const birthIcon = require('../assets/images/username.png');
const emailIcon = require('../assets/images/email.png');
const passwordIcon = require('../assets/images/password.png');
const logo = require('../assets/images/black.png');
const facebook = require('../assets/images/facebook.png');
const google = require('../assets/images/google.png');

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Dashboard: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (!username || !birthday || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        const newUser = { name: username, email, birthday, password };

        try {
            await AsyncStorage.setItem('userData', JSON.stringify(newUser));
            Alert.alert('Sucesso', 'Conta criada com sucesso!');

            setUsername('');
            setBirthday('');
            setEmail('');
            setPassword('');

            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao salvar dados no armazenamento local.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo e nome no topo */}
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Deep Blue</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Crie uma conta</Text>
            </View>

            {/* Campos de cadastro */}
            <View style={styles.inputContainer}>
                <Image source={birthIcon} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={birthIcon} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nascimento"
                    value={birthday}
                    onChangeText={setBirthday}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={emailIcon} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={passwordIcon} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>Ou entrar com</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={google} style={styles.socialIcon} />
                    <Text>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={facebook} style={styles.socialIcon} />
                    <Text>Facebook</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.loginText}>
                Já tem uma conta?{' '}
                <Text
                    style={styles.boldText}
                    onPress={() => navigation.navigate('Login')}
                >
                    Entrar
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 60,
    },
    titleContainer: {
        marginBottom: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    button: {
        backgroundColor: '#150050',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#64748B',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        width: '48%',
        justifyContent: 'center',
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    loginText: {
        marginTop: 10,
        fontSize: 14,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default HomeScreen;
