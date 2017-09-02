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
		'My opinions belong to the void.'.link('javascript:window.location.reload(true)'),
		'All are equal.'.link('javascript:window.location.reload(true)'),
		'World Peace.'.link('javascript:window.location.reload(true)'),
		'Spacing, Kerning, Typesetting.'.link('javascript:window.location.reload(true)'),
		'I enjoy doing things that demand patience and precision.'.link('javascript:window.location.reload(true)'),
		'It’s okay to be happy, even in your imperfections and failures because that’s what makes you human. And being human is messy and beautiful.'.link('javascript:window.location.reload(true)'),
		'I want you to know that happiness is okay, even when the world is aching. Because what the world desperately needs is positivity, and it starts with a smile.'.link('javascript:window.location.reload(true)'),
		'Deadline is the source of my inspiration.'.link('javascript:window.location.reload(true)'),
		'Opinions belong to my dogs.'.link('javascript:window.location.reload(true)'),
		'Imagining mermaids since 1984.'.link('javascript:window.location.reload(true)'),
		'Less is less, more is more. Not less not more is not more not less.'.link('javascript:window.location.reload(true)'),
		'Furniture designer turned Unicorn and I create my own typefaces.'.link('javascript:window.location.reload(true)'),
		'I am 6 years old.'.link('javascript:window.location.reload(true)'),
		'I need a coffee.'.link('javascript:window.location.reload(true)'),
		'Let’s get coffee?'.link('javascript:window.location.reload(true)'),
		'Coffee?'.link('javascript:window.location.reload(true)'),
		'I am.'.link('javascript:window.location.reload(true)'),
		'Lorem Ipsum.'.link('javascript:window.location.reload(true)'),
		'Aluminium.'.link('javascript:window.location.reload(true)'),
		'I study master’s degrees as a hobby.'.link('javascript:window.location.reload(true)'),
		'If you don’t like graffiti you’re not looking at the big picture'.link('javascript:window.location.reload(true)'),
		'We can do better.'.link('javascript:window.location.reload(true)'),
		'Profoundly.'.link('javascript:window.location.reload(true)'),
		'Pure.'.link('javascript:window.location.reload(true)'),
		'Pure passion.'.link('javascript:window.location.reload(true)'),
		'I love sushi.'.link('javascript:window.location.reload(true)'),
		'Party, Sleep, Repeat.'.link('javascript:window.location.reload(true)'),
		'Love is worth everything. Everything.'.link('javascript:window.location.reload(true)'),
		'The secret to creativity is knowing how to hide your sources.'.link('javascript:window.location.reload(true)'),
		'I want you to know that it is okay to suck at something.'.link('javascript:window.location.reload(true)'),
		'Time is irrelevant.'.link('javascript:window.location.reload(true)'),
		'Making the world a better place better than any one else.'.link('javascript:window.location.reload(true)'),
		'Turtle is my spirit animal.'.link('javascript:window.location.reload(true)'),
		'Not sorry bro \n Fro teh wit's soul \n & brevity typo'.link('javascript:window.location.reload(true)'),
		'Enter the Void.'.link('javascript:window.location.reload(true)'),
		'Lefty, Colorblind'.link('javascript:window.location.reload(true)'),
		'Don’t try to be original. Just try to be nice.'.link('javascript:window.location.reload(true)'),
		'Not minimalist. Purist.'.link('javascript:window.location.reload(true)'),
		'Simplicity.'.link('javascript:window.location.reload(true)'),
		'Left-handed.'.link('javascript:window.location.reload(true)'),
		'Humanity.'.link('javascript:window.location.reload(true)'),
		'Polymath.'.link('javascript:window.location.reload(true)'),
		'Generate.'.link('javascript:window.location.reload(true)'),
		'Charrette.'.link('javascript:window.location.reload(true)'),
		'Reload.'.link('javascript:window.location.reload(true)'),
		'INFP'.link('javascript:window.location.reload(true)'),
		'White space.'.link('javascript:window.location.reload(true)'),
		'Composition.'.link('javascript:window.location.reload(true)'),
		'Refresh.'.link('javascript:window.location.reload(true)'),
		'Process.'.link('javascript:window.location.reload(true)'),
		'Disrupt.'.link('javascript:window.location.reload(true)'),
		'Ephemeral.'.link('javascript:window.location.reload(true)'),
		'Frankenstein.'.link('javascript:window.location.reload(true)'),
		'FTUX.'.link('javascript:window.location.reload(true)'),
		'Insight.'.link('javascript:window.location.reload(true)'),
		'Magic.'.link('javascript:window.location.reload(true)'),
		'Dank.'.link('javascript:window.location.reload(true)'),
		'Synergize.'.link('javascript:window.location.reload(true)'),
		'Pizza.'.link('javascript:window.location.reload(true)'),
		'Sushi.'.link('javascript:window.location.reload(true)'),
		'Beer me.'.link('javascript:window.location.reload(true)'),
		'Kale.'.link('javascript:window.location.reload(true)'),
		'Next.'.link('javascript:window.location.reload(true)'),
		'Kombucha.'.link('javascript:window.location.reload(true)'),
		'Sriracha.'.link('javascript:window.location.reload(true)'),
		'Helvetica.'.link('javascript:window.location.reload(true)'),
		'Restart.'.link('javascript:window.location.reload(true)'),
		'Continue.'.link('javascript:window.location.reload(true)'),
		'More.'.link('javascript:window.location.reload(true)'),
		'Advance.'.link('javascript:window.location.reload(true)'),
		'Optimize.'.link('javascript:window.location.reload(true)'),
		'Random.'.link('javascript:window.location.reload(true)'),
		'Randomize.'.link('javascript:window.location.reload(true)'),
		'Randomization.'.link('javascript:window.location.reload(true)'),
		'Peace.'.link('javascript:window.location.reload(true)'),
		'Love.'.link('javascript:window.location.reload(true)'),
		'Cool.'.link('javascript:window.location.reload(true)'),
		'Rad.'.link('javascript:window.location.reload(true)'),
		':)'.link('javascript:window.location.reload(true)'),
		'Let’s chat 💬'.link('javascript:window.location.reload(true)'),
		'Okay, bye ☃️'.link('javascript:window.location.reload(true)'),
		'❌⭕️❌⭕️'.link('javascript:window.location.reload(true)'),
		'❤️'.link('javascript:window.location.reload(true)'),
		'💩'.link('javascript:window.location.reload(true)'),
		'😘'.link('javascript:window.location.reload(true)'),
		'🌝'.link('javascript:window.location.reload(true)'),
		'☕️'.link('javascript:window.location.reload(true)'),
		'🍺'.link('javascript:window.location.reload(true)'),
		'👀'.link('javascript:window.location.reload(true)'),
		'🎈'.link('javascript:window.location.reload(true)'),
		'👾'.link('javascript:window.location.reload(true)'),
		'🌈'.link('javascript:window.location.reload(true)'),
		'🔥'.link('javascript:window.location.reload(true)'),
		'🥑'.link('javascript:window.location.reload(true)'),
		'🌮'.link('javascript:window.location.reload(true)'),
		'🙏'.link('javascript:window.location.reload(true)'),
		'🕶'.link('javascript:window.location.reload(true)'),
		'💋'.link('javascript:window.location.reload(true)'),
		'👻'.link('javascript:window.location.reload(true)'),
		'💯'.link('javascript:window.location.reload(true)'),
		'🍆'.link('javascript:window.location.reload(true)'),
		'🐢'.link('javascript:window.location.reload(true)'),
		'🌵'.link('javascript:window.location.reload(true)'),
		'🍕'.link('javascript:window.location.reload(true)'),
		'🚀'.link('javascript:window.location.reload(true)'),
		'🐳'.link('javascript:window.location.reload(true)')
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
