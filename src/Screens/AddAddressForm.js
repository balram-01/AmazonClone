//import liraries
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../../UserContext";

// create a component
const AddAddressForm = ({ route }) => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const [address, setaddress] = useState(route?.params?.address ?? {
        name: "",
        mobileNo: "",
        houseNo: "",
        street: "",
        landmark: "",
        postalCode: "",
        country:""

    });
    const { address: routeAddress, mode } = route?.params ?? {};
    const {_id:addressId } = routeAddress??{};
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        const fetchAddresses = async () => {
            if (userId) {
                const response = await axios.get(`http://192.168.21.159:8000/addresses/${userId}`);
                setAddresses(response.data);
            }
        }
        fetchAddresses()
    }, [userId])
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('authToken');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);

        }

        fetchUser();

    }, [])

    const updateaddress = (item) => {
        setaddress((prevData) => ({ ...prevData, ...item }))
    }

    const resetaddress = () => {
        setaddress({
            name: "",
            mobileNo: "",
            houseNo: "",
            street: "",
            landmark: "",
            postalCode: "",
            country:""

        })
    }

    const addAddress = async () => {
        console.log("addding userId, address", userId, address)
        try {
            const response = await axios.post("http://192.168.21.159:8000/address", { userId, address });
            if (response) {
                console.log(
                    "response is", response.data
                )
                Alert.alert("Success", "address added succesfully.");
                resetaddress();
                setTimeout(() => {
                    navigation.goBack();
                }, 500)

            }
        } catch (err) {
            console.log("error while adding address", err?.message);
        }
    }

    const updateAddress = async () => {
        try {
            const response = await axios.put("http://192.168.21.159:8000/address/update", { address, userId, addressId });
            if (response) {
                Alert.alert("Success", "Address updated successfully")
                resetaddress();
                setTimeout(() => {
                    navigation.goBack();
                }, 500)
            }
        } catch (err) {
            console.log('error updating address', err);
        }
    }
    const handleAddAddress = async () => {
        try {
            if (mode == "edit") {
                return await updateAddress()
            }
            await addAddress();

        } catch (err) {
            console.log("error saving address", err?.message);
        }


    }

    return (
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={40} >
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={{ height: 50, backgroundColor: "#00CED1" }} />

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" ,color:"black"}}>
                        Add a new Address
                    </Text>

                    <TextInput
                        placeholderTextColor={"black"}
                        placeholder="India"
                        onChangeText={(text) => updateaddress({ country: text })}
                        style={{
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                            color: 'black'
                        }}
                    />

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"black"}}>
                            Full name (First and last name)
                        </Text>

                        <TextInput
                            value={address.name}
                            onChangeText={(text) => updateaddress({ name: text })}
                            placeholderTextColor={"black"}
                            style={{
                                padding: 10,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                                borderRadius: 5,
                                color: 'black'
                            }}
                            placeholder="enter your name"
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"black"}}>
                            Mobile numebr
                        </Text>

                        <TextInput
                            value={address.mobileNo}
                            onChangeText={(text) => updateaddress({ mobileNo: text })}
                            placeholderTextColor={"black"}
                            style={{
                                padding: 10,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                                borderRadius: 5,
                                color: 'black'
                            }}
                            placeholder="Mobile No"
                        />
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"black"}}>
                            Flat,House No,Building,Company
                        </Text>

                        <TextInput
                            value={address.houseNo}
                            onChangeText={(text) => updateaddress({ houseNo: text })}
                            placeholderTextColor={"black"}
                            style={{
                                padding: 10,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                                borderRadius: 5,
                                color:'black'
                            }}
                            placeholder=""
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"black"}}>
                            Area,Street,sector,village
                        </Text>
                        <TextInput
                            value={address.street}
                            onChangeText={(text) => updateaddress({ street: text })}
                            placeholderTextColor={"black"}
                            style={{
                                padding: 10,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                                borderRadius: 5,
                                color: 'black'
                            }}
                            placeholder=""
                        />
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"black"}}>Landmark</Text>
                        <TextInput
                            value={address.landmark}
                            onChangeText={(text) => updateaddress({ landmark: text })}
                            placeholderTextColor={"black"}
                            style={{
                                padding: 10,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                                borderRadius: 5,
                                color: 'black'
                            }}
                            placeholder="Eg near appollo hospital"
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"black"}}>Pincode</Text>

                        <TextInput
                            value={address.postalCode}
                            onChangeText={(text) => updateaddress({ postalCode: text })}
                            placeholderTextColor={"black"}
                            style={{
                                padding: 10,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                                borderRadius: 5,
                                color:'black'
                            }}
                            placeholder="Enter Pincode"
                        />
                    </View>

                </View>

            </ScrollView>

            <Pressable
                onPress={handleAddAddress}
                style={{
                    backgroundColor: "#FFC72C",
                    padding: 19,
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    width: 300,
                    alignSelf: 'center'
                }}
            >
                <Text style={{ fontWeight: "bold",color:"white" }}>{mode == "edit" ? "Save" : "Add"} Address</Text>
            </Pressable>
        </KeyboardAvoidingView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AddAddressForm;
