import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/home';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import ForgotPassword from '../pages/forgotpassword';
import Incidentes from '../pages/incidentes';
import Relatorios from '../pages/relatorios';
import Externo from '../pages/externo';
import Registrar from '../pages/registrar';
import Notificacoes from '../pages/notificacoes';
import Perfil from '../pages/perfil';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Incidentes" component={Incidentes} />
      <Stack.Screen name="Relatorios" component={Relatorios} />
      <Stack.Screen name="Externo" component={Externo} />
      <Stack.Screen name="Registrar" component={Registrar} />
      <Stack.Screen name="Notificacoes" component={Notificacoes} />
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
}
