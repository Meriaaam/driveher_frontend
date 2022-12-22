import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// _________________SCREENS IMPORTS____________________________
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import HistoriqueScreen from './screens/HistoriqueScreen';
import AccueilScreen from './screens/AccueilScreen';
import OrderResumeScreen from './screens/OrderResumeScreen';
import RatingScreen from './screens/RatingScreen';
import YourDriverScreen from './screens/YourDriverScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';

// _________________REDUX IMPORTS_______________________________

// redux 
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import driver from './reducers/driver';

// redux-persist 
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentScreen from './screens/PaymentScreen';


// ________________STORE CONFIGURATION_________________________
const reducers = combineReducers({ user, driver });
const persistConfig = {
  key: 'driveher',
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// _____________Variables for navigation____________________________
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// _______________Creation of the Tab Navigator____________________________
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if(route.name === 'Accueil'){
          iconName ='home'
        }else if(route.name === 'Historique'){
          iconName = 'history'
        }else if(route.name === 'Profil'){
          iconName = 'user'
        }

        return <FontAwesome name={iconName} size={30} color={color} />;
      },
      tabBarActiveTintColor: '#BE355C',
      tabBarInactiveTintColor: '#b2b2b2',
      headerShown: false,
    })}>
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="Historique" component={HistoriqueScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Order" component={OrderResumeScreen} />
            <Stack.Screen name="Accueil" component={AccueilScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Rating" component={RatingScreen} />
            <Stack.Screen name="Driver" component={YourDriverScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
