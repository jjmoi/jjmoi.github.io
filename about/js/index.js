var h = $(document).innerHeight();
var IssueNum = + 1;	

function SortTable() {
	$('.cards').each(function(i) {
		$(".TableNum" + i).sortable({
			connectWith: ".cards",
			opacity: 0.8,
			update: function() {
				CountingIssues();
			}
		});
		$(".TableNum" + i).disableSelection();
	});
}

function CountingIssues(){
	$('.cards').each(function() {
		var CheckNum =	$(this).find('li').size();
		$(this).prev('h3').find('span').html(CheckNum+"&nbsp;");
	});
}

function SetCard() {
	$('.cards').each(function(i) {
		$(this).addClass('TableNum' + i);
		$(this).find('li').addClass("ui-state-default");
		$(this).height(h);
	});
}

CountingIssues();
SetCard();
SortTable();
