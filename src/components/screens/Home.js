import React from 'react';
import {
  StyleSheet, View, TextInput, Text, BackHandler, Switch,
  Image, TouchableHighlight, ToastAndroid, ImageBackground, ActivityIndicator, SafeAreaView
} from 'react-native';
import { globalStyle } from "../../styles/GlobalStyles"
class Home extends React.Component {
    constructor(props) {
      super(props);
      this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
      this.state = {
        isLoading: false,
        showPassword: true,
        press: false,
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
  
    validate = () => {
      let reg = /^[0]?[6789]\d{9}$/;
      let { phone } = this.state;
      if (!reg.test(phone) == true) {
        ToastAndroid.show('Please Enter your mobile number with numeric only!', ToastAndroid.SHORT);
      }
      else {
        this.getotp(phone)
      }
    }
  
    getotp = async (phone) => {
      // console.log("phone number",phone);
      try {
        this.setState({ isLoading: true, waitingLoaderVisible: true })
        let resp = await UserApi.getOtpEmail(phone);
        if (resp.statusCode == 200) {
          this.setState({ waitingLoaderVisible: false, isLoading: false })
          ToastAndroid.show('OTP has been sent to your registered Mobile Number', ToastAndroid.SHORT);
          this.props.navigation.navigate('OtpVerify', phone)
        }
        this.setState({ waitingLoaderVisible: false, isLoading: false })
      } catch (error) {
        console.log(error);
      }
    }
  
  
    render() {
      return (
<SafeAreaView style={{flex:1,backgroundColor:globalStyle.primaryThemeColor}}>

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
   
  
  });
  
  
  
  export default Home