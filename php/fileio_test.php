<?php
$filename = '../maps/test.txt';
$filecontent = "Add this to the file\n";
echo getcwd() . "<br />";
echo get_current_user() . "<br />";
if (!is_writable($filename)) {
    echo "file not writeable" . "<br />";
}
$fh = fopen($filename, 'w');
fwrite($fh, $filecontent);
fclose($fh);
?>
