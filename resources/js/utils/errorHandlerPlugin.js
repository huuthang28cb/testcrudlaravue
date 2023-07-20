// Định nghĩa hàm kiểm tra lỗi C_E_005
function isC_E_005Error(error) {
    return error.response && error.response.data.body[0] === "C_E_005";
}

function handleGlobalError(error) {
    console.error(error, 'ikik');
    if (isC_E_005Error(error)) {
        // store.state.authenticated = false;
        // Hoặc bạn có thể xử lý lỗi ở đây theo ý muốn
        // Ví dụ: thông báo lỗi, redirect, vv.
        return;
    }
    // Xử lý các lỗi khác theo ý muốn
    // ...
}

// const errorHandlerPlugin = (store) => {
//     store.subscribeAction((action, state) => {
//         console.log(action.error)
//         if (action.error) {
//             handleGlobalError(action.error);
//         }
//     });
// };

const errorHandlerPlugin = (store) => {
    store.subscribeAction((action, state) => {
        console.log(store.state.product);
        if (action.error) {
            const error = state.product.error; // Thay 'product' bằng tên module của bạn nếu cần
            handleGlobalError(error);
        }
    });
};


export default errorHandlerPlugin;
