const genOTP = () => {
    const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    // Find the length of string
    const len = string.length;
    for (let i = 0; i < 7; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}

const checkOTP = (systemOTP, userOTP) => {
    if (String(systemOTP) == String(userOTP)) {
        return true
    }
    return false
}


module.exports = {
    genOTP,
    checkOTP
}