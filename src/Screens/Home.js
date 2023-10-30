import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Home = () => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, backgroundColor: "white" }}>
      <View style={{
        backgroundColor: "#00CED1",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10

      }}>

        <Pressable style={{
          flexDirection: 'row',
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: 'white',
          borderRadius: 3,
          height: 38,
          flex: 1

        }}>
          <Icon
            name="magnify"
            size={22}
            color="black"
            style={{ paddingLeft: 10 }}
          />
          <TextInput placeholder="search Amazon.in" />
        </Pressable>
        <Icon name="microphone" size={24} color="black" />
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})