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


class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
    this.state = {
      isLoading: false,
      showPassword: true,
      press: false,
      newpassword: "",
      password: "",
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


  validate = async () => {
    let { newpassword, password } = this.state;
    if (!newpassword && !password) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
    } else {
      if (newpassword !== null && newpassword !== "") {
        if (password !== null && password !== "") {
          if (newpassword === password) {
            await this.changePassword(newpassword, password);
          } else {
            ToastAndroid.show('Please enter same password', ToastAndroid.SHORT);
          }
        }
        else {
          ToastAndroid.show('Please enter your confirm password', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Please enter your new password', ToastAndroid.SHORT);
      }
    }
  }

  changePassword = async (newpassword, password) => {
    let data = {
      Password: newpassword,
      ConfirmPassword: password
    }
    try {
      this.setState({ isLoading: true, waitingLoaderVisible: true })
      let resp = await UserApi.modifyPassword(data);
      if (resp.statusCode == 200) {
        this.setState({ waitingLoaderVisible: false, isLoading: false })
        ToastAndroid.show('Password Changed Successfully', ToastAndroid.SHORT);
        this.props.navigation.navigate('Login')
      } else {
        ToastAndroid.show('Please try again with different password', ToastAndroid.SHORT);
      }

      this.setState({ waitingLoaderVisible: false, isLoading: false })
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const { newpassword, password } = this.state
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
            <Text style={{ color: 'white', fontSize: 20 }}>Enter New Password</Text>
          </View>
          <View style={styles.input}>
            <View style={{ justifyContent: "center", height: wp("12%"), width: wp("10%"), marginHorizontal: 10 }} >
              <PasswordIcon name={"lock"} color={globalStyle.thirdThemeColor} size={25} />
            </View>
            <TextInput
              style={styles.textEntry}
              placeholder="Enter Here"
              underlineColorAndroid='transparent'
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              value={this.state.newpassword}
              onSubmitEditing={() => { this.password.focus(); }}
              blurOnSubmit={false}
              onChangeText={(newpassword) => this.setState({ newpassword })} />
          </View>
          <View style={{ height: wp("10%"), width: wp("90%"), justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Confirm New Password</Text>
          </View>
          <View style={styles.input}>
            <View style={{ justifyContent: "center", height: wp("12%"), width: wp("10%"), marginHorizontal: 10 }} >
              <PasswordIcon name={"lock"} color={globalStyle.thirdThemeColor} size={25} />
            </View>
            <TextInput
              style={styles.textEntry}
              returnKeyType="go"
              placeholder='Enter Here'
              secureTextEntry={true}
              value={this.state.password}
              ref={(input) => { this.password = input; }}
              onChangeText={(password) => this.setState({ password })} />
          </View>
          <TouchableHighlight style={styles.Button} onPress={() => this.validate()} >
            <Text style={styles.ButtonText}>Modify Password</Text>
          </TouchableHighlight>
        </View>
        {/* <View style={{flex:0.35,justifyContent:'center',alignItems:'center'}}>
          <View style={[styles.input, { flexDirection: "row" }]}>
            <View style={{ justifyContent: "center", flex: 1  }}>
              <PasswordIcon name={"lock"} color={globalStyle.thirdThemeColor} size={25} />
            </View>
            <TextInput
              style={styles.textEntry}
              placeholder="Enter New Password"
              underlineColorAndroid='transparent'
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              value={this.state.newpassword}
              onSubmitEditing={() => { this.password.focus(); }}
              blurOnSubmit={false}
              onChangeText={(newpassword) => this.setState({ newpassword })} />
          </View>

          <View style={[styles.input, { flexDirection: "row" }]}>
            <View style={{ justifyContent: "center", flex: 1 }} >
              <PasswordIcon name={"lock"} color={globalStyle.thirdThemeColor} size={25} />
            </View>
            <View style={{ flex: 9, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                style={styles.textEntry}
                returnKeyType="go"
                placeholder='Confirm New Password'
                secureTextEntry={true}
                value={this.state.password}
                ref={(input) => { this.password = input; }}
                onChangeText={(password) => this.setState({ password })} />
            </View>
          </View>
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.validate()} >
            <Text style={styles.buttonText}>Modify Password</Text>
          </TouchableHighlight>
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
    backgroundColor: globalStyle.primaryThemeColor
  },
  logoStyle: {
    width: wp('100%'),
    height: wp('100%'),
  },
  input: {
    height: wp("12%"),
    width: wp("90%"),
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    justifyContent: "space-around",
    backgroundColor: globalStyle.secondaryThemeColor,
    flexDirection: 'row'
  },
  Button: {
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
    width: wp("80%"),
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.8,
    justifyContent: "space-around",
    backgroundColor: globalStyle.secondaryThemeColor
  }
});



export default ForgotPassword