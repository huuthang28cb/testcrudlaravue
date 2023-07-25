

// Định nghĩa hàm kiểm tra lỗi C_E_005
// function isC_E_005Error(error) {
//     return error.response && error.response.data.body[0] === "C_E_005";
// }

function handleGlobalError(error, store) {
    // if (isC_E_005Error(error)) {
    //     store.state.authenticated = false;
    //     return;
    // }
    var array = error.response.data.body;
    array.forEach(function (value) {
        switch (value) {
            case "C_E_005":
                store.state.authenticated = false;
                break;
            case "Login_E_001":
                store.state.errors.email = value;
                break;
            case "Login_E_002":
                store.state.errors.password = value;
                break;

            default:
                break;
        }
        return
    });
    console.log(store.state)
}


export default handleGlobalError;
