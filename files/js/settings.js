//data
let username = document.getElementById("data-username").innerHTML;
let email = document.getElementById("data-email").innerHTML;
let phoneNumber = document.getElementById("data-phoneNumber").innerHTML;

//elements:
let userForm;
let contentArea = document.getElementById("current-setting-wrapper");
let usernameInput;
let emailInput;
let phoneNumberInput;

//buttons:
let saveButton;
let cancelButton;


init();

function init() {
    loadEditUser(null);
}

/**
 * Checks if the current input fields have the same value as the already defined data
 * @returns {boolean} true if same, false otherwise
 */
function checkUserUpdate() {
    return usernameInput.value != username || emailInput.value != email || phoneNumberInput.value != phoneNumber;
}

/**
 * Turns on or off saveButton on EditUser
 */
function checkUserSubmit() {
    saveButton.disabled = !checkUserUpdate();
}

/**
 * Loads the edit user submenu
 * @param element onClick element
 */
function loadEditUser(element) {
    if(element !== null) {
        //change what element is selected in nav:
        Array.from(document.getElementById("setting-nav").children).forEach((item) => {
            item.id = "";
        })
        element.id = "nav-active";
    }

    //load new content:
    contentArea.innerHTML = `<h1>Edit User</h1>

                <form id="settings-profile-wrapper">
                    <div id="settings-user-profilepic">
                        <div id="settings-userpfp-wrapper">
                            <img src="files/img/users/test.png" alt="User image">
                        </div>
                        <div id="settings-editoverlay">
                            <img src="files/img/edit.svg" alt="edit">
                        </div>
                    </div>

                    <div>
                        <label for="username">Username</label>
                        <br>
                        <input type="text" name="username" id="input-username">
                        <br>

                        <label for="email">Email</label>
                        <br>
                        <input type="text" name="email" id="input-email">
                        <br>

                        <label for="phonenumber">Phone number</label>
                        <br>
                        <input type="text" name="phonenumber" id="input-phone">

                        <div class="settings-form-buttons">
                            <button type="submit" disabled id="save-button">Save</button>
                            <button id="cancel-button">Cancel</button>
                        </div>
                    </div>
                </form>`;

    //load elements:
    userForm = document.getElementById("settings-profile-wrapper");
    usernameInput = document.getElementById("input-username");
    emailInput = document.getElementById("input-email");
    phoneNumberInput = document.getElementById("input-phone");

    saveButton = document.getElementById("save-button");
    cancelButton = document.getElementById("cancel-button");

    //add submit eventListener:
    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("submitting to Server");
        //TODO: send to server (API not done yet)
    });


    //add eventListeners to all input fields
    Array.from(userForm.elements).forEach((item) => {
        item.addEventListener("keyup", checkUserSubmit);
    });

    //set data:
    usernameInput.value = username;
    emailInput.value = email;
    phoneNumberInput.value = phoneNumber;
}


/************************************************ PASSWORD ************************************************/

let inputCurrentPw;
let inputNewPw;
let reenterNewPw;

let passwordError;

/**
 * loads the submenu for changing the password.
 * @param element onClick element
 */
function loadPassword(element) {
    //change what element is selected in nav:
    Array.from(document.getElementById("setting-nav").children).forEach((item) => {
        item.id = "";
    })
    element.id = "nav-active";

    contentArea.innerHTML = `<div id="change-password">
                    <h1>Change Password</h1>

                    <form class="setting-form-80" id="settings-password-wrapper">
                        <label for="current-password">Current Password</label>
                        <br>
                        <input type="password" placeholder="Current Password" name="current-password" id="input-currentPw">
                        <br>
                        <label for="new-password">New Password</label>
                        <br>
                        <input type="password" placeholder="New Password" name="new-password" id="input-newPw">
                        <br>
                        <label for="retype-password">Retype Password</label>
                        <br>
                        <input type="password" placeholder="Retype new Password" name="retype-password" id="input-reenterPw">

                        <p id="password-error" class="txt-red"></p>

                        <div class="settings-form-buttons">
                            <button type="submit" disabled id= "save-button">Save</button>
                            <button id="cancel-button">Cancel</button>
                        </div>
                    </form>
                </div>`;

    //update variables:
    inputCurrentPw = document.getElementById("input-currentPw");
    inputNewPw = document.getElementById("input-newPw");
    reenterNewPw = document.getElementById("input-reenterPw");

    saveButton = document.getElementById("save-button");
    cancelButton = document.getElementById("cancel-button");
    userForm = document.getElementById("settings-password-wrapper");
    passwordError = document.getElementById("password-error");

    //add eventListeners to all input fields
    Array.from(userForm.elements).forEach((item) => {
        item.addEventListener("keyup", checkPasswordSubmit);
    });

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        pwSendToServer();
    });

    cancelButton.addEventListener("click", () => {
        inputNewPw.value = "";
        inputCurrentPw.value = "";
        reenterNewPw.value = "";
        checkPasswordSubmit();
    });
}

/**
 * checks if the password Values can enable a save button
 * @returns {boolean} true of none of them are emtpy
 */
function checkPasswordUpdate() {
    return inputCurrentPw.value != "" && inputNewPw.value != "" && reenterNewPw.value != "";
}

/**
 * Enables the save button if Input fields are valid
 */
function checkPasswordSubmit() {
    saveButton.disabled = !(checkPasswordValues() & checkPasswordUpdate());
}

/**
 * Validates the password that is entered by the user
 */
function checkPasswordValues() {
    let password = inputNewPw.value;

    if(password == "") {
        return true;
    }

    if(reenterNewPw.value != password) {
        pwError("Retyped password is not the same as new password!");
        return false;
    }
    if(!hasLowerCase(password)) {
        pwError("Password has to have at least 1 lowercase letter");
        return false;
    }
    if(!hasUpperCase(password)) {
        pwError("Password has to have at least 1 uppercase letter");
        return false;
    }
    if(!containsNumber(password)) {
        pwError("Password has to have at least 1 number letter");
        return false;
    }
    pwError("");
    return true;
}

/**
 * Sets an error to the password error field
 * @param error message
 */
function pwError(error) {
    passwordError.style.display = (error == "") ? "none" : "block"
    passwordError.innerHTML = error;
}

/**
 * Sends the request to change the passwords to the server
 */
function pwSendToServer() {
    console.log("sending pw request to Server!");
    //TODO: send to API after API is done
}

/************************************************ UTIL ************************************************/

/**
 * checks if a String has a lowercase letter inside
 * @param {String} str String to check
 * @returns {Boolean} true, if there is a lowercase letter, false otherwise
 */
function hasLowerCase(str) {
    return str.toUpperCase() !== str;
}

/**
 * checks if a String has an uppercase letter inside
 * @param {String} str String to check
 * @returns {Boolean} true, if there is an uppercase letter, false otherwise
 */
function hasUpperCase(str) {
    return str.toLowerCase() !== str;
}

/**
 * checks if a String contains a number
 * @param {String} str String to check
 * @returns {Boolean} true, if there is a number
 */
function containsNumber(str) {
    return /\d/.test(str);
}