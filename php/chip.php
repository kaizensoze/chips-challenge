<?php

function main() {
    $action = $_REQUEST['action'];
    if (isset($action)) {
        switch ($action) {
            case "save_map":
                save_map($_REQUEST);
                break;
            case "show_maps":
                show_maps();
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

function show_maps() {
     $maps = array();
     $it = new RecursiveDirectoryIterator('../maps');
     foreach (new RecursiveIteratorIterator($it) as $file) {
        if (!$it->isDot()) {
            array_push($maps, basename($file));
        }
     }
     echo json_encode($maps);
}

?>
