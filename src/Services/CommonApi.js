import { SERVICE_URL } from "../component/constants/Service";
import AppConfig from "../component/constants/AppConfig";
import ApiCalling from "./Api";
import AsyncStorage from "@react-native-community/async-storage";
import { ToastAndroid } from "react-native";
class _commonApi {
    setFCMToken = async (fcmToken, props) => {
        let userId = await AsyncStorage.getItem('driverId')
        let body = {
            "id": userId,
            "fcmId": fcmToken
        }
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_DRIVER
            let ApiResponse = await ApiCalling.put(url, body, props)
            if (ApiResponse.code == 200) {
                return ApiResponse;
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
                return ApiResponse;
            }
        } catch (error) {
            console.log(error)
        }
    }
}


const CommonApi = new _commonApi();
export default CommonApi;