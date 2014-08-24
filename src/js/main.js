var tree = {
    roots : [ // contributors
	{
	    length : 10,
	    width: 10
	}
    ],
    // Age/Health
    trunk : {
	height : 10,
	width : 10
    },
    branches : [
	{
	    from : {x : 10, y : 10},
	    to : {x : 10, y : 10},
	    width : 10,
	    leaves : 2,
	    flowers : 0,
	    branches: []
	}
    ]
};

var Main = {
    options : {
        init : false
    },
    updateLength : function(evt) {
        var val = $('#sld-length').val();
        Main.options.dl = val / 100;
        console.log(Main.options.dl);
        Tree.draw(Main.options);
    },
    updateRandom : function(evt) {
        var val = $('#sld-random').val();
        Main.options.ar = val / 100;
        console.log(Main.options.ar);
        Tree.draw(Main.options);
    },
    updateAlpha : function(evt) {
        var val = $('#sld-alpha').val();
        Main.options.da = val / 100;
        console.log(Main.options.da);
        Tree.draw(Main.options);
    }
};

$(function() {
    Tree.draw();
    $('#sld-length').on('change', Main.updateLength);
    $('#sld-random').on('change', Main.updateRandom);
    $('#sld-alpha').on('change', Main.updateAlpha);
});
