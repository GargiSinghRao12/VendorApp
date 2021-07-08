import AsyncStorage from "@react-native-async-storage/async-storage";
import { SigningOut } from "../components/common/Helper";

class _ApiCalling {
    authpost = async (url, body, props) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'appversion': "0.0.1"
            },
            body: JSON.stringify(body)
        });
        // console.log("response!!!!!!!!", response)
        let rawResponse = await response.json();
        // console.log("response@@@@@@@2", rawResponse)
        if (rawResponse) {
            return rawResponse
        } else if (rawResponse.statusCode == 403) {
            SigningOut(props);
        } else {
            return rawResponse
        }
    }

    post = async (url, body) => {
        const value = await AsyncStorage.getItem('token')
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + value,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'appversion': "0.0.1"
            },
            body: JSON.stringify(body)
        });
        // console.log("post respiosen", response)
        let rawResponse = await response.json();
        // console.log("inside api.js", rawResponse)
        if (rawResponse) {
            return rawResponse
        } else if (rawResponse.statusCode == 403) {
            SigningOut(props);
        } else {
            return rawResponse
        }
    }


    formPost = async (url, body, props) => {
        const value = await AsyncStorage.getItem('registertoken')
        // console.log("new token for become vendor ", value, body);
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + value,
                    'Content-Type': 'multipart/form-data',

                },
                body: body
            });
            // console.log("formPost   =======", response)
            let rawResponse = await response.json();
            // console.log("formPost rawResponse", rawResponse)
            if (rawResponse && rawResponse.token) {
                return rawResponse
            } else if (rawResponse.statusCode == 403) {
                SigningOut(props);
            } else if (rawResponse.statusCode == 500) {
                // console.log(rawResponse);
            } else {
                return rawResponse
            }
        } catch (error) {
            // console.log(error)
        }
    }


    formPut = async (url, body, props) => {
        const value = await AsyncStorage.getItem('token')
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': 'bearer ' + value,
                    'Content-Type': 'multipart/form-data',
                },
                body: body
            });
            let rawResponse = await response.json();
            if (rawResponse) {
                return rawResponse
            } else if (rawResponse.statusCode == 403) {
                SigningOut(props);
            } else if (rawResponse.statusCode == 500) {
                // console.log(rawResponse);
            } else {
                return rawResponse
            }
        } catch (error) {
            return null;
        }
    }

    forgotpost = async (url, body, props) => {
        const value = await AsyncStorage.getItem('forgottoken')
        // console.log("new token value------------TTTTTTTTTTT", value);
        // console.log("valueDDDDDDD", url, body)
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + value,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'appversion': "0.0.1"
            },
            body: JSON.stringify(body)
        });
        let rawResponse = await response.json();
        if (rawResponse) {
            return rawResponse
        } else if (rawResponse.statusCode == 403) {
            SigningOut(props);
        } else {
            let data = { code: rawResponse.statusCode, data: rawResponse.data, message: rawResponse.message, }
            return data
        }
    }


    get = async (url, props) => {
        const value = await AsyncStorage.getItem('token')
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'appversion': "0.0.1"
            },
        });
        // console.log("get res", response)
        let rawResponse = await response.json();
        if (rawResponse) {
            return rawResponse
        } else if (rawResponse.statusCode == 403) {
            SigningOut(props);
        } else {
            return rawResponse
        }
    }

    delete = async (url, props) => {
        const value = await AsyncStorage.getItem('token')
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + value,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'appversion': "0.0.1"
            },
        });
        // console.log("delete", response)
        let rawResponse = await response.json();
        // console.log("rawResponse", rawResponse)
        if (rawResponse) {
            return rawResponse
        } else if (rawResponse.statusCode == 403) {
            SigningOut(props);
        } else {
            return rawResponse
        }
    }

    put = async (url, body, props) => {
        const value = await AsyncStorage.getItem('token')
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'bearer ' + value,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'appversion': "0.0.1"
            },
            body: JSON.stringify(body)
        });
        // console.log("Row responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", response);
        if (response != null && (response.status == 202 || response.status == 201)) {
            return { message: "update successfully" };
        } else {
            let rawResponse = await response.json();
            if (rawResponse) {
                return rawResponse
            } else if (rawResponse.statusCode == 403) {
                SigningOut(props);
            } else {
                return rawResponse
            }
        }

    }
}

const ApiCalling = new _ApiCalling();
export default ApiCalling;