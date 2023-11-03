import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, ImageBackground, Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'

const ProductInfo = () => {
    const route = useRoute();
    const { width } = Dimensions.get("window");
    const height = (width * 100) / 100;
    const [addedToCart, setAddedToCart] = useState(false)
    return (
        <ScrollView style={{
            flex: 1, backgroundColor: "white"
        }}>
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
                    <TextInput placeholder="search Amazon.in" placeholderTextColor={"black"} style={{ color: "black" }} />
                </Pressable>
                <Icon name="microphone" size={24} color="black" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params?.carouselImages.map((item, index) => (
                    <ImageBackground
                        source={{ uri: item }}
                        style={{ width, height, marginTop: 25 }}
                        resizeMode="contain"
                        key={index}
                    >
                        <View
                            style={{
                                padding: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#C60C30",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontWeight: "600",
                                        fontSize: 12,
                                    }}
                                >
                                    20% off
                                </Text>
                            </View>

                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#E0E0E0",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Icon
                                    name="share-variant"
                                    size={24}
                                    color="black"
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop: "auto",
                                marginLeft: 20,
                                marginBottom: 20,
                            }}
                        >
                            <Icon name="heart-outline" size={24} color="black" />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>
                    {route?.params?.title}
                </Text>

                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6, color: "black" }}>
                    ₹{route?.params?.price}
                </Text>
            </View>

            <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text style={{ color: "black" }}>Color: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
                    {route?.params?.color}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text style={{ color: "black" }}>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
                    {route?.params?.size}
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5, color: "black" }}>
                    Total : ₹{route.params.price}
                </Text>
                <Text style={{ color: "#00CED1" }}>
                    FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 5,
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    <Icon name="map-marker-outline" size={24} color="black" />

                    <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>
                        Deliver To Balram - Pune 411052
                    </Text>
                </View>
            </View>
            <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
                IN Stock
            </Text>
            <Pressable
                // onPress={() => addItemToCart(route?.params?.item)}
                style={{
                    backgroundColor: "#FFC72C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
            >
                {addedToCart ? (
                    <View>
                        <Text>Added to Cart</Text>
                    </View>
                ) : (
                    <Text>Add to Cart</Text>
                )}
            </Pressable>

            <Pressable
                style={{
                    backgroundColor: "#FFAC1C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
            >
                <Text>Buy Now</Text>
            </Pressable>


        </ScrollView>
    )
}

export default ProductInfo

const styles = StyleSheet.create({})