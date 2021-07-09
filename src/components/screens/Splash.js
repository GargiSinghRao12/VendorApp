import React from 'react';

import { StyleSheet, View, Text, StatusBar, Image, ImageBackground, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from "react-native-video";
import { globalStyle } from '../../styles/GlobalStyles';
import Background from '../../assets/images/screen_1.mp4'
export default class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor ={globalStyle.primaryThemeColor}/>
                <Video
                    source={Background}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"cover"}
                    rate={1.0}
                    ignoreSilentSwitch={"obey"}
                />
            </SafeAreaView>
        );
    }
    async componentDidMount() {
        let isLoggedIn = await AsyncStorage.getItem('token')
        setTimeout(() => {
            if (isLoggedIn) {
                console.log("Token = ", isLoggedIn)
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Login');
            }
        }, 3500);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        width: wp('60%'),
        height: wp('60%'),
    },
    backgroundVideo: {
        height:'100%',
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
        }
});
