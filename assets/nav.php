<nav>
    <a href="index.php" <?php
        if(isset($navActive)) {
            if($navActive == 'home') {
                echo 'id="nav-active"';
            }
        } else {
            echo 'id="nav-active"';
        }
    ?>>
        <div>
            <div class="nav-img">
                <img src="files/img/home.svg" alt="Home">
            </div>
            <div class="nav-txt">
                <p>Home</p>
            </div>
        </div>
    </a>
    <a href="discover.php" <?php
    if(isset($navActive)) {
        if($navActive == 'discover') {
            echo 'id="nav-active"';
        }
    }
    ?>>
        <div>
            <div class="nav-img">
                <img src="files/img/discover.svg" alt="Home">
            </div>
            <div class="nav-txt">
                <p>Discover</p>
            </div>
        </div>
    </a>
    <a href="upload.php" <?php
        if(isset($navActive)) {
            if($navActive == 'upload') {
                echo 'id="nav-active"';
            }
        }
    ?>>
        <div>
            <div class="nav-img">
                <img src="files/img/add.svg" alt="Home">
            </div>
            <div class="nav-txt">
                <p>Upload</p>
            </div>
        </div>
    </a>
</nav>