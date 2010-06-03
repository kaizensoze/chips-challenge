<?php

function main() {
    $action = $_GET['action'];
    if (isset($action)) {
        switch ($action) {
            case "save_map":
                save_map($_REQUEST['data']);
                break;
            default:
                echo 'invalid action';
        }
    }
}
main();

function save_map($m) {
    $f = '../maps/test.json';
    $fh = fopen($f, 'w');
    fwrite($fh, $m);
    fclose($fh);
}

?>
