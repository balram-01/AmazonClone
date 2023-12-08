//import liraries
import axios from 'axios';
import React, { Component ,useState,useEffect,useContext, useLayoutEffect, useCallback,} from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Pressable ,StatusBar} from 'react-native';
import { UserType } from '../../UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
const Profile = () => {
    const { userId, setUserId } = useContext(UserType);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const navigation = useNavigation();

    const getUser = async () => {
        try {
            const response = await axios.get(`http://192.168.21.159:8000/profile/${userId}`);
            if (response.status == 200) {
                setUser(response.data.user)
            }
        } catch (err) {
            console.log("error getting userDetails", err);
       }
    } 
    
    const getOrders = async () => {
        try {
            const response = await axios.get(`http://192.168.21.159:8000/orders/${userId}`);
            if (response.status == 200) {
                setOrders(response.data?.orders)
            }
        } catch (err) {
            console.log("error fetching orders", err);
        } finally {
           
       }
    } 
  useFocusEffect(  useCallback (() => {
      Promise.all([getUser(), getOrders()])
          .finally(() => {
        setLoading(false)
          });

    }, [userId]))
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: "",
    //         headerStyle: {
    //             backgroundColor: "#00CED1",
    //         },
    //         headerLeft: () => (
    //             <Image
    //                 style={{ width: 140, height: 120, resizeMode: "contain" }}
    //                 source={{
    //                     uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
    //                 }}
    //             />
    //         ),
    //         headerRight: () => (
    //             <View
    //                 style={{
    //                     flexDirection: "row",
    //                     alignItems: "center",
    //                     gap: 6,
    //                     marginRight: 12,
    //                 }}
    //             >
    //                 <Icon name="notifications" size={24} color="black" />

    //                 <Icon name="magnify" size={24} color="black" />
    //             </View>
    //         ),
    //     });
    // }, []);
    const logout = () => {
        clearAuthToken();
    };
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("auth token cleared");
        navigation.replace("Login");
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ backgroundColor: "#00CED1", flexDirection: 'row', alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                     <Image
                                style={{ width: 60, height: 50, resizeMode: "cover" }}
                                source={{
                                    uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
                                }}
                />
                 <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 6,
                                    marginRight: 12,
                                }}
                            >
                              <Icon name="bell" size={24} color="black" />

                                <Icon name="magnify" size={24} color="black" />
                            </View>
            </View>
          <View style={{padding:10}}>
            <Text style={{ fontSize: 16, fontWeight: "bold" ,color:"black"}}>
                Welcome! {user?.name}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 12,
                }}
            >
                <Pressable
                    style={{
                        padding: 10,
                        backgroundColor: "#E0E0E0",
                        borderRadius: 25,
                        flex: 1,
                    }}
                >
                    <Text style={{ textAlign: "center",color:'white',fontWeight:"bold"}}>Your orders</Text>
                </Pressable>

                <Pressable
                    style={{
                        padding: 10,
                        backgroundColor: "#E0E0E0",
                        borderRadius: 25,
                        flex: 1,
                    }}
                >
                    <Text style={{ textAlign: "center",color:'white',fontWeight:"bold" }}>Your Account</Text>
                </Pressable>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 12,
                }}
            >
                <Pressable
                    style={{
                        padding: 10,
                        backgroundColor: "#E0E0E0",
                        borderRadius: 25,
                        flex: 1,
                    }}
                >
                    <Text style={{ textAlign: "center",color:'white',fontWeight:"bold" }}>Buy Again</Text>
                </Pressable>

                <Pressable
                    onPress={logout}
                    style={{
                        padding: 10,
                        backgroundColor: "#E0E0E0",
                        borderRadius: 25,
                        flex: 1,
                    }}
                >
                    <Text style={{ textAlign: "center",color:'white',fontWeight:"bold" }}>Logout</Text>
                </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : orders.length > 0 ? (
                    orders.map((order) => (
                        <Pressable
                            style={{
                                marginTop: 20,
                                padding: 15,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#d0d0d0",
                                marginHorizontal: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            key={order._id}
                        >
                            {/* Render the order information here */}
                            {order.products.slice(0, 1)?.map((product) => (
                                <View style={{ marginVertical: 10 }} key={product._id}>
                                    <Image
                                        source={{ uri: product.image }}
                                        style={{ width: 100, height: 100, resizeMode: "contain" }}
                                    />
                                </View>
                            ))}
                        </Pressable>
                    ))
                ) : (
                    <Text>No orders found</Text>
                )}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Profile;
