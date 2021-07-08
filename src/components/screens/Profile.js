import React from 'react';
import {
    StyleSheet, View, TextInput, Text, BackHandler, Switch,
    Image, TouchableHighlight, ToastAndroid, ImageBackground,
    ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView
} from 'react-native';

// import EmailIcon from "react-native-vector-icons/MaterialIcons"; // email
import PasswordIcon from "react-native-vector-icons/Entypo"; // locked
import { globalStyle } from "../../styles/GlobalStyles";
// import WaitingLoader from '../screens/WaitingLoader';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RWalletIcon from "react-native-vector-icons/Fontisto";
import EWalletIcon from "react-native-vector-icons/FontAwesome5";
import PersonIcon from "react-native-vector-icons/FontAwesome";


// import AsyncStorage from '@react-native-community/async-storage';
import UserApi from "../../Services/UserApi";
import DescriptionIcon from "react-native-vector-icons/MaterialIcons"; // description
import EmailIcon from "react-native-vector-icons/Fontisto"; // email
// import PersonIcon from "react-native-vector-icons/Fontisto"; // person
import AddressIcon from "react-native-vector-icons/Entypo"; // location
import Logout from "react-native-vector-icons/MaterialCommunityIcons"
import EditIcon from "react-native-vector-icons/FontAwesome"; // edit
import BankIcon from "react-native-vector-icons/FontAwesome"; // bank
import ShopIcon from "react-native-vector-icons/Entypo"; // shop
import LocationIcon from "react-native-vector-icons/Entypo"; // shop
import PhoneIcon from "react-native-vector-icons/Feather"; // phone-call
import HelpIcon from "react-native-vector-icons/Entypo";
// import { ScrollView } from 'react-native-gesture-handler';
// import AppConfig from "../../component/constants/AppConfig";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Geolocation from "@react-native-community/geolocation"; // help-with-circle

export async function request_device_location_runtime_permission() {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
    } catch (err) {
        // console.warn(err);
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
        this.state = {
            profileResponse: undefined,
            waitingLoaderVisible: false,
            isLoading: false,
            userProfileResponse: undefined,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }
        }

        if (Platform.OS === 'android') {
            this.getPermissions()
        } else {
            this.getCurrentLocation(async () => {
                await this.updateDeviceData();
                // await this.updateProfile();
            })
        }

    }

    getCurrentLocation = async (callback) => {

        Geolocation.getCurrentPosition(
            async (position) => {
                // console.log("got it")

                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                };

                this.setState({
                    region: region
                });
                if (callback) {
                    callback();
                }
            },
            error => {
                ToastAndroid.show(
                    "Unable to get your current location",
                    ToastAndroid.SHORT,
                );
                if (callback) {
                    callback();
                }
            }, {
            maximumAge: 0,
            timeout: 20000
        });
    };

    getPermissions = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 20000, fastInterval: 5000 })
            .then(data => {
                if (data === "already-enabled") {
                    this.getCurrentLocation()
                } else {
                    setTimeout(() => {
                        this.getCurrentLocation();
                    }, 1000)
                }
            })
    };

    onBackButtonPressed() {

        this.props.navigation.goBack();
        return true;
    }

    componentDidMount = async () => {
        this.getUserProfile()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction()
        });
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    onFocusFunction = async () => {
        await this.getProfile()
    }

    getProfile = async () => {
        try {
            this.setState({ waitingLoaderVisible: true, isLoading: true })
            let response = await UserApi.getProfileData(this.props);
            if (response && response !== null && response !== undefined) {
                this.setState({ waitingLoaderVisible: false, isLoading: false })
                this.setState({ profileResponse: response })
            }

        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ waitingLoaderVisible: false, isLoading: false })
        }
    };

    getUserProfile = async () => {
        try {
            let response = await UserApi.getUserProfile(this.props);
            if (response && response !== null && response !== undefined) {
                this.setState({ userProfileResponse: response.user })
            }
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    updateLocation = async () => {
        try {
            this.setState({ waitingLoaderVisible: true, isLoading: true })
            await this.getCurrentLocation(async () => {
                await this.updateProfile();
                ToastAndroid.show(
                    "Updated store location",
                    ToastAndroid.SHORT,
                );
                this.setState({ waitingLoaderVisible: false, isLoading: true });
            })
        } catch (e) {
            this.setState({ waitingLoaderVisible: false, isLoading: true })
            ToastAndroid.show(
                "Unable to update your location",
                ToastAndroid.SHORT,
            );
        }
    };

    updateProfile = async () => {
        const { region } = this.state;
        try {
            if (region.latitude == 0) {
                return;
            }

            let data = {
                lat: region.latitude,
                long: region.longitude
            };
            const formData = new FormData();
            for (var key in data) {
                formData.append(key, data[key]);
            }

            let response = await UserApi.updateProfile(formData, this.props)
            if (response && response.error) {
                ToastAndroid.show(response.error, ToastAndroid.SHORT,);
            }

        } catch (error) {
            console.log(error)
        } finally {
        }
    }


    navigateToback = () => {
        this.props.navigation.goBack();
    }

    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }

    render() {
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: globalStyle.primaryThemeColor }}>
                <ScrollView>
                    <View style={{ height: hp(35), justifyContent: 'center', alignItems: 'center', marginTop: wp(2), backgroundColor: globalStyle.secondaryThemeColor }}>
                        {/* {(profilePhoto != undefined && profileResponse && cachedProfileEmail == profileResponse.email) ?
                            <View>
                                {console.log(profilePhoto)}
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center" }} onPress={() => this.chooseProfilePhoto()}>
                                    <Image
                                        source={{ uri: profilePhoto }}
                                        style={{ width: wp('40%'), height: wp('40%'), borderRadius: wp('50') }}
                                    />
                                    <View style={{ width: wp('11%'), height: wp('11%'), backgroundColor: "#284a83", borderRadius: 50, justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 1 }}>
                                        <EditIcon name={'edit'} size={20} color={'white'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : */}
                        <TouchableOpacity onPress={() => this.chooseProfilePhoto()}>
                            <PersonIcon name={"user-circle-o"} color="gray" size={130} resizeMode="center" style={{ height: hp(20), width: wp(40), borderRadius: 150 }} />
                        </TouchableOpacity>
                        {/* } */}
                        {/* <View style={{backgroundColor:"#ffffff",height: hp(5), width: wp(10), borderRadius: 300,marginTop:-40,marginLeft:60}}>
                  <TouchableOpacity>
                    <Ionicons name={"pencil-outline"} color="gray" size={wp(5)} style={{justifyContent:"center",alignSelf:"center",marginTop:8}} />
                  </TouchableOpacity>
                </View> */}
                        <View style={{ alignItems: "center" }}>
                            {/* {(profileResponse && profileResponse.fullName) ? <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(4) }}>{profileResponse.fullName}</Text> : null} */}
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(4) }}>Gargi...</Text>
                        </View>
                        <View >
                            {/* {(profileResponse && profileResponse.phoneNumber) ? <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(3) }}>{profileResponse.phoneNumber}</Text> : null} */}
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(4) }}>Singh...</Text>
                        </View>
                        <View >
                            {/* {(profileResponse && profileResponse.email) ? <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(3) }}>{profileResponse.email}</Text> : null} */}
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(4) }}>Rao...</Text>
                        </View>




                    </View>

                    <View style={{ height: hp(10), justifyContent: 'space-around', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyle.secondaryThemeColor }}>

                        <View style={{ flexDirection: 'row' }} >
                            <Ionicons name={'person-outline'} color="gray" size={wp(4)} />
                            <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(3) }}>Name</Text>
                            <TouchableOpacity>
                                <Ionicons name={"pencil-outline"} color="gray" size={wp(5)} style={{ color: 'gray', fontSize: wp(5), paddingLeft: wp(75) }} />
                            </TouchableOpacity>
                        </View>
                        {/* <View >
                            {(profileResponse && profileResponse.fullName) ? <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(3), paddingLeft: wp(7) }}>{profileResponse.fullName}</Text> : null}
                        </View> */}

                    </View>


                    <View style={{ height: hp(10), justifyContent: 'space-around', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyle.secondaryThemeColor }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name={'call-outline'} color="gray" size={wp(4)} />
                            <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(3) }}>Mobile no.</Text>
                            <TouchableOpacity>
                                <Ionicons name={"pencil-outline"} color="gray" size={wp(5)} style={{ color: 'gray', fontSize: wp(5), paddingLeft: wp(69) }} />
                            </TouchableOpacity>
                        </View>
                        {/* <View >
                            {(profileResponse && profileResponse.phoneNumber) ? <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(3), paddingLeft: wp(7) }}>{profileResponse.phoneNumber}</Text> : null}
                        </View> */}
                    </View>
                    <View style={{ height: hp(10), justifyContent: 'space-around', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyle.secondaryThemeColor }}>
                        <View style={{ flexDirection: 'row' }} >
                            <Ionicons name={'mail-open-outline'} color="gray" size={wp(4)} />
                            <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(3) }}>Email Address</Text>
                        </View>
                        {/* <View >
                            {(profileResponse && profileResponse.email) ? <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(3), paddingLeft: wp(7) }}>{profileResponse.email}</Text> : null}
                        </View> */}
                    </View>


                    <TouchableOpacity onPress={() => this.props.navigation.navigate("GiftWallet")}>
                        <View style={{ height: hp(10), justifyContent: 'space-around', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyle.secondaryThemeColor }}>

                            <View style={{ flexDirection: 'row' }} >
                                <RWalletIcon name={'wallet'} color="gray" size={wp(4)} />
                                <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(3) }}>Gift Wallet</Text>
                            </View>
                            {/* <View >
                                {rewardWallet ? <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(7) }}>{`\u20B9 ${rewardWallet}`}</Text> : <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(7) }}>{`\u20B9 `}0</Text>}
                            </View> */}

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ReferenceBonus")}>
                        <View style={{ height: hp(10), justifyContent: 'space-around', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyle.secondaryThemeColor }}>

                            <View style={{ flexDirection: 'row' }} >
                                <EWalletIcon name={'wallet'} color="gray" size={wp(4)} />
                                <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(3) }}>Reference Bonus</Text>
                            </View>
                            {/* <View >
                                {sanatanWallet ? <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(7) }}>{`\u20B9 ${sanatanWallet.toFixed(0)}`}</Text> : <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(7) }}>{`\u20B9 `}0</Text>}
                            </View> */}

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={async () => await this.selectAddress()}>
                        <View style={{ height: hp(10), justifyContent: 'space-around', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyle.secondaryThemeColor }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons name={'home-outline'} color="gray" size={wp(4)} />
                                <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(3) }}>Saved Address</Text>
                            </View>
                            {/* <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: wp(3), paddingLeft: wp(7) }}>{this.state.DefaultAddress}</Text> */}
                        </View>
                    </TouchableOpacity>
                    {/* <View style={{ height: hp(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyles.secondaryThemeColor }}>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons name={'color-palette-outline'} color="gray" size={wp(4)} />
                  <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(2) }}> Switch Theme</Text>
                </View>
    
                <Switch
                  trackColor={{ false: "gray", true: "#cc5500" }}
                  thumbColor={globalStyles.orangeThemeColor}
                  ios_backgroundColor="#3e3e3e"
                  value={selectedTheme == "dark" ? true : false}
                />
              </View> */}
                    <TouchableOpacity activeOpacity={.9}
                        onPress={() =>
                            Alert.alert(
                                'Log out',
                                'Do you want to logout?',
                                [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                        text: 'Confirm', onPress: () => {
                                            this._logout();

                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }
                    >
                        <View style={{ height: hp(10), flexDirection: 'row', alignItems: 'center', marginTop: wp(2), padding: wp(3), backgroundColor: globalStyle.secondaryThemeColor }}>
                            <Ionicons name={'power-outline'} color="gray" size={wp(4)} />
                            <Text style={{ color: 'gray', fontSize: wp(3), paddingLeft: wp(2) }}>Logout</Text>
                        </View>
                    </TouchableOpacity>



                </ScrollView>

            </SafeAreaView>

        );
    }

}
const styles = StyleSheet.create({

});



export default Profile