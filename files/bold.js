$(document).ready(function(){
	var styles = ['light', 'normal', 'bold', 'blacxxx'];
	$("span").each(function(){
		$(this).toggleClass(styles[~~(Math.random()*styles.length)]);
	});
});
function freestylin(){
	var styles2 = ['light', 'normal', 'bold', 'blacxxx'];
	$("span").each(function(){
		$(this).toggleClass(styles2[~~(Math.random()*styles2.length)]);
	});
}