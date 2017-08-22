$(window).load(function() {
		var lineChartData = {
			labels: ["11/8","12/8","13/8","14/8","15/8","16/8","17/8"],
			datasets: [
				{
					fillColor: "rgba(29,182,135,0.4)",
					strokeColor: "rgba(29,182,135,1)",
					pointColor: "rgba(29,182,135,1)",
					pointStrokeColor: "#fff",
					data: [520,700,1000,1120,1590,1790,2130]
				},
				{
					fillColor: "rgba(180,180,180,0.6)",
					strokeColor: "rgba(180,180,180,1)",
					pointColor: "rgba(180,180,180,1)",
					pointStrokeColor: "#fff",
					data: [220,180,300,120,470,200,340]
				}
			]
		};

		var doughnutChartData = [
		  {
		  		value: 35,
		  		color: "#F7464A"
		  },
		  {
		  		value: 65,
		  		color: "#B4B4B4"
		  }
		];
			
		var globalGraphSettings = {
		  //global
		  animation : Modernizr.canvas,
		  
		  //doughnut

		  //Boolean - Whether we should show a stroke on each segment
		  segmentShowStroke : false,

		  //String - The colour of each segment stroke
		  segmentStrokeColor : "#3C4143",

		  //Number - The width of each segment stroke
		  segmentStrokeWidth : 0,

		  //The percentage of the chart that we cut out of the middle.
		  percentageInnerCutout : 85,

		  //Boolean - Whether we should animate the chart	
		  animation : true,

		  //Number - Amount of animation steps
		  animationSteps : 100,

		  //String - Animation easing effect
		  animationEasing : "easeOutBounce",

		  //Boolean - Whether we animate the rotation of the Doughnut
		  animateRotate : true,

		  //Boolean - Whether we animate scaling the Doughnut from the centre
		  animateScale : false,

		  //Function - Will fire on animation completion.
		  onAnimationComplete : null
		}

		setIntroChart1();
		setIntroChart2();
		
		function setIntroChart1(){		
		  var ctx = document.getElementById("introChart").getContext("2d");
		  new Chart(ctx).Line(lineChartData,{animation: Modernizr.canvas, scaleLineColor : "rgba(255,255,255,0)", scaleShowLabels : false, scaleShowGridLines : false, scaleFontColor : "#AAA", scaleFontSize : 11, pointDot : false, datasetFill : true});
		};
		
		function setIntroChart2(){
		  var ctx = document.getElementById("doughnutChart").getContext("2d");
		  new Chart(ctx).Doughnut(doughnutChartData,globalGraphSettings);
		};
		
		var graphInitDelay = 300;
		
		//Set up each of the inview events here.
		$("#lineChart").on("inview",function(){
		  var $this = $(this);
		  setTimeout(showLineChart,graphInitDelay);
		});
		$("#doughnutChart").on("inview",function(){
		  var $this = $(this);
		  setTimeout(showDoughnutChart,graphInitDelay);			
		});

});