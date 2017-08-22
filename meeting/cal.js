//parallax
$(document).ready(function () {
	//var plane = document.getElementById('element1');
	var rocket = document.getElementById('element2');
	var knife = document.getElementById('element3');
	var love = document.getElementById('element4');
	var cat = document.getElementById('element5');
	
	//plane.homePos = { x: plane.offsetLeft, y: plane.offsetTop };
	rocket.homePos = { x: rocket.offsetLeft, y: rocket.offsetTop + "px" };
	knife.homePos = { x: knife.offsetLeft, y: knife.offsetTop + "px" };
	love.homePos = { x: love.offsetLeft, y: love.offsetTop + "px" };
	cat.homePos = { x: cat.offsetLeft, y: cat.offsetTop + "px" };
	
	$('#wrapper').mousemove(function (e) {
		//parallax(e, plane, 5);
		parallax(e, rocket, 30);
		parallax(e, knife, 15);
		parallax(e, love, 10);
		parallax(e, cat, 5);

	});
});

function parallax(e, target, layer) {
	var x = target.homePos.x - (e.pageX - target.homePos.x) / layer;
	var y = target.homePos.y - (e.pageY - target.homePos.y) / layer;
	$(target).offset({ top: y ,left : x });
};

//full date
var today = new Date();
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";
//day
var d = weekday[today.getDay()];
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

//var yesterday = new Date();
//yesterday.setDate(yesterday.getDate() - 1);
//var dyesterday = weekday[yesterday.getDay()];
//var myesterday = month[yesterday.getMonth()];
//var ddyesterday = yesterday.getDate();
//yesterday = dyesterday+' '+myesterday+' '+ddyesterday;
//document.getElementById("yesterday-date").innerHTML = (yesterday);

var m = month[today.getMonth()];
var dd = today.getDate();
today = d+' '+m+' '+dd;
document.getElementById("today-date").innerHTML = (today);

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var dtomorrow = weekday[tomorrow.getDay()];
var mtomorrow = month[tomorrow.getMonth()];
var ddtomorrow = tomorrow.getDate();
tomorrow = dtomorrow+' '+mtomorrow+' '+ddtomorrow;
document.getElementById("tomorrow-date").innerHTML = (tomorrow);

var dayafter = new Date();
dayafter.setDate(dayafter.getDate() + 2);
var ddayafter = weekday[dayafter.getDay()];
var mdayafter = month[dayafter.getMonth()];
var dddayafter = dayafter.getDate();
dayafter = ddayafter+' '+mdayafter+' '+dddayafter;
document.getElementById("dayafter-date").innerHTML = (dayafter);

var dayafterday = new Date();
dayafterday.setDate(dayafterday.getDate() + 3);
var ddayafterday = weekday[dayafterday.getDay()];
var mdayafterday = month[dayafterday.getMonth()];
var dddayafterday = dayafterday.getDate();
dayafterday = ddayafterday+' '+mdayafterday+' '+dddayafterday;
document.getElementById("dayafterday-date").innerHTML = (dayafterday);
