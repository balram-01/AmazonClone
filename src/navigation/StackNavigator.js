import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProductInfo from '../Screens/ProductInfo';
import AddAddress from '../Screens/AddAddress';
import AddAddressForm from '../Screens/AddAddressForm';
import Profile from '../Screens/Profile';
import MyCart from '../Screens/Cart';
import Confirmation from '../Screens/Confirmation';
import Orders from '../Screens/Orders';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const cartCount= useSelector((state)=>state.cart.cart.length)
  return (
    <Tab.Navigator  >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#008E97" : "black"}
              />

            )
          }

        }}
      />
      <Tab.Screen
        name="HomeProfile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "account" : "account-outline"}
                size={24}
                color={focused ? "#008E97" : "black"}
              />

            )
          }

        }}

      />
      <Tab.Screen
        name="HomeCart"
        component={MyCart}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarBadge: cartCount,
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "cart" : "cart-outline"}
                size={24}
                color={focused ? "#008E97" : "black"}
              />

            )
          }

        }}

      />
    </Tab.Navigator>
  )
}
const StackNavigator = () => {
  return (
    <NavigationContainer  >
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login} />

        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register} />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={BottomTabs} />
        <Stack.Screen
          name="Info"
          options={{ headerShown: false }}
          component={ProductInfo} />
        <Stack.Screen
          name="AddAddress"
          options={{ headerShown: false }}
          component={AddAddress} />
        <Stack.Screen
          name="AddAddressForm"
          options={{ headerShown: false }}
          component={AddAddressForm} />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile} />
        <Stack.Screen
          name="Cart"
          options={{ headerShown: false }}
          component={MyCart} />
        <Stack.Screen
          name="Confirm"
          options={{ headerShown: false }}
          component={Confirmation} />
        <Stack.Screen
          name="Orders"
          options={{ headerShown: false }}
          component={Orders} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})