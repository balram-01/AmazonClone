import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    Alert,
    Image
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../../UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddAddress = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId ,setDefaultAddress} = useContext(UserType);
 
    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://192.168.21.159:8000/addresses/${userId}`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );

    const handleNavigation = (address, mode) => {
        navigation.navigate("AddAddressForm", { address, mode });
    }
    
    const removeAddressFromLocalData = (id) => {
        const updatedAdress = addresses.filter((address) => address._id !== id);
        setAddresses(updatedAdress);
    }

    const storeDefaultAddress = async (item) => {
       const newDefault={...item,default:true}
        try {
            const response = await axios.put("http://192.168.21.159:8000/address/updateDefault", { userId, addressId: item._id });
            if (response.data) {
                setDefaultAddress(newDefault);
                Alert.alert("Success", "Address set as default")
                // const addressIndex = addresses.indexOf(item);
                // addresses[addressIndex] = newDefault;
                setAddresses(response.data?.adresses??addresses)
               
            }
        } catch (err) {
            console.log('error updating address', err);
        }
    }
    const removeAddress = async (id) => {
        console.log("removing address", id)
        try {
            const response = await axios.put("http://192.168.21.159:8000/address/remove", { addressId: id, userId })
            if (response) {
                Alert.alert("Success", "Address deleted successfully");
                removeAddressFromLocalData(id);
            }
        } catch (err) {
            console.log("error removing address",err)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View
                style={{
                    backgroundColor: "#00CED1",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
              
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 7,
                        gap: 10,
                        backgroundColor: "white",
                        borderRadius: 3,
                        height: 38,
                        flex: 1,
                    }}
                >
                    <Icon
                        style={{ paddingLeft: 10 }}
                        name="magnify"
                        size={22}
                        color="black"
                    />
                    <TextInput placeholderTextColor={'grey'} placeholder="Search Amazon.in" />
                </Pressable>

                <Icon name="microphone" size={24} color="black" />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" ,color:"black"}}>Your Addresses</Text>

                <Pressable
                    onPress={() => navigation.navigate("AddAddressForm")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingVertical: 7,
                        paddingHorizontal: 5,
                    }}
                >
                    <Text style={{color:"black"}}>Add a new Address</Text>
                    <Icon name="chevron-right" size={24} color="black" />
                </Pressable>

                <Pressable>
                    {/* all the added adresses */}
                    {addresses?.map((item, index) => (
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderColor: "#D0D0D0",
                                padding: 10,
                                flexDirection: "column",
                                gap: 5,
                                marginVertical: 10,
                            }}
                        >
                            { item.default?<View
                                style={{
                                    width: "100%",
                                    borderBottomWidth: .2,
                                    borderBottomColor: 'black',
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap:5
                                }}>
                                <Text style={{
                                    color: "grey"
                                }}>
                                    Default :
                                </Text>
                                <Image
                                    source={require("../assests/amazon_logo.png")}
                                    resizeMode="contain"
                                    resizeMethod="auto"
                                    style={{width:50,height:50,marginTop:7}}
                                
                                />

                            </View>:<></>}
                            <View
                                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                            >
                                <Text style={{ fontSize: 15, fontWeight: "bold" ,color:'black'}}>
                                    {item?.name}
                                </Text>
                                <Icon name="map-marker-outline" size={24} color="red" />
                            </View>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.houseNo}, {item?.landmark}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.street}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                India, Bangalore
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                phone No : {item?.mobileNo}
                            </Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                pin code : {item?.postalCode}
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    marginTop: 7,
                                }}
                            >
                                <Pressable
                                    onPress={() => handleNavigation(item, "edit")}
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text style={{color:"black"}}>Edit</Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => removeAddress(item._id)}

                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text style={{color:"black"}}>Remove</Text>
                                </Pressable>

                                <Pressable
                                    onPress={()=>storeDefaultAddress(item)}
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text style={{color:"black"}}>Set as Default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddAddress;

const styles = StyleSheet.create({});