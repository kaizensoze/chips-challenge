<?php

function main() {
    $action = $_REQUEST['action'];
    if (!isset($action)) {
        return;
    }

    switch ($action) {
        case "load_maps":
            loadMaps();
            break;
        default:
            echo 'invalid action';
    }
}
main();

function loadMaps() {
     $maps = array();
     $it = new RecursiveDirectoryIterator('../maps');
     foreach (new RecursiveIteratorIterator($it) as $file) {
        if ($it->isDot()) {
            continue;
        }

        $fh = fopen($file, 'r');
        $data = fread($fh, filesize($file));
        fclose($fh);

        $info = pathinfo($file);
        $map_name = basename($file, '.' . $info['extension']);
        $maps[$map_name] =  $data;
     }
     echo json_encode($maps);
}

/*
function load_tiles() {
    $tiles = array();
    $tile_dir = '../images/tiles/';
    $it = new RecursiveDirectoryIterator($tile_dir);
    foreach (new RecursiveIteratorIterator($it) as $file) {
        if ($it->isDot()) {
            continue;
        }
        array_push($tiles, preg_replace('/\.\.\//', '', $tile_dir) . $file->getFilename());
    }
    sort($tiles);

    echo json_encode($tiles);
}

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
*/
?>
