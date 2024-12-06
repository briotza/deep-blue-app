import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/home';
import Dashboard from '../pages/dashboard';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
