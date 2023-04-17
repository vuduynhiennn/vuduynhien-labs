const VLD_username = (string) => {
    if(/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(string)) {
        return {
            status: true
        }
    } else {
        return {
            status: false,
            message: "Tên hiển thị phải bao gồm từ 6 đến 30 chữ hoặc số, viết liền"
        }
    }
}

const VLD_email = (email) => {
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return {
            status: true
        }
    } else {
        return {
            status: false,
            message: "Vui lòng nhập đúng định dạng email"
        }
    }
}

const VLD_password = (password) => {
    if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,30}$/.test(password)) {
        return {
            status: true
        }
    } else {
        return {
            status: false,
            message: "Mật khẩu yêu cầu cần ít nhất gồm 8 kí tự trong đó có ít nhất một chữ, một số và viết liền"
        }
    }
}


module.exports = {
    VLD_username,
    VLD_email,
    VLD_password
}