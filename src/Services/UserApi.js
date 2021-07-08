import { SERVICE_URL } from "../components/constants/Service";
import AppConfig from "../components/constants/AppConfig";
import ApiCalling from "./Api";
// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

class _userApi {

    authUserSignin = async (body, props) => {
        // console.log("@@@@@@", body)
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.AUTH_USER_SIGNIN
            // console.log("authUserSignin", url)
            let ApiResponse = await ApiCalling.authpost(url, body, props)
            // console.log("Sign in Response", ApiResponse)
            if (ApiResponse && ApiResponse.token) {
                await AsyncStorage.setItem('token', ApiResponse.token)
                await AsyncStorage.setItem('userId', ApiResponse.user.id.toString())
                await AsyncStorage.setItem('phoneNumberConfirmed', JSON.stringify(ApiResponse.user.phoneNumberConfirmed))

            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    authUserSignup = async (body, props) => {
        // console.log("@@@@@@", body)
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.AUTH_VENDOR_SIGNUP
            console.log(url)
            let ApiResponse = await ApiCalling.authpost(url, body, props)
            console.log("Sign up Response in user api--->", ApiResponse)
            // console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT--->", ApiResponse.token)

            // console.log("here your data is  ======",ApiResponse.error[0].description)
            // console.log("here your data is 2  ======",ApiResponse.error[0])

            if (ApiResponse.statusCode == 200 && ApiResponse.token) {
                // return ApiResponse
                await AsyncStorage.setItem('registertoken', ApiResponse.token)
            }
            else if (ApiResponse.error[0].description) {
                console.log("i am executed")
                ToastAndroid.show(ApiResponse.error[0].description, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(ApiResponse.error[0], ToastAndroid.SHORT);
            }
            return ApiResponse;
        } catch (error) {
            // console.log(error)
        }
    }


    becomeSanatanVendor = async (body, props) => {
        // console.log("FFFFFForm data of become vendor&&&&",body);
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.BECOME_VENDOR;
            // console.log("becomeSanatanVendor---- ", url)
            let ApiResponse = await ApiCalling.formPost(url, body, props);
            // console.log("manage &&&&&&& Response", ApiResponse);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getOrdersList = async (body, props) => {
        // console.log("@@@@@@", body)
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_ORDER_LIST;
            let ApiResponse = await ApiCalling.post(url, body, props);
            // console.log("apiresponse", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    importItems = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.IMPORT_ITEMS;
            let ApiResponse = await ApiCalling.post(url, body, props);
            // console.log("apiresponse", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getIndividualOrder = async (orderId, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_INDIVIDUALS_ORDER_DETAILS + "/" + orderId;
            let ApiResponse = await ApiCalling.get(url, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getOrderStatusList = async (props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_ORDER_STATUS_LIST;
            let ApiResponse = await ApiCalling.get(url, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getProfileData = async (props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_PROFILE_DATA;
            let ApiResponse = await ApiCalling.get(url, props);
            // console.log("profile ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getUserProfile = async (props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_USER_PROFILE_DATA;
            let ApiResponse = await ApiCalling.get(url, props);
            // console.log("profile ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getCategoryList = async (props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_CATEGORY_LIST;
            // console.log("getCategoryList", url)
            let ApiResponse = await ApiCalling.get(url, props);
            // console.log("getCategoryList ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }


    getProductPrices = async (props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_PRODUCT_PRICES;
            // console.log("getProductPrices", url)
            let ApiResponse = await ApiCalling.post(url, props);
            // console.log("getProductPrices ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getVendorSale = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_VENDOR_SALE;
            // console.log("getVendorSale", url)
            let ApiResponse = await ApiCalling.post(url, body, props);
            // console.log("getVendorSale ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }


    getProductList = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_ALL_PRODUCTS_LIST;
            // console.log("getProductList url", url)
            // console.log("getProductList body", body)
            let ApiResponse = await ApiCalling.post(url, body, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    importProducts = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.IMPORT_PRODUCTS;
            let ApiResponse = await ApiCalling.post(url, body, props);
            if (ApiResponse) {
                if (ApiResponse.items.length > 0) {
                    for (let index = 0; index < ApiResponse.items.length; index++) {
                        ApiResponse.items[index].isSelected = false;

                    }
                }
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    saveWarehouse = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.SAVE_WAREHOUSE;
            // console.log("saveWarehouse url", url)
            // console.log("saveWarehouse body", body)
            let ApiResponse = await ApiCalling.post(url, body, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getWarehouses = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_WAREHOUSE;
            let ApiResponse = await ApiCalling.post(url, body, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getWareHouseById = async (warehouseId, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_WAREHOUSE_BY_ID + "/" + warehouseId;
            let ApiResponse = await ApiCalling.get(url, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    deleteWarehouse = async (warehouseId, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.DELETE_WAREHOUSE + "/" + warehouseId;
            // console.log("getProductList url", url)
            let ApiResponse = await ApiCalling.delete(url, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (productId, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.DELETE_PRODUCT + "/" + productId;
            // console.log("getProductList url", url)
            let ApiResponse = await ApiCalling.delete(url, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }


    changeOrderStatus = async (orderId, body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.CHANGE_ORDER_STATUS + "/" + orderId;
            // console.log("changeOrderStatus", url)
            let ApiResponse = await ApiCalling.post(url, body, props);
            console.log("changeOrderStatus", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    updateWarehouse = async (warehouseId, body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.UPDATE_WAREHOUSE_DATA + "/" + warehouseId;
            // console.log("updateWarehouse", url)
            let ApiResponse = await ApiCalling.put(url, body, props);
            // console.log("updateWarehouse", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    sendFcmToken = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.UPDATE_FCM_TOKEN;
            // console.log("updateDriverInfo => ", url);
            let ApiResponse = await ApiCalling.put(url, body, props)
            if (ApiResponse) {
                return ApiResponse
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            // console.log(error)
        }
    }

    addProduct = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.ADD_PRODUCT;
            // console.log("addProduct", url, body)
            let ApiResponse = await ApiCalling.formPost(url, body, props);
            // console.log("addProduct", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (body, productId, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.EDIT_PRODUCT_BY_ID + '/' + productId
            // console.log("addProduct", url, body)
            let ApiResponse = await ApiCalling.formPut(url, body, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getStocksList = async (props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_STOCK_LIST;
            // console.log("get stock list urllll", url)
            let ApiResponse = await ApiCalling.get(url, props);
            // console.log("stock list user api response ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getStockProductList = async (body, value, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_STOCK_PRODUCT_LIST + '?warehouseId=' + value;
            let ApiResponse = await ApiCalling.post(url, body, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getHistoryDetails = async (stockId, productId, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_HISTORY_DETAILS + '?warehouseId=' + stockId + '&productId=' + productId;
            // console.log("HISTORY DETAILS url", url)
            let ApiResponse = await ApiCalling.get(url, props);
            // console.log(" history api response in user api %%%%%% ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getAvailableOptions = async (props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_AVAILABLE_OPTIONS;
            // console.log("getAvailableOptions", url)
            let ApiResponse = await ApiCalling.get(url, props);
            // console.log(" history api response in user api %%%%%% ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getProductById = async (productId, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_PRODUCT_BY_ID + '/' + productId;
            // console.log("getProductById", url)
            let ApiResponse = await ApiCalling.get(url, props);
            // console.log(" history api response in user api %%%%%% ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getManageProductList = async (value, body, props) => {
        // console.log("body", body)
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_MANAGE_PRODUCT_LIST + '/' + value + '/products'
            let ApiResponse = await ApiCalling.post(url, body, props);
            // console.log("apiresponse", ApiResponse)
            if (ApiResponse) {
                if (ApiResponse.items.length > 0) {
                    for (let index = 0; index < ApiResponse.items.length; index++) {
                        ApiResponse.items[index].isSelected = false;

                    }
                }
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    updateStockWarehouse = async (warehouseId, body, props) => {
        // console.log("body of save warehouse stock", body);
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.UPDATE_STOCK_WAREHOUSE_DATA + '?warehouseId=' + warehouseId
            // console.log("update stock ", url)
            // console.log("stock update body", body);
            let ApiResponse = await ApiCalling.put(url, body, props);
            // console.log("update stock ******** in user api", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    updateProfile = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.UPDATE_PROFILE;
            let ApiResponse = await ApiCalling.formPut(url, body, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    UpdateStatus = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.Update_Status;
            let ApiResponse = await ApiCalling.put(url, body, props);
            if (ApiResponse) {
                return ApiResponse
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            return null;
        }
    }

    updateProductPrice = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.UPDATE_PRODUCT_PRICE;
            let ApiResponse = await ApiCalling.put(url, body, props);
            // console.log("updateProfile", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    updateRemainingVarientsPrice = async (body, props) => {
        console.log("body of updateRemainingVarientsPrice === ", body)
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.UPDATE_REMAINING_VARIENTS_PRICE;
            let ApiResponse = await ApiCalling.put(url, body, props);
            console.log("API Response of updateRemainingVarientsPrice === ", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    addProductList = async (warehouseId, body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.ADD_PRODUCT_LIST + '/' + warehouseId + '/add-all-products'
            // console.log("%%%%%%% URL TO ADD LIST---- ", url)
            let ApiResponse = await ApiCalling.post(url, body, props);
            // console.log("manage &&&&&&& Response", ApiResponse);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getOtpEmail = async (phoneNumber, props) => {
        // console.log("get otp email address--------", phoneNumber);
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_OTP_BYMAIL + '?phoneNumber=' + phoneNumber;
            // console.log("url of get otp by email--------", url);
            let ApiResponse = await ApiCalling.get(url, props)
            // console.log("generate otp by email", ApiResponse)
            if (ApiResponse.code == 200) {
                return ApiResponse.data
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            // console.log(error)
        }
    }

    varifyOtpMail = async (otp, phoneNumber, props) => {
        // console.log("get otp email address--------", otp, phoneNumber);
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.VARIFY_OTP_BYMAIL + "/" + otp + '?phoneNumber=' + phoneNumber;
            // console.log("url of varified otp by email ++++++++++", url);
            let ApiResponse = await ApiCalling.get(url, props)
            // console.log("generate otp by email", ApiResponse)
            if (ApiResponse && ApiResponse.token) {
                await AsyncStorage.setItem('forgottoken', ApiResponse.token)

            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    modifyPassword = async (body, props) => {
        // console.log("body of modify password-------------", body);
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.CHANGE_PASSWORD;
            // console.log("change password url@@@@@@@@@@@@@@@", url);
            let ApiResponse = await ApiCalling.forgotpost(url, body, props)
            // console.log("Modified Password Response--", ApiResponse)
            if (ApiResponse) {
                return ApiResponse
            } else {
                ToastAndroid.show(
                    ApiResponse.message,
                    ToastAndroid.SHORT,
                );
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    getSelectedCheckbox = async (value, body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.GET_SELECTED_CHECKBOX_PRODUCT_LIST + '/' + value + '/add-products'
            let ApiResponse = await ApiCalling.post(url, body, props);
            // console.log("**************** &&&&&&& Response", ApiResponse);
            if (ApiResponse) {
                return ApiResponse
            } else {
                // console.log("sddgddsd", ApiResponse)
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            console.log(error)
        }
    }

    updateDriverInfo = async (body, props) => {
        try {
            let url = AppConfig.BASE_URL + SERVICE_URL.UPDATE_DRIVER_INFO;
            // console.log("updateDriverInfo => ", url);
            let ApiResponse = await ApiCalling.put(url, body, props)
            if (ApiResponse) {
                return ApiResponse
            } else {
                if (ApiResponse.message) {
                    ToastAndroid.show(
                        ApiResponse.message,
                        ToastAndroid.SHORT,
                    );
                }
            }
            return ApiResponse;
        } catch (error) {
            // console.log(error)
        }
    }


}

const UserApi = new _userApi();
export default UserApi;