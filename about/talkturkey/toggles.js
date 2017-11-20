function toggleChats() {
	document.getElementById("buddy-list").style.display = "block";
	document.getElementById("chat-thread").style.display = "none";
	document.getElementById("back-button").style.display = "none";
	document.getElementById("right-title").style.display = "none";
	document.getElementById("left-title").style.display = "none";
	document.getElementById("mobile-left").style.display = "block";
	document.getElementById("login").style.display = "none";
}
function openSublist1(listName) {
	var x = document.getElementsByClassName("togglelist");
	document.getElementById("chatlist").style.display = "block";
	document.getElementById("inboxlist").style.display = "none";
	document.getElementById("trashlist").style.display = "none";
	document.getElementById("nav-chatlist").style.opacity = "1";
	document.getElementById("nav-inboxlist").style.opacity = "0.5";
	document.getElementById("nav-trashlist").style.opacity = "0.5";
	document.getElementById("nav-compose").style.opacity = "0.5";
}
function openSublist2(listName) {
	var x = document.getElementsByClassName("togglelist");
	document.getElementById("chatlist").style.display = "none";
	document.getElementById("inboxlist").style.display = "block";
	document.getElementById("trashlist").style.display = "none";
	document.getElementById("nav-chatlist").style.opacity = "0.5";
	document.getElementById("nav-inboxlist").style.opacity = "1";
	document.getElementById("nav-trashlist").style.opacity = "0.5";
	document.getElementById("nav-compose").style.opacity = "0.5";
}
function openSublist3(listName) {
	var x = document.getElementsByClassName("togglelist");
	document.getElementById("chatlist").style.display = "none";
	document.getElementById("inboxlist").style.display = "none";
	document.getElementById("trashlist").style.display = "block";
	document.getElementById("nav-chatlist").style.opacity = "0.5";
	document.getElementById("nav-inboxlist").style.opacity = "0.5";
	document.getElementById("nav-trashlist").style.opacity = "1";
	document.getElementById("nav-compose").style.opacity = "0.5";
}
