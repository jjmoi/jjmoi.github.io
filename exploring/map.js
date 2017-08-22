'use strict';

var w = window.innerWidth;
var h = window.innerHeight;

// var mapUrl = 'https://gist.githubusercontent.com/thepeted/60242378d8c825281ea695c572ab4d51/raw/00685152c5cb34093aabc22b2c06e3df052cc981/world110m.json';
// var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

var mapUrl = 'map.json';
var dataUrl = 'tripz.json';

var svg = d3.select('body').append('svg').attr('width', w).attr('height', h);

window.addEventListener('resize', function () {
	d3.select('svg').attr('width', window.innerWidth).attr('height', window.innerHeight);
});

// define the projection settings
var projection = d3.geo.mercator().scale(w / 6).translate([w / 2, h / 2]).center([0, 40]);

// load topology data
d3.json(mapUrl, function (topo) {
	// append topo data to svg as a group, path positions are calculated by projection function
	console.log(topo);
	var worldMap = svg.append('g');

	worldMap.append("path").datum(topojson.feature(topo, topo.objects.countries)).attr('class', 'land').attr("d", d3.geo.path().projection(projection));

	// define and activate zoom behaviour
	var zoom = d3.behavior.zoom().size([h, w]).scaleExtent([0.9, 5]).on('zoom', function () {
		worldMap.attr('transform', 'translate(' + d3.event.translate.join(',') + ') scale(' + d3.event.scale + ')');
	});
	svg.call(zoom);

	// load meteorite and create strike data
	d3.json(dataUrl, function (response) {
		// remove records without any geometry data
		var dataset = response.features.filter(function (e) {
			return e.geometry;
		});
		// scale of bubbles from 4px - 32px
		var massScale = d3.scale.pow().exponent(0.8).domain([1, d3.max(dataset.map(function (e) {
			return +e.properties.mass;
		}))]).rangeRound([4, 32]);

		var strikes = worldMap.selectAll('circle').data(dataset).enter().append('circle').attr('class', 'strike').attr('cx', function (d) {
			return projection(d.geometry.coordinates)[0];
		}).attr('cy', function (d) {
			return projection(d.geometry.coordinates)[1];
		})
		// set intial radius to 0 (transition to mass radius defined below)
		.attr('r', 0)
		// reorder shapes with highest mass first so we can access
		// all overlapping circles on hover
		.sort(function (a, b) {
			return b.properties.mass - a.properties.mass;
		});

		// set delay at the start of the animation
		var strikeDates = dataset.map(function (d) {
			return new Date(d.properties.year);
		});
		var animateStrikeDelay = d3.time.scale()
		// manual tweak of min date to avoid data outliers
		.domain([new Date(1980, 0), d3.max(strikeDates)]).range([0, 2000]).clamp(true);

		// dyncamically delay the animation
		strikes.transition().delay(function (d) {
			return animateStrikeDelay(new Date(d.properties.year));
		})
		// duration of the animation
		.duration(1000).attr('r', function (d) {
			return massScale(d.properties.mass);
		});

		// tooltip behaviour
		worldMap.selectAll('circle').on('mouseover', function (d) {
			var _d3$mouse = d3.mouse(document.body);

			var x = _d3$mouse[0];
			var y = _d3$mouse[1];

			// populate tootip with data

			d3.select('#name').text(d.properties.name);
			d3.select('#class').text(d.properties.recclass);
			d3.select('#mass').text(d.properties.mass);
			d3.select('#lat').text(d.properties.reclat);
			d3.select('#lon').text(d.properties.reclong);
			d3.select('#year').text(d.properties.year.split('-', 1));

			// show tooltip
			d3.select('.tooltip').classed('hidden', false).style('left', x + 10 + 'px').style('top', y + 10 + 'px');
		});
		// hide tooltip	
		worldMap.selectAll('circle').on('mouseout', function (d) {
			d3.select('.tooltip').classed('hidden', true);
		});
	});
});
