<html>
<head>
  <link type="text/css" href="css/ui-darkness/jquery-ui-1.8.custom.css" rel="stylesheet" />
  <link type="text/css" href="css/chip.css" rel="stylesheet" />

  <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.custom.min.js"></script>
  <script type="text/javascript" src="js/chip.js"></script>
</head>
<body>
  <?php
    $it = new RecursiveDirectoryIterator('images/tiles');
    foreach (new RecursiveIteratorIterator($it) as $file) {
      $src = 'images/tiles/' . $file->getFilename();
      echo '<div class="tile">'
         . '  <img src="' . $src . '">'
         . '</div>';
    }
  ?>
  <div id="droppable">
    <p>Drop here</p>
  </div>

  <!--
  <script type="text/javascript">
    $(".tile").draggable();
    $("#droppable").droppable({
        drop: function(event, ui) {
            $(this).find('p').html('Dropped!');
        }
    });
  -->
  </script>
</body>
</html>
