/* D3 Tree */
/* Copyright 2013 Peter Cook (@prcweb); Licensed MIT */

// Tree configuration
var Tree = {
    defaultOptions : {
	seed : {
            i: 0, x: 250, y: 400, a: 0, l: 70, d:0
        }, // a = angle, l = length, d = depth
	da : 0.5, // Angle delta
	dl : 0.8, // Length delta (factor)
	ar : 0.5, // Randomness
	maxDepth : 10,
	init : true // true: create new tree, false: update
    },
    // Tree creation functions
    generate : function(opts, tree, b) {
	b = (b == undefined) ? opts.seed : b;
	var end = Tree.endPt(b), daR, newB;
	tree.branches.push(b);

        if(b.d > 4) {
            var leaf = {
                x : end.x,
                y : end.y,
                rx : 5,
                ry : 3,
                rotation : 45
            };
            tree.leaves.push(leaf);
        }

	if (b.d === opts.maxDepth)
	    return;

	// Left branch
	daR = opts.ar * Math.random() - opts.ar * 0.5;
	newB = {
	    i: tree.branches.length,
	    x: end.x,
	    y: end.y,
	    a: b.a - opts.da + daR,
	    l: b.l * opts.dl,
	    d: b.d + 1,
	    parent: b.i
	};
	Tree.generate(opts, tree, newB);

	// Right branch
	daR = opts.ar * Math.random() - opts.ar * 0.5;
	newB = {
	    i: tree.branches.length,
	    x: end.x,
	    y: end.y,
	    a: b.a + opts.da + daR,
	    l: b.l * opts.dl,
	    d: b.d + 1,
	    parent: b.i
	};
	Tree.generate(opts, tree, newB);
	return tree;
    },
    draw : function(options) {
	options = $.extend(Tree.defaultOptions, options);
	tree = Tree.generate(options, {branches : [], leaves : []});
	options.init ? Tree.create(options, tree) : Tree.update(options, tree);
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
    rx : function(d) { return d.rx; },
    ry : function(d) { return d.ry; },
    strokeWidth : function(opts) {
        var f = function(d) {
            return parseInt(opts.maxDepth + 1 - d.d) + 'px';
        };
        return f;
    },
    id : function(d) { return 'id-' + d.i; },
    rotation : function(d) {
        return  'rotate(' + d.rotation + ' ' + d.x + ' ' + d.y + ' )';
    },
    create : function(opts, tree) {
	d3.select('svg')
	    .selectAll('line')
	    .data(tree.branches)
	    .enter()
	    .append('line')
	    .attr('x1', Tree.x1)
	    .attr('y1', Tree.y1)
	    .attr('x2', Tree.x2)
	    .attr('y2', Tree.y2)
	    .style('stroke-width', Tree.strokeWidth(opts))
	    .style('stroke', '#53350A')
	    .attr('id', Tree.id);
        d3.select('svg')
            .selectAll('ellipse')
            .data(tree.leaves)
            .enter()
            .append('ellipse')
            .attr('cx', Tree.x1).attr('cy', Tree.y1)
            .attr('rx', Tree.rx).attr('ry', Tree.ry)
            .attr('transform', Tree.rotation)
            .style('stroke', 'rgba(52, 58, 21, 0.1)')
            .attr('fill', 'rgba(206, 228, 97, 0.5)');
    },
    update : function(opts, branches) {
	d3.select('svg')
	    .selectAll('line')
	    .data(tree.branches)
	    .transition()
	    .attr('x1', Tree.x1)
	    .attr('y1', Tree.y1)
	    .attr('x2', Tree.x2)
	    .attr('y2', Tree.y2);
        d3.select('svg')
            .selectAll('ellipse')
            .data(tree.leaves)
            .transition()
            .attr('cx', Tree.x1).attr('cy', Tree.y1)
            .attr('rx', Tree.rx).attr('ry', Tree.ry)
            .attr('transform', Tree.rotation)
            .attr('fill', 'rgba(206, 228, 97, 0.5)');
    }
};
