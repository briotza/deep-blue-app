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

const birthIcon = require('../assets/images/username.png');
const emailIcon = require('../assets/images/email.png');
const passwordIcon = require('../assets/images/password.png');
const logo = require('../assets/images/black.png');
const facebook = require('../assets/images/facebook.png');
const google = require('../assets/images/google.png');

type RootStackParamList = {
    Home: undefined;
    Dashboard: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        if (!username || !birthday || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        try {
            const response = await fetch('http://192.168.229.67/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    email,
                    password,
                    birthday,
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                console.log('Usuário registrado com sucesso:', data);
                Alert.alert('Sucesso', 'Conta criada com sucesso!');
                navigation.navigate('Dashboard');
            } else {
                setError('Erro ao registrar usuário.');
                Alert.alert('Erro', 'Ocorreu um erro ao tentar registrar o usuário.');
            }
        } catch (error) {
            setError('Ocorreu um erro ao tentar registrar o usuário.');
            console.error(error);
            Alert.alert('Erro', 'Não foi possível se comunicar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Deep Blue</Text>
            </View>
            <Text style={styles.title}>Crie uma conta</Text>

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
                    onPress={() => navigation.navigate('Dashboard')}
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
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        marginBottom: 20,
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
