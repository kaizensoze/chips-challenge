<?php

function main() {
    $action = $_GET['action'];
    if (isset($action)) {
        switch ($action) {
            default:
                echo 'invalid action';
        }
    }
}
main();
?>
