import React from 'react';
import {
    StyleSheet, View, Text, BackHandler, Switch,
    Image, TouchableHighlight, ToastAndroid, ImageBackground,
    ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView
} from 'react-native';

import UserApi from "../../Services/UserApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppConfig from "../constants/AppConfig";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DescriptionIcon from "react-native-vector-icons/MaterialIcons"; // description
import EmailIcon from "react-native-vector-icons/Fontisto"; // email
import PersonIcon from "react-native-vector-icons/Fontisto"; // person
import AddressIcon from "react-native-vector-icons/Entypo"; // location
import EditIcon from "react-native-vector-icons/FontAwesome"; // edit
import { TextInput } from 'react-native-gesture-handler';
import BankIcon from "react-native-vector-icons/FontAwesome"; // bank
import { globalStyle } from "../../styles/GlobalStyles";
// import ImagePicker from 'react-native-image-picker'


const BLUE = "#428AF8";
const LIGHT_GREY = "#D3D3D3";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
        this.state = {
            // profileData:this.props.navigation.getParam('profileResponse'),
            waitingLoaderVisible: false,
            isLoading: false,
            name: "",
            email: "",
            description: "",
            plainAddress: "",
            mode: "",
            accountHolderName: "",
            accountNumber: "",
            bankName: "",
            ifscCode: "",
            isFocussed: false,
            vendorStoreImage: "",
            selectedStoreImage: undefined,
            updatedStoreImageData: {}


        }
    }

    onBackButtonPressed() {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount = async () => {
        this.getProfile();
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }

    getProfile = () => {
        const { profileData } = this.state;
        if (profileData != null) {
            this.setState({
                name: profileData.name, email: profileData.email, description: profileData.description,
                plainAddress: profileData.plainAddress,
                accountHolderName: profileData.accountHolderName,
                accountNumber: profileData.accountNumber,
                bankName: profileData.bankName,
                ifscCode: profileData.ifscCode,
                vendorStoreImage: profileData.thumbnailImageUrl
            })
        }
    }

    navigateToback = () => {
        this.props.navigation.goBack();
    }

    updateProfile = async () => {
        const { name, email, description, plainAddress, accountHolderName, accountNumber, bankName, ifscCode, selectedStoreImage, updatedStoreImageData } = this.state;
        try {
            let data = {
                name: name ? name : null,
                email: email ? email : null,
                plainAddress: plainAddress ? plainAddress : null,
                description: description ? description : null,
                accountHolderName: accountHolderName ? accountHolderName : " ",
                accountNumber: accountNumber ? accountNumber : " ",
                bankName: bankName ? bankName : " ",
                ifscCode: ifscCode ? ifscCode : " ",

            }
            const formData = new FormData();
            for (var key in data) {
                formData.append(key, data[key]);
            }
            formData.append('thumbnailImage', updatedStoreImageData)
            let response = await UserApi.updateProfile(formData, this.props)
            if (response && response.error) {
                ToastAndroid.show(response.error, ToastAndroid.SHORT,);
            }
            this.props.navigation.navigate('Profile')

        } catch (error) {
            console.log(error)
        } finally { }
    }

    chooseProfilePhoto = async () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, async response => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                alert(response.customButton);
            } else {
                if (response.fileSize <= 300000) {
                    // let source = response;
                    var source = {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName,
                    };
                    this.setState({ selectedStoreImage: source.uri, updatedStoreImageData: source })
                } else {
                    ToastAndroid.show("The Uploaded image is too large , It must be less than 300 KB", ToastAndroid.SHORT);
                }
            }
        });
    };

    render() {
        const { vendorStoreImage, selectedStoreImage } = this.state;

        return (
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
                            <TextInput
                                underlineColorAndroid={LIGHT_GREY}
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer}>
                        <View style={styles.imageContainer} >
                            <EmailIcon name={"email"} color={globalStyle.thirdThemeColor} size={30} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ color: "gray", fontWeight: 'bold' }}>Email</Text>
                            <TextInput
                                underlineColorAndroid={LIGHT_GREY}
                                value={this.state.email}
                                onChangeText={(email) => this.setState({ email })}

                            />
                        </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer}>
                        <View style={styles.imageContainer} >
                            <DescriptionIcon name={"description"} color={globalStyle.thirdThemeColor} size={30} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ color: "gray", fontWeight: 'bold' }} >Description</Text>
                            <TextInput
                                underlineColorAndroid={LIGHT_GREY}
                                value={this.state.description}
                                onChangeText={(description) => this.setState({ description })}
                            />
                        </View>
                    </View>

                    <View activeOpacity={1} style={styles.outerContainer} onPress={() => this.props.navigation.navigate('')}>
                        <View style={styles.imageContainer} >
                            <AddressIcon name={"location"} color={globalStyle.thirdThemeColor} size={30} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ color: "gray", fontWeight: 'bold' }} >Address</Text>
                            <TextInput
                                underlineColorAndroid={LIGHT_GREY}
                                value={this.state.plainAddress}
                                onChangeText={(plainAddress) => this.setState({ plainAddress })}
                            />
                        </View>
                    </View>

                    <View style={{ backgroundColor: globalStyle.secondaryThemeColor, padding: 5, marginVertical: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <BankIcon name={"bank"} color={globalStyle.thirdThemeColor} size={30} />
                            <Text style={{ color: "gray", fontWeight: 'bold', marginLeft: 5 }} >Bank Account Details</Text>
                        </View>
                        <View style={{ justifyContent: "space-evenly", marginTop: 10 }}>
                            <View style={{}}>
                                <Text style={{color: "gray"}}>Account Holder Name :</Text>
                                <TextInput
                                    underlineColorAndroid={LIGHT_GREY}
                                    value={this.state.accountHolderName}
                                    onChangeText={(accountHolderName) => this.setState({ accountHolderName })}
                                />
                            </View>
                            <View style={{}}>
                                <Text style={{color: "gray"}}>Account Number :</Text>
                                <TextInput
                                    underlineColorAndroid={LIGHT_GREY}
                                    value={this.state.accountNumber}
                                    onChangeText={(accountNumber) => this.setState({ accountNumber })}
                                />
                            </View>
                            <View style={{}}>
                                <Text style={{color: "gray"}}>Bank Name :</Text>
                                <TextInput
                                    underlineColorAndroid={LIGHT_GREY}
                                    value={this.state.bankName}
                                    onChangeText={(bankName) => this.setState({ bankName })}
                                />
                            </View>
                            <View style={{}}>
                                <Text style={{color: "gray"}}>IFSC Code :</Text>
                                <TextInput
                                    underlineColorAndroid={LIGHT_GREY}
                                    value={this.state.ifscCode}
                                    onChangeText={(ifscCode) => this.setState({ ifscCode })}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: "center",margin:3 }}>

                        <TouchableOpacity onPress={() => this.updateProfile()} style={styles.loginButton} >
                        <Text style={styles.loginButtonText}>Save</Text>
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

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed)
    }
}
const styles = StyleSheet.create({

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
        fontSize: 10
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



export default EditProfile