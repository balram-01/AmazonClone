import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const logoURI = "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png";
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: 150, height: 100, }}
          source={{ uri: logoURI }}
        />
      </View>
      <KeyboardAvoidingView >
        <View
          style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42'
            }}>

            Log In to yout Account
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 70,
              minHeight: 55
            }}>

            <Icon
              style={{ marginLeft: 8, }}
              name="email"
              size={26}
              color="gray" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder='enter your Email'
              style={{
                color: "gray",
                width: 300,
                fontSize: 16,
                height: '100%'

              }}
            />

          </View>
          <View
            style={{
              marginTop: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
                minHeight: 55
              }}>

              <Icon
                style={{ marginLeft: 8, }}
                name="lock"
                size={26}
                color="gray" />
              <TextInput
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                placeholder='enter your Password'
                style={{
                  color: "gray",
                  width: 300,
                  fontSize: 16,
                  height: '100%'

                }}
              />

            </View>
          </View>
        </View>
        <View

          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12
          }}
        >
          <Text >
            Keep me logged in
          </Text>
          <Text
            style={{
              color: "#007FFF",
              fontWeight: '600'
            }}
          >
            Forgot Password
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Pressable
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              alignSelf: 'center',
              padding: 15,
              borderRadius: 10,
              marginRight: 'auto',
              marginLeft: 'auto'
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
                alignSelf: 'center'
              }}>
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{
              marginTop: 12,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'gray',
                fontSize: 14
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  }
})