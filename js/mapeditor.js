
$(document).ready(function() {
    var map_editor = new MapEditor();
    var map_editor_gui = new MapEditorGUI(map_editor);
    map_editor_gui.loadMaps();
    map_editor_gui.loadTiles();
});

