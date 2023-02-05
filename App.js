import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home';
import Debtor from './src/screens/Debtor';
import CreateDebtor from './src/modals/CreateDebtor';
import CreateDebt from './src/modals/CreateDebt';
import DebtDetails from './src/screens/DebtDetails';
import CreateDue from './src/modals/CreateDue';

export default function App() {
    const Stack = createNativeStackNavigator()

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#f26008',
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{
                headerTransparent: true,
                headerBackTitleStyle: {
                    fontSize: 18
                },
                headerTitleStyle: {
                    fontSize: 20
                }
            }}>
                <Stack.Group>
                    <Stack.Screen name="Deudores" component={Home} />
                    <Stack.Screen name="Deudor" component={Debtor} />
                    <Stack.Screen name="DebtDetail" component={DebtDetails} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name='CreateDebtor' component={CreateDebtor}
                        options={{ title: 'Nuevo Deudor' }} />
                    <Stack.Screen name='CreateDebt' component={CreateDebt}
                        options={{ title: 'Nuevo Prestamo' }} />
                    <Stack.Screen name='CreateDue' component={CreateDue}
                        options={{ title: 'Pagar Cuota' }} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
