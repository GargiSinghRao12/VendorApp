import React from 'react';
import {
  StyleSheet, View, TextInput, Text, BackHandler, Switch,
  Image, TouchableHighlight, ToastAndroid, ImageBackground, ActivityIndicator, SafeAreaView
} from 'react-native';
import UserApi from '../../Services/UserApi';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CommonApi from '../../Services/CommonApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { connect } from 'react-redux';
// import { login } from '../../actions/authaction'
import EmailIcon from "react-native-vector-icons/MaterialIcons"; // email
import PasswordIcon from "react-native-vector-icons/Entypo"; // locked
import { globalStyle } from "../../styles/GlobalStyles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import WaitingLoader from '../screens/WaitingLoader';


class OtpVerify extends React.Component {
  constructor(props) {
    super(props);
    this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
    this.state = {
      isLoading: false,
      showPassword: true,
      press: false,
      otp: "",
      emailid: null
    }

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  navigateToback = () => {
    this.props.navigation.goBack();
  }

  onBackButtonPressed() {
    this.props.navigation.goBack();
    return true;
  }

  varifyotp = async (otp, id) => {
    try {
      this.setState({ isLoading: true, waitingLoaderVisible: true })
      let resp = await UserApi.varifyOtpMail(otp, id);
      if (resp.statusCode == 200) {

        this.setState({ waitingLoaderVisible: false, isLoading: false })
        ToastAndroid.show('OTP Varification Successfully', ToastAndroid.SHORT);
        this.props.navigation.navigate('ForgotPassword', resp.token)
      }
      this.setState({ waitingLoaderVisible: false, isLoading: false })
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const id = this.props.navigation.state.params;
    const { otp } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: globalStyle.thirdThemeColor, fontSize: 40, fontWeight: '900' }}>FOOD<Text style={{ color: 'white', fontSize: 40, fontWeight: '900' }}>VENDOR</Text></Text>
        </View>
        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.logoStyle} source={require('../../assets/images/logo2.png')} />
        </View>
        <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: wp("10%"), width: wp("90%"), justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Enter OTP</Text>
          </View>
          <TextInput
            style={styles.textEntry}
            placeholder="Type your OTP"
            placeholderTextColor='grey'
            keyboardType="numeric"
            underlineColorAndroid='transparent'
            autoCompleteType="off"
            autoCorrect={false}
            value={this.state.otp}
            onChangeText={(otp) => this.setState({ otp })} />
          <TouchableHighlight disabled={this.state.isLoading} style={styles.button} onPress={() => this.varifyotp(otp, id)} >
            <Text style={styles.ButtonText}>Verify OTP</Text>
          </TouchableHighlight>
        </View>
        {
          this.state.waitingLoaderVisible &&
          <WaitingLoader visible={this.state.waitingLoaderVisible} isLoading={this.state.isLoading} />
        }
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyle.primaryThemeColor
  },
  logoContainer: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: wp('100%'),
    height: wp('100%'),
  },
  input: {
    height: wp("12%"),
    width: wp("80%"),
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    justifyContent: "space-around"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: wp('80%'),
    height: wp('10%'),
    backgroundColor: '#FF4500',
    paddingVertical: 20,
    elevation: 1,
    borderRadius: 5
  },
  button: {
    height: wp("12%"),
    width: wp("90%"),
    backgroundColor: globalStyle.thirdThemeColor,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center'
  },
  ButtonText: {
    color: globalStyle.primaryThemeColor,
    // fontFamily: 'SourceSansProBold',
    alignSelf: 'center',
    fontSize: 18,
  },
  textEntry: {
    height: wp("12%"),
    width: wp("90%"),
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    justifyContent: "space-around",
    backgroundColor: globalStyle.secondaryThemeColor
  }
  // input: {
  //   height: wp("12%"),
  //   width: wp("80%"),
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  //   borderBottomWidth: 0.8,
  //   justifyContent: "space-around"
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 20,
  //   width: wp('80%'),
  //   height: wp('10%'),
  //   backgroundColor: '#FF4500',
  //   paddingVertical: 20,
  //   elevation: 1,
  //   borderRadius: 5
  // },
  // buttonText: {
  //   color: "#FFFFFF",
  //   textAlign: 'center',
  //   fontSize: 17
  // },
  // textEntry: {
  //   flex: 1,
  // }

});

export default OtpVerify