<html>
<head>
  <link type="text/css" href="css/ui-darkness/jquery-ui-1.8.custom.css" rel="stylesheet" />
  <link type="text/css" href="css/chip.css" rel="stylesheet" />

  <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.custom.min.js"></script>
  <script type="text/javascript" src="js/json2.js"></script>
  <script type="text/javascript" src="js/chip.js"></script>
</head>
<body>
  <!-- Map. -->
  <canvas id="map"></canvas><br />

  <!-- Save map. -->
  Level number: <input id="level_number" size="5" type="text" />
  <input type="button" onClick="save_map(0)" value="Save" />
  <div style="float: right; width: 300; height: 250; overflow: auto;">
    Choose a map to load.
  </div>
  <br /><br />

  <!-- Load tile images. -->
  <?php
    $tile_str = '';
    $tiles = array();
    $tile_dir = 'images/tiles/';
    $it = new RecursiveDirectoryIterator($tile_dir);
    foreach (new RecursiveIteratorIterator($it) as $file) {
        if (!$it->isDot()) {
            array_push($tiles, $tile_dir . $file->getFilename());
        }
    }
    sort($tiles);

    $col_limit = 10;
    $i = 0;
    foreach ($tiles as $tile) {
        if ($i % $col_limit == 0 && $i > 0) {
            $tile_str .= '<br />';
        }
        $tile_str .= '<div class="tile">'
                  .  '  <img src="' . $tile . '"/>'
                  .  '</div>';
        $i++;
    }
    echo $tile_str;
  ?>
  <br /><br />

  <!-- Item configuration -->
  Orientation: <select id="orientation"></select>
  Color: <select id="color"></select>
</body>
</html>
