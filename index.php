<html>
<head>
  <link type="text/css" href="css/ui-darkness/jquery-ui-1.8.custom.css" rel="stylesheet" />
  <link type="text/css" href="css/chip.css" rel="stylesheet" />

  <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.custom.min.js"></script>
  <script type="text/javascript" src="js/json2.js"></script>
  <script type="text/javascript" src="js/chip_data.js"></script>
  <script type="text/javascript" src="js/chip.js"></script>
</head>
<body>
  <!-- Save map. -->
  Level #: <input id="level_number" size="5" type="text" />
  Chips: <input id="chips" size="5" type="text" />
  Time: <input id="time" size="5" type="text" />
  Password: <input id="password" size="5" type="text" />
  <input type="button" onClick="save_map(0)" value="Save" /><br />
  <input type="button" onClick="play_map();" value="Play" />

  <!-- Map. -->
  <div id="map_region"><canvas id="map" width="288" height="288"></canvas></div>
  <div id="temp_region"><canvas id="temp" width="288" height="288"></canvas></div>
  <div id="viewport_container"><canvas id="viewport" width="288" height="288"></canvas></div><br />

  <div id="maps">
    Choose a map to load.
  </div>

  <!-- Item configuration -->
  Orientation: <select id="orientation"></select>
  Color: <select id="color"></select><br /><br />

  <input type="button" onClick="goto_level(1);" value="Advance" /><br />

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
</body>
</html>
