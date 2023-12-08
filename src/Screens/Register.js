import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable, Alert, } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const logoURI = "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png";

  const handleRegister = () => {
  
    const user = {
      email,
      name,
      password,
    };
    // Validate the fields
    if (!validateFields()) {
      return;
    }
   
    // Send a post request to the backend API
    axios
      .post("http://192.168.21.159:8000/register", user)
      .then((response) => {
        console.debug(response)
       setEmail("");
        setName("");
        setPassword("");
      Alert.alert("Registered successfully", "You have registered successfully", [

          {
          text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch((error) => {
        console.error('error registering user', error);
        Alert.alert('Error registering user', error.message);
      });
  };

  const validateFields = () => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!name) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    if (!password) {
      Alert.alert('Validation Error', 'Please enter your password');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password should be at least 6 characters long');
      return false;
    }

    return true;
  };


  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: 150, height: 100, }}
          source={{ uri: logoURI }}
        />
      </View>
      <KeyboardAvoidingView>
        <View
          style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42'
            }}>

            Register your Account
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
              name="account"
              size={26}
              color="gray" />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder='enter your Name'
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
          <Text  style={{color:'grey'}}>
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
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Login")}
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
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
})