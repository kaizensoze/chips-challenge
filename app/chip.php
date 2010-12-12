<?php

function main() {
    $action = $_REQUEST['action'];
    if (!isset($action)) {
        return;
    }

    switch ($action) {
        case "load_data":
            loadData();
            break;
        default:
            echo 'invalid action';
    }
}
main();

function loadData() {
    $data = array(
        'maps' => getMaps(),
        'tiles' => getTiles(),
        'tile_dimensions' => getTileDimensions(),
        'tiles_folder' => 'images/tiles'
    );
    echo json_encode($data);
}

function getMaps() {
    $maps = array();
    $it = new RecursiveDirectoryIterator('maps');
    foreach (new RecursiveIteratorIterator($it) as $file) {
       if ($it->isDot()) {
           continue;
       }

       $fh = fopen($file, 'r');
       $data = fread($fh, filesize($file));
       fclose($fh);

       array_push($maps, $data);
    }
    return $maps;
}

function getTiles() {
    $tiles = array();
    $tile_dir = '../public/images/tiles/';
    $it = new RecursiveDirectoryIterator($tile_dir);
    foreach (new RecursiveIteratorIterator($it) as $file) {
        if ($it->isDot()) {
            continue;
        }
        array_push($tiles, $file->getFilename());
    }
    sort($tiles);
    return $tiles;
}

function getTileDimensions() {
    $tile_dir = '../public/images/tiles/';
    $it = new RecursiveDirectoryIterator($tile_dir);
    foreach (new RecursiveIteratorIterator($it) as $file) {
        if ($it->isDot()) {
            continue;
        }

        $imagesize = getimagesize($file);
        $tile_dimensions = array(
            'width' => $imagesize[0],
            'height' => $imagesize[1]
        );
        return $tile_dimensions;
    }
}

/*
function saveMap($r) {
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
