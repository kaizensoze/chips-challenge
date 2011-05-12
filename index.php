<html>
<head>
  <link type="text/css" href="css/ui-darkness/jquery-ui-1.8.custom.css" rel="stylesheet" />
  <link type="text/css" href="css/chip.css" rel="stylesheet" />

  <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.custom.min.js"></script>
  <script type="text/javascript" src="js/chip_data.js"></script>
  <script type="text/javascript" src="js/chip.js"></script>
</head>
<body>
  <div id="explanation" style="display: inline-block; border: 2px solid; padding: 5px; margin-bottom: 20px;">
  This is a prototype of an html5 canvas port of Chip's Challenge.<br />
  The layout is fairly cluttered since the mapeditor and playtesting share the same page.<br />
  To test the prototype, <span style="color: blue;">select map 1 and click the Play button</span>.
  </div><br />
  <!-- Save map. -->
  Level #: <input id="level_number" size="5" type="text" />
  Chips: <input id="chips" size="5" type="text" />
  Time: <input id="time" size="5" type="text" />
  Password: <input id="password" size="5" type="text" />
  <input type="button" id="button_save_map" value="Save" disabled /><br />
  <input type="button" id="button_play_map" value="Play" />

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

  <!--<input type="button" onClick="goto_level(1);" value="Advance" /><br />-->

  <!-- Load tile images. -->
  <div id="tile_section"></div>
</body>
</html>
