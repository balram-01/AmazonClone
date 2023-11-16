import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const ProductItem = ({ item, key }) => {
    return (
        <Pressable style={{ marginVertical: 25, marginHorizontal: 25 }}>
            <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
            <Text style={{ color: "black", width: 150 }} numberOfLines={1}>{item?.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>₹ {item?.price}</Text>
                <Text style={{ color: "#FFC72C", fontWeight: "bold", }}>{item?.rating.rate} ratings</Text>
            </View>
            <Pressable style={{
                padding: 10,
                backgroundColor: "#FFC72C",
                borderRadius: 20,
                marginTop: 10,
                justifyContent: "center",
                marginHorizontal: 10,
                alignItems: "center"
            }}>
                <Text style={{ color: "black" }}> Add to Cart</Text>
            </Pressable>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({})