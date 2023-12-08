//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
// create a component
const MyCart = () => {
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch()
    let total = cart
        ?.map((product) => product.price * product.quantity)
        .reduce((curr, prev) => curr + prev, 0);


    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item))
    }

    const deleteItem = (item) => {
          dispatch(removeFromCart(item))
    }

    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }

    return (
        <ScrollView style={styles.mainContainer}>
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 7,
                        gap: 10,
                        backgroundColor: 'white',
                        borderRadius: 3,
                        height: 38,
                        flex: 1,
                    }}>
                    <Icon
                        name="magnify"
                        size={22}
                        color="black"
                        style={{ paddingLeft: 10 }}
                    />
                    <TextInput placeholderTextColor={'grey'} placeholder="search Amazon.in" />
                </Pressable>
            </View>
            <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "400",color:"black" }}>Subtotal : </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" ,color:"black"}}>{total}</Text>
            </View>
            <Text style={{ marginHorizontal: 10 ,color:'grey'}}>EMI details Available</Text>
            <Pressable
                onPress={() => navigation.navigate("Confirm")}
                style={{
                    backgroundColor: "#FFC72C",
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginTop: 10,
                }}
            >
                <Text style={{color:'white',fontWeight:"bold"}}>Proceed to Buy ({cart.length}) items</Text>
            </Pressable>
            <Text
                style={{
                    height: 1,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    color:"black",
                    marginTop: 16,
                }}
            />
            <View style={{ marginHorizontal: 10 }}>
                {cart?.map((item, index) => (
                    <View
                        style={{
                            backgroundColor: "white",
                            marginVertical: 10,
                            borderBottomColor: "#F0F0F0",
                            borderWidth: 2,
                            borderLeftWidth: 0,
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                        }}
                        key={index}
                    >
                        <Pressable
                            onPress={() =>
                                navigation.navigate('Info', {
                                    id: item.id,
                                    title: item.title,
                                    price: item?.price,
                                    carouselImages: item.carouselImages,
                                    color: item?.color,
                                    size: item?.size,
                                    oldPrice: item?.oldPrice,
                                    item: item,
                                })
                            }
                            style={{
                                marginVertical: 10,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <View>
                                <Image
                                    style={{ width: 140, height: 140, resizeMode: "contain" }}
                                    source={{ uri: item?.image }}
                                />
                            </View>

                            <View>
                                <Text  numberOfLines={3} style={{ width: 150, marginTop: 10 ,color:"black"}}>
                                    {item?.title}
                                </Text>
                                <Text
                                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 ,color:"black"}}
                                >
                                    {item?.price}
                                </Text>
                                <Image
                                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                                    source={{
                                        uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                                    }}
                                />
                                <Text style={{ color: "green" }}>In Stock</Text>
                                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
                            </View>
                        </Pressable>

                        <Pressable
                            style={{
                                marginTop: 15,
                                marginBottom: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 7,
                                }}
                            >
                                {item?.quantity > 1 ? (
                                    <Pressable
                                        onPress={() => decreaseQuantity(item)}
                                        style={{
                                            backgroundColor: "#D8D8D8",
                                            padding: 7,
                                            borderTopLeftRadius: 6,
                                            borderBottomLeftRadius: 6,
                                        }}
                                    >
                                        <Icon name="minus" size={24} color="black" />
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        onPress={() => deleteItem(item)}
                                        style={{
                                            backgroundColor: "#D8D8D8",
                                            padding: 7,
                                            borderTopLeftRadius: 6,
                                            borderBottomLeftRadius: 6,
                                        }}
                                    >
                                        <Icon name="delete" size={24} color="black" />
                                    </Pressable>
                                )}

                                <Pressable
                                    style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 18,
                                        paddingVertical: 6,
                                    }}
                                >
                                    <Text style={{color:"black"}}>{item?.quantity}</Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => increaseQuantity(item)}
                                    style={{
                                        backgroundColor: "#D8D8D8",
                                        padding: 7,
                                        borderTopLeftRadius: 6,
                                        borderBottomLeftRadius: 6,
                                    }}
                                >
                                    <Icon name="plus" size={24} color="black" />
                                </Pressable>
                            </View>
                            <Pressable
                                onPress={() => deleteItem(item)}
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    borderColor: "#C0C0C0",
                                    borderWidth: 0.6,
                                }}
                            >
                                <Text style={{color:"grey"}}>Delete</Text>
                            </Pressable>
                        </Pressable>

                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 15,
                            }}
                        >
                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    borderColor: "#C0C0C0",
                                    borderWidth: 0.6,
                                }}
                            >
                                <Text style={{color:"grey"}}>Save For Later</Text>
                            </Pressable>

                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                    borderColor: "#C0C0C0",
                                    borderWidth: 0.6,
                                }}
                            >
                                <Text style={{color:"grey"}}>See More Like this</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                ))}
            </View>

        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainContainer: {
        // marginTop: 55,
        flex: 1,
        backgroundColor: "white"
    }
});

//make this component available to the app
export default MyCart;
