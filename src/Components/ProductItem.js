import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/CartReducer'

const ProductItem = ({ item, key }) => {
    const [addedToCart, setAddedToCart] = useState(false)
    const dispatch = useDispatch();

    const addItemToCart = () => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 6000)


    }
    
    return (
        <Pressable
            // onPress={()=>}
            style={{ marginVertical: 25, marginHorizontal: "5%" }}>
            <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
            <Text style={{ color: "black", width: 150 }} numberOfLines={1}>{item?.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>₹ {item?.price}</Text>
                <Text style={{ color: "#FFC72C", fontWeight: "bold", }}>{item?.rating.rate} ratings</Text>
            </View>
            <Pressable
                onPress={addItemToCart}
                style={{
                padding: 10,
                backgroundColor: "#FFC72C",
                borderRadius: 20,
                marginTop: 10,
                justifyContent: "center",
                marginHorizontal: 10,
                alignItems: "center"
            }}>
                {addedToCart ? (
                    <View>
                        <Text style={{ color: 'white', fontWeight: "bold" }}>Added to Cart</Text>
                    </View>
                ) : (
                    <Text style={{color:'white',fontWeight:"bold"}}>Add to Cart</Text>
                )}
            </Pressable>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({})