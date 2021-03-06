<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="visuly, social Media, signup">
    <meta name="description" content="Sign up to Visuly">
    <meta name="author" content="MctomSpdo">
    <title>Signup - Visuly</title>

    <link rel="stylesheet" href="./files/css/main.css">
    <link rel="stylesheet" href="./files/css/login.css">
    <link rel="icon" type="image/x-icon" href="./files/img/icon.svg">

    <script src="files/js/signup.js" defer></script>
</head>
<body>
<div id="login-wrapper">
    <div id="login-logo">
        <h1>VISULY</h1>
    </div>
    <div id="login-box">
        <h2>Sign Up</h2>
        <form method="post" id="signup-form">
            <div>
                <input type="text" placeholder="Username" name="username" id="input-username" autocomplete="username">
                <div class="input-error"></div>
            </div>

            <input type="email" placeholder="Email" name="email" id="input-email" autocomplete="email">

            <div class="gender-box">
                <div>
                    <input type="radio" name="gender" value="female" id="female">
                    <label for="female">Female</label>
                </div>
                <div>
                    <input type="radio" name="gender" value="male" id="male">
                    <label for="male">Male</label>
                </div>
                <div>
                    <input type="radio" name="gender" value="divers" id="divers">
                    <label for="divers">Divers</label>
                </div>
            </div>

            <input type="password" name="password1" placeholder="Password" id="input-pwd1" autocomplete="new-password">
            <input type="password" name="password2" placeholder="retype password" id="input-pwd2"
                   autocomplete="new-password">

            <p id="signup-error" class="txt-red"></p>

            <button type="submit">Sign up</button>
        </form>

        <a href="login.php">Log in</a>
    </div>
</div>

<div id="login-backdrop">
    <ul class="box-area" id="signup-animation">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>

</body>
</html>