import React from 'react';
import {
  StyleSheet, View, TextInput, Text, BackHandler, Switch,
  Image, TouchableHighlight, ToastAndroid, ImageBackground,
  ActivityIndicator, SafeAreaView, TouchableOpacity
} from 'react-native';
import UserApi from '../../Services/UserApi';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CommonApi from '../../Services/CommonApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { connect } from 'react-redux';
// import { login } from '../../actions/authaction'
import EmailIcon from "react-native-vector-icons/MaterialIcons"; // email
import PasswordIcon from "react-native-vector-icons/Entypo"; // locked

import { globalStyle } from "../../styles/GlobalStyles"

import WaitingLoader from '../screens/WaitingLoader';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      isLoading: false,
      showPassword: true,
      press: false,
    }

  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  validate = () => {
    let reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let { email, password } = this.state;
    if (!email && !password) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    }
    else {
      if (reg.test(email) == true) {
        if (password != null) {
          this.signIn(email, password)
        }
        else {
          ToastAndroid.show('Enter your password', ToastAndroid.SHORT);
        }
      }
      else {
        ToastAndroid.show('Email is not correct', ToastAndroid.SHORT);
      }
    }
  }

  signIn = async (email, password) => {

    let data = {
      "Username": email,
      "Password": password
    }

    try {
      console.log('Hi Shubham',data)
      this.setState({ waitingLoaderVisible: true, isLoading: true })
      let resp = await UserApi.authUserSignin(data, this.props);
      if (resp && !resp.error) {
        this.setState({ waitingLoaderVisible: false, isLoading: false })
        let userData = {
          name: resp.user.userName,
          fullname: resp.user.fullName,
          phoneNumber: resp.user.phoneNumber
        }
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(userData))
        this.props.navigation.navigate('Home');
      }
      else if (resp.error) {
        this.setState({ waitingLoaderVisible: false, isLoading: false })
        ToastAndroid.show(resp.error, ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ waitingLoaderVisible: false, isLoading: false })

    }
  }

  setFCMToken() {
    firebase.messaging().getToken()
      .then(async (fcmToken) => {
        if (fcmToken) {
          await CommonApi.setFCMToken(fcmToken, this.props)
        } else {
        }
      });
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  onBackButtonPressed() {
    BackHandler.exitApp();
    return true;
  }

  forgotPassword = () => {
    this.props.navigation.navigate('ForgotEmail');
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:globalStyle.thirdThemeColor,fontSize:40,fontWeight:'900'}}>FOOD<Text style={{color:'white',fontSize:40,fontWeight:'900'}}>VENDOR</Text></Text>
      <Image style={styles.logoStyle} source={require('../../assets/images/logo1.png')} />
      </View>
      {/* <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
      <Image style={styles.logoStyle} source={require('../../assets/images/logo1.png')} />
      </View> */}
      <View style={{flex:0.5,justifyContent:'center',alignItems:'center',backgroundColor:globalStyle.primaryThemeColor}}>
      <View style={{height:wp("10%"),width: wp("90%"),justifyContent:'center'}}>
      <Text style={{color:'white',fontSize:20}}>Username</Text>
      </View>
      <View style={[styles.input, { flexDirection: "row" }]}>
            <View style={{ justifyContent: "center" }}>
              <EmailIcon name={"email"} color={globalStyle.thirdThemeColor} size={25} />
            </View>

            <TextInput
              style={styles.textEntry}
              placeholder="Email"
              placeholderTextColor="grey"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCompleteType="off"
              autoCorrect={false}
              // placeholderTextColor='black'
              onSubmitEditing={() => { this.password.focus(); }}
              blurOnSubmit={false}
              onChangeText={(email) => this.setState({ email })} />
          </View>
          <View style={{height:wp("10%"),width: wp("90%"),justifyContent:'center'}}>
      <Text style={{color:'white',fontSize:20}}>Password</Text>
      </View>
          <View style={[styles.input, { flexDirection: "row" }]}>
            <View style={{ justifyContent: "center", flex: 1 }} >
              <PasswordIcon name={"lock"} color={globalStyle.thirdThemeColor} size={25} />
            </View>
            <View style={{ flex: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                style={styles.textEntry}
                placeholderTextColor="grey"
                returnKeyType="go"
                placeholder='Password'
                // placeholderTextColor='black'
                secureTextEntry={this.state.showPassword}
                ref={(input) => { this.password = input; }}
                onChangeText={(password) => this.setState({ password })} />
              <View style={{ justifyContent: "center" }}>
                <Switch
                trackColor={{ false: "grey", true: globalStyle.thirdThemeColor }}
                thumbColor={globalStyle.thirdThemeColor}
                  onValueChange={this.toggleSwitch}
                  value={!this.state.showPassword}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.fpText} onPress={this.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} disabled={this.state.isLoading} onPress={() => this.validate()}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.PText}>
            Powered by
            <Text style={{ color: globalStyle.thirdThemeColor, fontFamily: 'SourceSansProBold' }}> Fluminus Softwares</Text>
          </Text>
      </View>
        {/* <View style={styles.logoContainer}>
          <Image style={styles.logoStyle} source={require('../../assets/images/logo.jpg')} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={[styles.input, { flexDirection: "row" }]}>
            <View style={{ justifyContent: "center" }}>
              <EmailIcon name={"email"} color={globalStyle.primaryThemeColor} size={25} />
            </View>

            <TextInput
              style={styles.textEntry}
              placeholder="Email"
              placeholderTextColor="grey"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              autoCompleteType="off"
              autoCorrect={false}
              // placeholderTextColor='black'
              onSubmitEditing={() => { this.password.focus(); }}
              blurOnSubmit={false}
              onChangeText={(email) => this.setState({ email })} />
          </View>

          <View style={[styles.input, { flexDirection: "row" }]}>
            <View style={{ justifyContent: "center", flex: 1 }} >
              <PasswordIcon name={"lock"} color={globalStyle.primaryThemeColor} size={25} />
            </View>
            <View style={{ flex: 9, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                style={styles.textEntry}
                placeholderTextColor="grey"
                returnKeyType="go"
                placeholder='Password'
                // placeholderTextColor='black'
                secureTextEntry={this.state.showPassword}
                ref={(input) => { this.password = input; }}
                onChangeText={(password) => this.setState({ password })} />
              <View style={{ justifyContent: "center" }}>
                <Switch
                  onValueChange={this.toggleSwitch}
                  value={!this.state.showPassword}
                />
              </View>
            </View>
          </View>
          <TouchableHighlight onPress={this.forgotPassword} style={{ alignSelf: "flex-end" }}>
                <Text>Forgot Password?</Text>
              </TouchableHighlight>
          <TouchableHighlight disabled={this.state.isLoading} style={styles.buttonContainer} onPress={() => this.validate()} >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} style={styles.signupButton}>
            <Text style={{ color: globalStyle.thirdThemeColor }}>Create Account</Text>
          </TouchableOpacity>
        </View> */}
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
    backgroundColor:globalStyle.primaryThemeColor
  },

  // logoContainer: {
  //   flex: .5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  logoStyle: {
    width: wp('50%'),
    height: wp('50%'),
    marginTop:20
  },

  input: {
    height: wp("12%"),
    width: wp("90%"),
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    justifyContent: "space-around",
    backgroundColor:globalStyle.secondaryThemeColor
  },

  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 20,
  //   marginTop: 30,
  //   width: wp('80%'),
  //   height: wp('10%'),
  //   backgroundColor: '#FF4500',
  //   paddingVertical: 20,
  //   elevation: 1,
  //   borderRadius: 5
  // },

  // buttonText: {
  //   color: "white",
  //   textAlign: 'center',
  //   fontSize: 17
  // },

  // signupButton: {
  //   backgroundColor: "#758AA2",
  // },

  // signUpText: {
  //   textAlign: 'center',
  //   color: '#739d09',
  //   fontWeight: "bold"
  // },

  textEntry: {
    flex: 1,
    color:'grey'
    
  },
  // signupButton: {
  //   // backgroundColor: "#758AA2",
  //   alignSelf: "center",
  // },
  loginButton: {
    width:wp('90%'),
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
  PText: {
    color:'white',
    alignSelf: 'center',
    marginTop: 12,
    // fontFamily: 'SourceSansProRegular',
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    // fontFamily: 'SourceSansProBold',
    fontSize: 16,
    color:'grey',
  },
});



export default Login