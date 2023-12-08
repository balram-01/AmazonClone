import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios';
import ProductItem from '../Components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserType } from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const list = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
      name: 'Home',
    },
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
      name: 'Deals',
    },
    {
      id: '3',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Electronics',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '5',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
      name: 'Music',
    },
    {
      id: '6',
      image: 'https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg',
      name: 'Fashion',
    },
  ];
  const images = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];

  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
    },
    {
      id: '40',
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
    },
  ];
  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId, defaultAddress, setDefaultAddress } = useContext(UserType);
  const fetchAddresses = async () => {
    const response = await axios.get(`http://192.168.21.159:8000/addresses/${userId}`);
    if (response.data)
      if (response.data.addresses) {
        setAddresses(response.data.addresses);
        const defaultAddress = response.data.addresses.find((address) => address.default == true);
         setDefaultAddress(defaultAddress);
      }
    

  }

   useFocusEffect(useCallback(() => {
    if (userId) {
      fetchAddresses()
    }
  }, [userId]))

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

    }

    fetchUser();

  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        console.log('error fetching products data', err);
      }
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    StatusBar.setBackgroundColor("#00CED1", true);
    return () => StatusBar.setBackgroundColor("black", true)

  }, [])

  const onGenderOpen = useCallback(() => {
    // setCompanyOpen(false);
  }, []);
  console.log("defaultAddress", addresses)
  const getdefaultAddressText = () => {
    if (defaultAddress) {
      const name = defaultAddress?.name ?? "";
      const city = defaultAddress?.country ?? "";
      const postalCode = defaultAddress?.postalCode ?? ""
      return `${name} - ${city} ${postalCode}`
    }
  }

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        <View
          style={{
            backgroundColor: '#00CED1',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
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
            <TextInput  placeholderTextColor={"grey"} placeholder="search Amazon.in" />
          </Pressable>
          <Icon name="microphone" size={24} color="black" />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#AFEEEE',
            padding: 10,
          }}>
          <Icon name="map-marker-outline" size={24} color="black" />
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              
           { defaultAddress? `Deliver to ${getdefaultAddressText()}`:"Add an Address"}
            </Text>
          </Pressable>
          <Icon name="chevron-down" size={24} color="black" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    textAlign: 'center',
                    color: 'black',
                    marginTop: 5,
                  }}>
                  {' '}
                  {item.name}{' '}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={'#13274F'}
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{ width: '100%' }}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 18,
            padding: 10,
          }}>
          Trending Deals Of The Week{' '}
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {deals.map((item, index) => (
            <Pressable
              onPress={() => navigation.navigate('Info', {
                id: item.id,
                title: item.title,
                price: item?.price,
                carouselImages: item.carouselImages,
                color: item?.color,
                size: item?.size,
                oldPrice: item?.oldPrice,
                item: item,
              })}
              style={{
                marginVertical: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={{ uri: item.image }}
                style={{ height: 190, width: 190, resizeMode: 'contain' }}
              />
            </Pressable>
          ))}
        </View>
        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Today's Deals
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, index) => (
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
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
                source={{ uri: item?.image }}
              />

              <View
                style={{
                  backgroundColor: '#E31837',
                  paddingVertical: 5,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Upto {item?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            marginTop: 15,
          }}
        />
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: '45%',
            marginBottom: open ? 50 : 15,
          }}>
          <DropDownPicker
            style={{
              borderColor: '#B7B7B7',
              height: 30,
              marginBottom: open ? 120 : 15,
            }}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          {products
            .filter(item => item.category == category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.bottomView}>
          <View style={styles.modalView}>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
                Choose your Location
              </Text>

              <Text style={{ marginTop: 5, fontSize: 16, color: 'gray' }}>
                Select a delivery location to see product availabilty and
                delivery options
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}>
              
              {addresses?.map((item, index) => (
                <Pressable
                  onPress={() => setDefaultAddress(item)}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor: defaultAddress === item ? "#FBCEB1" : "white"
                  }}
                >
                  <View
                    style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "bold" ,color:'grey'}}>
                      {item?.name}
                    </Text>
                    <Icon name="map-marker-outline" size={24} color="red" />
                  </View>

                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center", color: 'grey' }}
                  >
                    {item?.houseNo},{item?.landmark}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center", color: 'grey' }}
                  >
                    {item?.street}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center", color: 'grey' }}
                  >
                    India, Pune
                  </Text>
                </Pressable>
              ))}
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("AddAddress")
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: '#D0D0D0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  padding: 10,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#0066b2',
                    fontWeight: '500',
                  }}>
                  Add an Address or pick-up point
                </Text>
              </Pressable>
            </ScrollView>
            <View style={{ flexDirection: 'column', gap: 7, marginBottom: 30 }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Icon name="map-marker-outline" size={22} color="#0066b2" />
                <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                  Enter an Indian pincode
                </Text>
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Ionicon name="locate" size={22} color="#0066b2" />
                <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                  Use My Currect location
                </Text>
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Icon name="earth" size={22} color="#0066b2" />

                <Text style={{ color: '#0066b2', fontWeight: '400' }}>
                  Deliver outside India
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    height: 400,
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
