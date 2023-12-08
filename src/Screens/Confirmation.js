//import liraries
import React, { Component, useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image ,Alert} from 'react-native';
import { UserType } from '../../UserContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../redux/CartReducer';
// create a component
const Confirmation = () => {
    const dispatch = useDispatch();
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId, defaultAddress, setDefaultAddress } = useContext(UserType);
    const [selectedAdress, setSelectedAdress] = useState(defaultAddress);
    const [deliveryOption, setDeliveryOption] = useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const cart = useSelector((state)=>state.cart.cart)
    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
    const fetchAddresses = async () => {
        const response = await axios.get(`http://192.168.21.159:8000/addresses/${userId}`);
        if (response.data)
            if (response.data.addresses) {
                setAddresses(response.data.addresses);
                const defaultAddress = response.data.addresses.find((address) => address.default == true);
                setDefaultAddress(defaultAddress);
            }


    }

    const handleNavigation = (address, mode) => {
    navigation.navigate("AddAddressForm", { address, mode });
    }
    useEffect(() => {
        if (userId) {
            fetchAddresses()
        }
    }, [userId])
     
    const pay = async() => {
        try {
           
        } catch (err) {
            console.log("error processing payment ");
       }
   }
    const placeOrder = async () => {
        const orderPayload = {
            userId: userId,
            cartItems: cart,
            totalPrice: total,
            shippingAddress: selectedAdress,
            paymentMethod:selectedOption
        }
        try {
            const response = await axios.post("http://192.168.21.159:8000/orders", orderPayload);
            if (response.status == 200) {
                dispatch(cleanCart());
               navigation.replace("Orders");
             }
        } catch (err) {
            console.log("error placing order", err);
        }
    }
    const removeAddressFromLocalData = (id) => {
        const updatedAdress = addresses.filter((address) => address._id !== id);
        setAddresses(updatedAdress);
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
            console.log("error removing address", err)
        }
    }
    const [currentStep, setCurrentStep] = useState(0);
    return (
        <ScrollView style={{ marginTop: 55 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        justifyContent: "space-between",
                    }}
                >

                    {steps.map((step, index) => (
                        <View
                            style={{

                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2

                            }}
                        >
                            <View style={{
                                backgroundColor: index < currentStep ? "green" : "grey",
                                width: 35,
                                height: 35,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: "center",

                            }}>
                                {index < currentStep ? (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        &#10003;
                                    </Text>
                                ) : (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        {index + 1}
                                    </Text>
                                )}
                            </View>
                            <Text
                                style={{
                                    color: "black",
                                    fontWeight: "500"
                                }}
                            >
                                {step.title}
                            </Text>
                        </View>
                    ))}
                </View>
                {currentStep == 0 ? (
                    <View>
                        <Text

                            style={{
                                color: "black",
                                fontWeight: "600",
                                fontSize: 17
                            }}>
                            Select Delivery Address
                        </Text>
                        {addresses?.map((item, index) => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#D0D0D0",
                                    padding: 10,
                                    marginVertical: 10

                                }}
                            >
                                <Icon
                                    onPress={() => {
                                        setSelectedAdress(item)
                                    }}
                                    name={selectedAdress && selectedAdress._id == item._id ? "record-circle-outline" : "checkbox-blank-circle-outline"}
                                    color={selectedAdress && selectedAdress._id == item._id ? "#008397" : "black"}
                                    size={23}
                                />
                                <Pressable
                                    style={{

                                        padding: 10,
                                        flexDirection: "column",
                                        gap: 5,
                                        marginVertical: 10,
                                    }}
                                >

                                    <View
                                        style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: "bold",color:'grey' }}>
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
                                            <Text style={{ color: "black" }}>Remove</Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => storeDefaultAddress(item)}
                                            style={{
                                                backgroundColor: "#F5F5F5",
                                                paddingHorizontal: 10,
                                                paddingVertical: 6,
                                                borderRadius: 5,
                                                borderWidth: 0.9,
                                                borderColor: "#D0D0D0",
                                            }}
                                        >
                                            <Text style={{ color: "black" }}>Set as Default</Text>
                                        </Pressable>
                                    </View>
                                    {selectedAdress && selectedAdress._id === item._id ?
                                        (<Pressable
                                            onPress={() =>
                                              setCurrentStep(1)
                                            }
                                            style={{
                                                backgroundColor: "#008397",
                                                padding: 10,
                                                borderRadius: 20,
                                                marginTop: 10,
                                                alignItems: 'center',
                                                justifyContent:"center"
                                                
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white"
                                                }}
                                            >
                                                Deliver to this Address
                                            </Text>
                                        </Pressable>) : <></>
                                    }
                                </Pressable>
                            </View>
                        ))}
                        
                    </View>
                    
                ) :
                
                    currentStep == 1 ? (
                        <View>

                            <Text
                                style={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontSize:18
                            }}
                            >
                               Choose your delivery options
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    padding: 8,
                                    gap: 7,
                                    borderColor: "#D0D0D0",
                                    borderWidth: 1,
                                    marginTop: 10,
                                }}
                            >
                                <Icon
                                    onPress={() => {
                                        setDeliveryOption(!deliveryOption)
                                    }}
                                    name={deliveryOption? "record-circle-outline" : "checkbox-blank-circle-outline"}
                                    color={deliveryOption? "#008397" : "black"}
                                    size={23}
                                />

                                <Text style={{ flex: 1,color:"grey" }}>
                                    <Text style={{ color: "green", fontWeight: "500" }}>
                                        Tomorrow by 10pm
                                    </Text>{" "}
                                    - FREE delivery with your Prime membership
                                </Text>
                            </View>
                            <Pressable
                                onPress={() => setCurrentStep(currentStep+1)}
                                style={{
                                    backgroundColor: "#FFC72C",
                                    padding: 10,
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 15,
                                }}
                            >
                                <Text style={{color:"white",fontWeight:"bold"}}>Continue</Text>
                            </Pressable>
                            </View>

                    ) : currentStep == 2 ? (
                
                            <View style={{ marginHorizontal: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" ,color:"black"}}>
                                    Select your payment Method
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        padding: 8,
                                        borderColor: "#D0D0D0",
                                        borderWidth: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 7,
                                        marginTop: 12,
                                    }}
                                >
                                    <Icon
                                        onPress={() => {
                                            setSelectedOption("cash")
                                        }}
                                        name={selectedOption=="cash" ? "record-circle-outline" : "checkbox-blank-circle-outline"}
                                        color={selectedOption == "cash" ? "#008397" : "black"}
                                        size={23}
                                    />
                                    <Text style={{color:"black"}}>Cash on Delivery</Text>

                                </View>
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        padding: 8,
                                        borderColor: "#D0D0D0",
                                        borderWidth: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 7,
                                        marginTop: 12,
                                    }}
                                >
                                    <Icon
                                        onPress={() => {
                                            setSelectedOption("card");
                                            Alert.alert("UPI/Debit card", "Pay Online", [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel is pressed"),
                                                },
                                                {
                                                    text: "OK",
                                                    onPress: () => pay(),
                                                },
                                            ]);
                                        }}
                                        name={selectedOption == "card" ? "record-circle-outline" : "checkbox-blank-circle-outline"}
                                        color={selectedOption == "card" ? "#008397" : "black"}
                                        size={23}
                                    />
                                    <Text style={{color:"black"}}>UPI / Credit or debit card</Text>
                                </View>
                                <Pressable
                                    onPress={() => setCurrentStep(3)}
                                    style={{
                                        backgroundColor: "#FFC72C",
                                        padding: 10,
                                        borderRadius: 20,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 15,
                                    }}
                                >
                                    <Text>Continue</Text>
                                </Pressable>
                                </View>
                        ) : currentStep == 3 && selectedOption === "cash" ? (
                                <View style={{ marginHorizontal: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" ,color:"black"}}>Order Now</Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 8,
                                            backgroundColor: "white",
                                            padding: 8,
                                            borderColor: "#D0D0D0",
                                            borderWidth: 1,
                                            marginTop: 10,
                                        }}
                                    >
                                        <View>
                                            <Text style={{ fontSize: 17, fontWeight: "bold",color:"black" }}>
                                                Save 5% and never run out
                                            </Text>
                                            <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                                                Turn on auto deliveries
                                            </Text>
                                        </View>
                                        <Icon
                                            name="chevron-right"
                                            size={24}
                                            color="black"
                                        />
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: "white",
                                            padding: 8,
                                            borderColor: "#D0D0D0",
                                            borderWidth: 1,
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text style={{ color:"grey"}}>Shipping to {selectedAdress?.name}</Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                                Items
                                            </Text>

                                            <Text style={{ color: "gray", fontSize: 16 }}>₹{total}</Text>
                                        </View>
                                        <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 8,
                                        }}
            >
                                        <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                            Delivery
                                        </Text>

                                        <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                                Order Total
                                            </Text>

                                            <Text
                                                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                                            >
                                                ₹{total}
                                            </Text>
                                        </View>
                                   
                                    </View>

                                    <View
                                        style={{
                                            backgroundColor: "white",
                                            padding: 8,
                                            borderColor: "#D0D0D0",
                                            borderWidth: 1,
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

                                        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7,color:"black" }}>
                                            Pay on delivery (Cash)
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={placeOrder}
                                        style={{
                                            backgroundColor: "#FFC72C",
                                            padding: 10,
                                            borderRadius: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 20,
                                        }}
                                    >
                                        <Text style={{color:"white",fontWeight:"bold"}}>Place your order</Text>
                                    </Pressable>
                                </View>
                            
                ): <></>
                }

               
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
export default Confirmation;
