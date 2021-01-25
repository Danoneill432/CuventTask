import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './src/screens'
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({uri: 'https://qoo09.sse.codesandbox.io/graphql'}),
  cache: new InMemoryCache()
});

const Stack = createStackNavigator()

const App = () => {
  return (
    <ApolloProvider client={client}>
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </ApolloProvider>
  )
}

export default App
