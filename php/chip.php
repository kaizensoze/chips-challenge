<?php

function main() {
    $action = $_REQUEST['action'];
    if (isset($action)) {
        switch ($action) {
            case "save_map":
                save_map($_REQUEST);
                break;
            default:
                echo 'invalid action';
        }
    }
}
main();

function save_map($r) {
    $map = $r['map'];
    $level = $r['level'];
    $overwrite = $r['overwrite'];
    $f = '../maps/' . $level . '.json';
    if (file_exists($f) && !$overwrite) {
        echo 'file exists.';
    } else {
        $fh = fopen($f, 'w');
        fwrite($fh, $map);
        fclose($fh);
    }
}

?>
