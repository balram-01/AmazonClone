import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
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
        name="Profile"
        component={Home}
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
        name="Cart"
        component={Home}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
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
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})