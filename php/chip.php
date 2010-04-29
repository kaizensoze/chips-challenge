<?php

function main() {
    $action = $_GET['action'];
    if (isset($action)) {
        switch ($action) {
            case 'tiles':
                load_tiles();
                break;
            default:
                echo 'invalid action';
        }
    }
}
main();

function load_tiles() {
    $images = array();
    $it = new RecursiveDirectoryIterator('../images/tiles');
    foreach (new RecursiveIteratorIterator($it) as $file) {
        if (!$it->isDot()) {
            array_push($images, 'images/tiles/' . $file->getFilename());
        }
    }
    sort($images);
    echo json_encode($images);
}

?>
