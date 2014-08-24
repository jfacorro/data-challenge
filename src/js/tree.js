/* D3 Tree */
/* Copyright 2013 Peter Cook (@prcweb); Licensed MIT */

// Tree configuration
var Tree = {
    defaultOptions : {
	seed : {
            i: 0, x: 210, y: 300, a: 0, l: 70, d:0
        }, // a = angle, l = length, d = depth
	da : 0.5, // Angle delta
	dl : 0.8, // Length delta (factor)
	ar : 0.5, // Randomness
	maxDepth : 10,
	init : true // true: create new tree, false: update
    },
    // Tree creation functions
    generate : function(opts, branches, b) {
	b = b == undefined ? opts.seed : b;
	var end = Tree.endPt(b), daR, newB;
	branches.push(b);

	if (b.d === opts.maxDepth)
	    return;

	// Left branch
	daR = opts.ar * Math.random() - opts.ar * 0.5;
	newB = {
	    i: branches.length,
	    x: end.x,
	    y: end.y,
	    a: b.a - opts.da + daR,
	    l: b.l * opts.dl,
	    d: b.d + 1,
	    parent: b.i
	};
	Tree.generate(opts, branches, newB);

	// Right branch
	daR = opts.ar * Math.random() - opts.ar * 0.5;
	newB = {
	    i: branches.length,
	    x: end.x,
	    y: end.y,
	    a: b.a + opts.da + daR,
	    l: b.l * opts.dl,
	    d: b.d + 1,
	    parent: b.i
	};
	Tree.generate(opts, branches, newB);
	return branches;
    },
    draw : function(options) {
	options = $.extend(Tree.defaultOptions, options);
	branches = Tree.generate(options, []);
	options.init ? Tree.create(options, branches) : Tree.update(options, branches);
    },
    endPt : function(b) {
	// Return endpoint of branch
	var x = b.x + b.l * Math.sin( b.a );
	var y = b.y - b.l * Math.cos( b.a );
	return {x: x, y: y};
    },
    // D3 functions
    x1 : function(d) { return d.x; },
    y1 : function(d) { return d.y; },
    x2 : function(d) { return Tree.endPt(d).x; },
    y2 : function(d) { return Tree.endPt(d).y; },
    create : function(opts, branches) {
	d3.select('svg')
	    .selectAll('line')
	    .data(branches)
	    .enter()
	    .append('line')
	    .attr('x1', Tree.x1)
	    .attr('y1', Tree.y1)
	    .attr('x2', Tree.x2)
	    .attr('y2', Tree.y2)
	    .style('stroke-width', function(d) {return parseInt(opts.maxDepth + 1 - d.d) + 'px';})
	    .style('stroke', '#53350A')
	    .attr('id', function(d) {return 'id-' + d.i;});
    },
    update : function(opts, branches) {
	d3.select('svg')
	    .selectAll('line')
	    .data(branches)
	    .transition()
	    .attr('x1', Tree.x1)
	    .attr('y1', Tree.y1)
	    .attr('x2', Tree.x2)
	    .attr('y2', Tree.y2);
    }
};
