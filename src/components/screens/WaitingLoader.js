import React from 'react';
import { BackHandler, StyleSheet, View, Dimensions, ActivityIndicator, TouchableOpacity, TouchableHighlight, Image, Modal, Text, Alert, Picker, SafeAreaView } from 'react-native';
import RupeeIcon from 'react-native-vector-icons/FontAwesome'
import ErrorIcon from 'react-native-vector-icons/MaterialIcons'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window')
import { globalStyle } from '../styles/GlobalStyles';
import { TextInput } from 'react-native-gesture-handler';


export default class WaitingLoader extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { visible, isLoading } = this.props;
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
            >
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <View style={{ width: wp('70'), height: wp('25'), backgroundColor: 'transparent', justifyContent: "center", borderRadius: 3 }}>
                    
                        {isLoading &&                        
                            <ActivityIndicator style={{ alignSelf: 'center' }} animating={isLoading} size="large"
                                color="white" />
                        }

                    </View>
                </View>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: "black",
        fontWeight: "bold"
    },
});
