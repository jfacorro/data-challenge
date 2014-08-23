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

$(function(){
	regenerate(true);
});