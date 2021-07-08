export function SigningOut(props) {
    props.navigation.navigate('Login')
}

export function StringValueFromEnum(enumName, value) {
    for (var k in enumName) if (enumName[k] == value) return k;
    return null;
}

export function getColorCodeByOrderStatus(status) {
    status = status.toLowerCase();
    switch (status) {
        case "complete":
            return "#FFE0B2";
        case "new":
        case "paymentreceived":
        case "awaitingorderconfirmation":
            return "#FFE0B2";
        case "deliveryagentassigned":
        case "pickedbydeliveryagent":
        case "confirmandassignfordelivery":
            return "#FFE0B2";
        case "returninitiated":
        case "canceled":
            return "#FFE0B2";
        default:
            return "#FFE0B2";
    }
}