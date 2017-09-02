// source: http://lab.sulko.co/designer-bio

(function(){
	var mundanes = ['Kinda feminist, ', 'Not vegan, ', 'Furniture maker, ', 'Zombie aficionado, ', 'Type designer, ', 'Illustrator, ', 'Dad of 2 dogs, ', 'Creator of stuff, ', 'Flamin’ hot Cheetos connoisseur, ', 'Nature enthusiast, ', 'Civil servant, ', 'Ska band member, ', 'Fiber artist, '];
	var vintages = ['drummer, ', 'ukulelist, ', 'hand letterer, ', 'graffiti writer, ', 'capoeirista, ', 'skateboarder, ', 'Liverpool fan, ', 'DJ, '];
	var pros = ['unicorn. ', 'double-stack designer. ', 'teacher. ', 'experience artist. ', 'visual poet. ', 'enjoys poetry, sunshine, and carbs. '];
	var ops = ['Working on stuff ', 'Designing stuff ', 'Developing stuff ', 'Producing stuff ', 'Building stuff ', 'Crafting stuff ', 'Making stuff '];
	var inters = ['at the intersection of ', 'at the junction of ', 'at the crossroads of ', 'at the sweet spot between ', 'at the nexus of '];
	var beautys = ['beauty and ', 'art and ', 'data and ', 'aesthetics and ', 'elegance and ', 'modernism and ', 'minimalism and ', 'fantasy and ', 'sci-fi and ', 'simplicity and ', 'form and '];
	var funcs = ['function to ', 'purpose to ', 'intellectual purity to ', 'programming to ', 'science to ', 'language to ', 'technology to ', 'design to ', 'mathematics to ', 'sustainability to ', 'magic to ', 'hyperreality to '];
	var exps = [
		'craft delightful human experiences.',
		'create beloved and lasting experience.',
		'create not just a brand, but feelings and emotions.',
		'solving design problems with honest solutions.',
		'craft experiences that are beyond transcendence.',
		'shape an inspiring narrative.',
		'transform understanding and deep connection with the universe.',
		'visualize human experiences both online and IRL.',
		'make the world a better place better than anyone else.'];
	var wilds = [
		
		'Making the world a better place better than any one else.'.link('javascript:window.location.reload(true)'),
		'Turtle is my spirit animal.'.link('javascript:window.location.reload(true)'),
		'Not sorry bro \n Fro teh wit's soul \n & brevity typo'.link('javascript:window.location.reload(true)')
	];

	var mundane = mundanes[Math.floor(Math.random()*mundanes.length)];
	var vintage = vintages[Math.floor(Math.random()*vintages.length)];
	var pro = pros[Math.floor(Math.random()*pros.length)];
	var op = ops[Math.floor(Math.random()*ops.length)];
	var inter = inters[Math.floor(Math.random()*inters.length)];
	var beauty = beautys[Math.floor(Math.random()*beautys.length)];
	var func = funcs[Math.floor(Math.random()*funcs.length)];
	var exp = exps[Math.floor(Math.random()*exps.length)];
	var wild = wilds[Math.floor(Math.random()*wilds.length)];

	// init
	document.getElementById("bio").innerHTML = '<p>' + mundane + vintage + pro + op + inter + beauty + func + exp + '</p>';
	document.getElementById("bio-wild").innerHTML = '<p>' + wild + '</p>';
})();
