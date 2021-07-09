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
import AppConfig from "../constants/AppConfig";

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

const BLUE = "#428AF8";
const LIGHT_GREY = "#D3D3D3";

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
            },
            vendorStoreImage: "",
            selectedStoreImage: undefined,
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
        const { vendorStoreImage, selectedStoreImage } = this.state;
        return (



            // <SafeAreaView style={{ flex: 1, flexDirection: "column", backgroundColor: "black" }}>

            //     {/* <Header
            //         //           ViewComponent={LinearGradient} // Don't forget this!
            //         //   linearGradientProps={{
            //         //     colors: ['black', 'grey'],
            //         //     start: { x: 0, y: 0.5 },
            //         //     end: { x: 1.5, y: 0.5 },
            //         //   }}
            //         statusBarProps={{ barStyle: 'light-content', hidden: false, backgroundColor: "black" }}
            //         barStyle="light-content" // or directly
            //         leftComponent={{ text: 'PROFILE', style: { color: '#fff', fontSize: 20, fontWeight: "bold", width: 220 } }}
            //         rightComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile', { profileResponse })} >
            //             <EditIcon name={"edit"} color={'#FF9933'} size={25} />
            //         </TouchableOpacity>}
            //         containerStyle={{
            //             backgroundColor: 'black',
            //             justifyContent: 'space-around',
            //             borderBottomColor: "black"
            //         }}
            //     /> */}

            //     <View style={{ backgroundColor: "black", flex: 0.15 }}>

            //         {/* <Image style={styles.avatar} source={profileResponse && profileResponse.thumbnailImageUrl != null ? { uri: AppConfig.BASE_URL + profileResponse.thumbnailImageUrl } : require('../../assets/images/logo.jpg')} /> */}
            //         <Text>Hello Allllllllll</Text>
            //         {/* source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'} */}
            //     </View>
            //     <View style={{ flex: 0.85 }}>
            //         <ScrollView style={{ marginTop: 70 }}>
            //             <View activeOpacity={1} style={styles.outerContainer}>

            //                 <View style={styles.textContainer}>
            //                     <Text style={{
            //                         color: "grey",
            //                         textAlignVertical: "center",
            //                         textAlign: "right",
            //                         fontWeight: 'bold',
            //                         margin: 5, fontSize: 15
            //                     }}>Update Store Location</Text>
            //                     <TouchableOpacity style={{
            //                         color: "black",
            //                         justifyContent: 'nav',
            //                         alignItems: 'center',
            //                         textAlignVertical: "center",
            //                         textAlign: "center",
            //                         fontWeight: 'bold'
            //                     }} onPress={async () => await this.updateLocation()}
            //                         style={{ alignItems: 'flex-end', margin: 5 }}>
            //                         <LocationIcon name={"location"} color={'#FF9933'} size={30} />
            //                     </TouchableOpacity>
            //                 </View>
            //             </View>

            //             <View activeOpacity={1} style={styles.outerContainer}>
            //                 <View style={styles.imageContainer}>
            //                     <ShopIcon name={"shop"} color={'#FF9933'} size={30} />
            //                 </View>
            //                 <View style={styles.textContainer}>
            //                     <View style={styles.textContainer}>
            //                         <Text style={{ color: "black", fontWeight: 'bold' }}>Shop
            //                             Name</Text>
            //                         {/* {(profileResponse && profileResponse.name) ? <Text
            //                             style={{ color: "grey" }}>{profileResponse.name}</Text> : null} */}

            //                     </View>
            //                 </View>
            //             </View>

            //             <View activeOpacity={1} style={styles.outerContainer}>
            //                 <View style={styles.imageContainer}>
            //                     <PhoneIcon name={"phone-call"} color={'#FF9933'} size={30} />
            //                 </View>
            //                 <View style={styles.textContainer}>
            //                     <Text style={{ color: "black", fontWeight: 'bold' }}>Shop Owner
            //                         Name</Text>
            //                     {/* {(userProfileResponse && userProfileResponse.fullName) ? <Text
            //                         style={{ color: "grey" }}>{userProfileResponse.fullName}</Text> : null} */}

            //                 </View>
            //             </View>

            //             <View activeOpacity={1} style={styles.outerContainer}>
            //                 <View style={styles.imageContainer}>
            //                     <PersonIcon name={"person"} color={'#FF9933'} size={30} />
            //                 </View>
            //                 <View style={styles.textContainer}>
            //                     <Text style={{ color: "black", fontWeight: 'bold' }}>Owner
            //                         Number</Text>
            //                     {/* {(userProfileResponse && userProfileResponse.phoneNumber) ? <Text
            //                         style={{ color: "grey" }}>{userProfileResponse.phoneNumber}</Text> : null} */}
            //                 </View>
            //             </View>

            //             <View activeOpacity={1} style={styles.outerContainer}>
            //                 <View style={styles.imageContainer}>
            //                     <EmailIcon name={"email"} color={'#FF9933'} size={30} />
            //                 </View>
            //                 <View style={styles.textContainer}>
            //                     <Text style={{ color: "black", fontWeight: 'bold' }}>Email</Text>
            //                     {/* {(profileResponse && profileResponse.email) ? <Text
            //                         style={{ color: "grey" }}>{profileResponse.email}</Text> : null} */}
            //                 </View>
            //             </View>

            //             <View activeOpacity={1} style={styles.outerContainer}>
            //                 <View style={styles.imageContainer}>
            //                     <DescriptionIcon name={"description"} color={'#FF9933'} size={30} />
            //                 </View>
            //                 <View style={styles.textContainer}>
            //                     <Text style={{
            //                         color: "black",
            //                         fontWeight: 'bold'
            //                     }}>Description</Text>
            //                     {/* {(profileResponse && profileResponse.description) ? <Text
            //                         style={{ color: "grey" }}>{profileResponse.description}</Text> : null} */}
            //                 </View>
            //             </View>

            //             <View activeOpacity={1} style={styles.outerContainer}>
            //                 <View style={styles.imageContainer}>
            //                     <AddressIcon name={"location"} color={'#FF9933'} size={30} />
            //                 </View>
            //                 <View style={styles.textContainer}>
            //                     <Text
            //                         style={{ color: "black", fontWeight: 'bold' }}>Address</Text>
            //                     {/* {(profileResponse && profileResponse.plainAddress) ? <Text
            //                         style={{ color: "grey" }}>{profileResponse.plainAddress}</Text> : null} */}
            //                 </View>
            //             </View>

            //             <View style={{ backgroundColor: "white", height: wp('60'), padding: 5, marginVertical: 5, margin: 10, borderRadius: 15 }}>
            //                 <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
            //                     <BankIcon name={"bank"} color={'#FF9933'} size={30} />
            //                     <Text
            //                         style={{ color: "black", fontWeight: 'bold', marginLeft: 10 }}>Bank
            //                         Account Details</Text>
            //                 </View>
            //                 <View style={{ flex: 1, justifyContent: "space-evenly", margin: 10 }}>

            //                     <View style={{ flexDirection: "row" }}>
            //                         <Text style={styles.bankDetailsStyle}>Account Holder Name : </Text>
            //                         {/* {(profileResponse && profileResponse.accountHolderName != " ") ? <Text
            //                             style={{ color: "grey" }}>{profileResponse.accountHolderName}</Text> :
            //                             <Text>N/A</Text>} */}
            //                     </View>
            //                     <View style={{ flexDirection: "row" }}>
            //                         <Text style={styles.bankDetailsStyle}>Account Number : </Text>
            //                         {/* {(profileResponse && profileResponse.accountNumber != " ") ? <Text
            //                             style={{ color: "grey" }}>{profileResponse.accountNumber}</Text> :
            //                             <Text>N/A</Text>} */}
            //                     </View>
            //                     <View style={{ flexDirection: "row" }}>
            //                         <Text style={styles.bankDetailsStyle}>Bank Name : </Text>
            //                         {/* {(profileResponse && profileResponse.bankName != " ") ? <Text
            //                             style={{ color: "grey" }}>{profileResponse.bankName}</Text> :
            //                             <Text>N/A</Text>} */}
            //                     </View>
            //                     <View style={{ flexDirection: "row" }}>
            //                         <Text style={styles.bankDetailsStyle}>IFSC Code : </Text>
            //                         {/* {(profileResponse && profileResponse.ifscCode != " ") ? <Text
            //                             style={{ color: "grey" }}>{profileResponse.ifscCode}</Text> :
            //                             <Text>N/A</Text>} */}
            //                     </View>
            //                 </View>
            //             </View>

            //             <View activeOpacity={1} style={styles.outerContainer}>
            //                 <View style={styles.imageContainer}>
            //                     <HelpIcon name={"help-with-circle"} color={'#FF9933'} size={30} />
            //                 </View>
            //                 <View style={styles.textContainer}>
            //                     <Text style={{ color: "black", fontWeight: 'bold' }}>Vendor
            //                         Help</Text>
            //                     <Text style={{ color: "black" }}>+91-9672359413</Text>
            //                 </View>
            //             </View>
            //             <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", alignSelf: "center", height: 35, width: 280, margin: 20, backgroundColor: "orange", justifyContent: "center", borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, }} onPress={() => this.logout()}>
            //                 <Logout name={"logout"} color={'white'} size={20} />
            //                 <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 18, marginLeft: 8 }}>Logout</Text>

            //             </TouchableOpacity>
            //         </ScrollView>
            //     </View>
            //     {/* {
            //         this.state.waitingLoaderVisible &&
            //         <WaitingLoader visible={this.state.waitingLoaderVisible} isLoading={this.state.isLoading} />
            //     } */}

            // </SafeAreaView>



            <SafeAreaView style={{ flex: 1, backgroundColor: globalStyle.primaryThemeColor }}>
                <ScrollView>

                    
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.chooseProfilePhoto()} style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <Image source={selectedStoreImage != undefined ? { uri: selectedStoreImage } : { uri: AppConfig.BASE_URL + vendorStoreImage }} style={{ width: wp('30'), height: wp('30'), borderRadius: 50, }} />
                            <View style={{ width: wp('11%'), height: wp('11%'), backgroundColor: globalStyle.thirdThemeColor, borderRadius: 50, justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 1 }}>
                                <EditIcon name={'edit'} size={20} color={'gray'} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer}>
                        <View style={styles.imageContainer} >
                            <PersonIcon name={"person"} color={globalStyle.thirdThemeColor} size={30} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ color: "gray", fontWeight: 'bold' }} >Shop Name</Text>
                            {/* {(profileResponse && profileResponse.name) ? <Text */}
                                        {/* style={{ color: "grey" }}>{profileResponse.name}</Text> : null */}
                                        <Text style={{color:"gray"}}>Gargi Singh Rao</Text>
                        </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer}>
                    <View style={styles.imageContainer}>
                                <PhoneIcon name={"phone-call"} color={globalStyle.thirdThemeColor} size={30} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{ color: "gray", fontWeight: 'bold' }}>Shop Owner
                                    Name</Text>
                                {/* {(userProfileResponse && userProfileResponse.fullName) ? <Text
                                    style={{ color: "grey" }}>{userProfileResponse.fullName}</Text> : null} */}

                            </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer}>
                    <View style={styles.imageContainer}>
                                <PersonIcon name={"person"} color={globalStyle.thirdThemeColor} size={30} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{ color: "gray", fontWeight: 'bold' }}>Owner
                                    Number</Text>
                                {/* {(userProfileResponse && userProfileResponse.phoneNumber) ? <Text
                                    style={{ color: "grey" }}>{userProfileResponse.phoneNumber}</Text> : null} */}
                            </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer} onPress={() => this.props.navigation.navigate('')}>
                    <View style={styles.imageContainer}>
                                <EmailIcon name={"email"} color={globalStyle.thirdThemeColor} size={30} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{ color: "gray", fontWeight: 'bold' }}>Email</Text>
                                {/* {(profileResponse && profileResponse.email) ? <Text
                                    style={{ color: "grey" }}>{profileResponse.email}</Text> : null} */}
                            </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer} onPress={() => this.props.navigation.navigate('')}>
                    <View style={styles.imageContainer}>
                                <DescriptionIcon name={"description"} color={globalStyle.thirdThemeColor} size={30} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{
                                    color: "gray",
                                    fontWeight: 'bold'
                                }}>Description</Text>
                                {/* {(profileResponse && profileResponse.description) ? <Text
                                    style={{ color: "grey" }}>{profileResponse.description}</Text> : null} */}
                            </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer} onPress={() => this.props.navigation.navigate('')}>
                    <View style={styles.imageContainer}>
                                <AddressIcon name={"location"} color={globalStyle.thirdThemeColor} size={30} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text
                                    style={{ color: "gray", fontWeight: 'bold' }}>Address</Text>
                                {/* {(profileResponse && profileResponse.plainAddress) ? <Text
                                    style={{ color: "grey" }}>{profileResponse.plainAddress}</Text> : null} */}
                            </View>
                    </View>

                    <View style={{ backgroundColor: globalStyle.secondaryThemeColor, padding: 5, marginVertical: 5, height: wp('60'),padding: 5, }}>
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <BankIcon name={"bank"} color={globalStyle.thirdThemeColor} size={30} />
                            <Text style={{ color: "gray", fontWeight: 'bold', marginLeft: 5 }} >Bank Account Details</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "space-evenly", margin: 10 }}>

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.bankDetailsStyle}>Account Holder Name : </Text>
                                    {/* {(profileResponse && profileResponse.accountHolderName != " ") ? <Text
                                        style={{ color: "grey" }}>{profileResponse.accountHolderName}</Text> :
                                        <Text>N/A</Text>} */}
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.bankDetailsStyle}>Account Number : </Text>
                                    {/* {(profileResponse && profileResponse.accountNumber != " ") ? <Text
                                        style={{ color: "grey" }}>{profileResponse.accountNumber}</Text> :
                                        <Text>N/A</Text>} */}
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.bankDetailsStyle}>Bank Name : </Text>
                                    {/* {(profileResponse && profileResponse.bankName != " ") ? <Text
                                        style={{ color: "grey" }}>{profileResponse.bankName}</Text> :
                                        <Text>N/A</Text>} */}
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.bankDetailsStyle}>IFSC Code : </Text>
                                    {/* {(profileResponse && profileResponse.ifscCode != " ") ? <Text
                                        style={{ color: "grey" }}>{profileResponse.ifscCode}</Text> :
                                        <Text>N/A</Text>} */}
                                </View>
                            </View>
                            </View>

                            <View activeOpacity={1} style={styles.outerContainer}>
                            <View style={styles.imageContainer}>
                                <HelpIcon name={"help-with-circle"} color={globalStyle.thirdThemeColor} size={30} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{ color: "gray", fontWeight: 'bold' }}>Vendor
                                    Help</Text>
                                <Text style={{ color: "gray" }}>+91-9672359413</Text>
                            </View>
                        </View>

                    <View style={{ alignItems: "center",margin:3 }}>

                        <TouchableOpacity onPress={() => this.logout()} style={styles.loginButton} >
                        <Text style={styles.loginButtonText}>Logout</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
                {/* </KeyboardAvoidingView> */}


                {/* {
                this.state.waitingLoaderVisible &&
                <WaitingLoader visible={this.state.waitingLoaderVisible} isLoading={this.state.isLoading} />
            } */}
            </SafeAreaView>

        );
    }

}
const styles = StyleSheet.create({

    // avatar: {
    //     width: 130,
    //     height: 130,
    //     borderRadius: 63,
    //     borderWidth: 4,
    //     borderColor: "white",
    //     marginBottom: 10,
    //     alignSelf: 'center',
    //     position: 'absolute',
    //     marginTop: 10
    // },
    // container: {
    //     flex: 1,
    //     backgroundColor: "#F7F7F7"
    // },

    // outerContainer: {
    //     flexDirection: 'row',
    //     borderRadius: 15,
    //     backgroundColor: "white",
    //     paddingVertical: 10,
    //     marginVertical: 5, margin: 10

    // },

    // item: {
    //     flexDirection: 'row',
    //     borderRadius: 2,
    //     borderBottomWidth: 0.8,
    // },

    // member: {
    //     flexDirection: 'row',
    //     borderRadius: 2,
    // },

    // imageContainer: {
    //     width: wp('10'),
    //     flexDirection: 'row',
    //     justifyContent: "center",
    //     alignItems: 'center',
    //     marginLeft: 10
    // },
    // logoStyle: {
    //     width: wp('10%'),
    //     height: wp('10%'),
    // },
    // textContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     marginLeft: 5

    // },
    // bankDetailsStyle: {
    //     color: "black"
    // },


    container: {
        flex: 1,
        backgroundColor: "#F7F7F7"
    },

    outerContainer: {
        flexDirection: 'row',
        borderRadius: 2,
        backgroundColor: globalStyle.secondaryThemeColor,
        paddingVertical: 10,
        marginVertical: 5

    },

    item: {
        flexDirection: 'row',
        borderRadius: 2,
        borderBottomWidth: 0.8,
    },

    member: {
        flexDirection: 'row',
        borderRadius: 2,
    },

    imageContainer: {
        width: wp('10'),
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    logoStyle: {
        width: wp('10%'),
        height: wp('10%'),
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5

    },
    bankDetailsStyle: {
        // fontSize: 10,
        color:"gray"
    },
    loginButton: {
        width: wp('90%'),
        backgroundColor: globalStyle.thirdThemeColor,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: globalStyle.primaryThemeColor,
        // fontFamily: 'SourceSansProBold',
        alignSelf: 'center',
        fontSize: 18,
    },
});



export default Profile