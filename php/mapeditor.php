<?php

function main() {
    $action = $_REQUEST['action'];
    if (!isset($action)) {
        return;
    }

    switch ($action) {
        case "load_map_list":
            load_map_list();
            break;
        case "load_map":
            $map = $_REQUEST['map'];
            load_map($map);
            break;
        default:
            echo 'invalid action';
    }
}
main();

function load_map_list() {
     $maps = array();
     $it = new RecursiveDirectoryIterator('../maps');
     foreach (new RecursiveIteratorIterator($it) as $file) {
        if ($it->isDot()) {
            continue;
        }
        array_push($maps, basename($file));
     }
     echo json_encode($maps);
}

function load_map($map) {
    $f = '../maps/' . $map . '.json';
    if (file_exists($f)) {
        $fh = fopen($f, 'r');
        $data = fread($fh, filesize($f));
        fclose($fh);
    }
    echo json_encode($data);
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
