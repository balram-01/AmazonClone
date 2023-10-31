import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SliderBox } from 'react-native-image-slider-box'
const Home = () => {

  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ backgroundColor: "white" }}>
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
          <TextInput placeholder="search Amazon.in" />
        </Pressable>
        <Icon name="microphone" size={24} color="black" />
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: "#AFEEEE",
        padding: 10
      }}>
        <Icon name="map-marker-outline" size={24} color="black" />
        <Pressable>
          <Text style={{ fontSize: 13, fontWeight: "500", color: "black" }}> Deliver to Balram - Pune 411052</Text>
        </Pressable>
        <Icon name="chevron-down" size={24} color="black" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}  >
        {
          list.map((item, index) => {
            return (
              <Pressable key={index} style={{
                margin: 10,
                alignItems: 'center',
                justifyContent: "center"
              }} >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain"
                  }}
                  source={{ uri: item.image }}
                />
                <Text style={{
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: 'center',
                  color: "black",
                  marginTop: 5
                }}> {item.name} </Text>
              </Pressable>
            )
          })
        }
      </ScrollView>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{ width: "100%" }}
      />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})