<html>
<head>
  <title>Chip's Challenge HTML5</title>
  <meta charset="UTF-8">

  <link type="text/css" href="css/ui-darkness/jquery-ui-1.8.custom.css" rel="stylesheet" />
  <link type="text/css" href="css/chip.css" rel="stylesheet" />

  <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.custom.min.js"></script>
  <script type="text/javascript" src="js/chip_data.js"></script>
  <script type="text/javascript" src="js/chip.js"></script>

	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-9204423-5']);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
</head>
<body>
  <a href="..">Home</a><br /><br />
  <div id="explanation" style="display: inline-block; border: 2px solid; padding: 5px; margin-bottom: 20px;">
  This is a prototype of an HTML 5 implementation of Chip's Challenge.<br />
  To test the prototype, <span style="color: blue;">select map 1 to the right and click the PLAY button</span>.
  </div><br />

  <!-- Save map. -->
  Level #: <input id="level_number" size="5" type="text" />
  Chips: <input id="chips" size="5" type="text" />
  Time: <input id="time" size="5" type="text" />
  Password: <input id="password" size="5" type="text" />
  <input type="button" id="button_save_map" value="Save" disabled /><br />

  <!-- Initialize map to play it. -->
  <input type="button" id="button_play_map" style="margin-top: 5px; margin-bottom: 10px;" value="PLAY" />

  <div id="maps">
    Choose a map to load.
  </div>

  <!-- Map. -->
  <div id="map_region"><canvas id="map" width="288" height="288"></canvas></div>
  <div id="temp_region"><canvas id="temp" width="288" height="288"></canvas></div>
  <div id="viewport_container"><canvas id="viewport" width="288" height="288"></canvas></div><br />

  <!-- Item configuration -->
  Orientation: <select id="orientation"></select>
  Color: <select id="color"></select><br /><br />

  <!--<input type="button" onClick="goto_level(1);" value="Advance" /><br />-->

  <!-- Load tile images. -->
  <div id="tile_section"></div>
</body>
</html>
