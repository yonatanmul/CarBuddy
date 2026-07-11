function validateRegister() {
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    var msg = document.getElementById("registerError");
    msg.innerHTML = "";
    if (password.length < 6) {
        msg.innerHTML = "הסיסמה חייבת להכיל 6 תווים לפחות";
        return false;
    }
    if (password !== password2) {
        msg.innerHTML = "הסיסמאות אינן תואמות";
        return false;
    }
    return true;
}