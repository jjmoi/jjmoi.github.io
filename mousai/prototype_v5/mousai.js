$(function() {  
    $("#btn").click(function() {  
        $(".rightpanel").toggleClass("rightpanel-move");
    });
});

$(function() {  
    $("#btn2").click(function() {  
        $(".rightpanel").toggleClass("rightpanel-move");
    });
});

var w = window.innerWidth - 446,
    h = window.innerHeight - 5;

    if (window.innerWidth < 981){
        w = window.innerWidth - 5;
    }

var vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

d3.json("miserables.json", function(json) {
    var force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        .gravity(.05)
        .distance(200)
        .charge(-100)
        .size([w, h])
        .start();

    var link = vis.selectAll("line.link")
        .data(json.links)
        .enter().append("svg:line")
        .attr("class", "link");

    var node = vis.selectAll("g.node")
        .data(json.nodes)
        .enter().append("svg:g")
        .attr("class", "node")
        .call(force.drag);

    force.on("tick", function() {
        link.attr("x1", function(d) {return d.source.x;})
            .attr("y1", function(d) {return d.source.y;})
            .attr("x2", function(d) {return d.target.x;})
            .attr("y2", function(d) {return d.target.y;});

        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });

    node.append("a")
        .attr("xlink:href", function(d) {return "http://www.jjmoi.com/mousai/prototype_v5/" + d.name + ".html";})
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 10)
        .style("fill", "lightsteelblue")
        .style("fill-opacity", 1e-6);
        
    node.append("a")
        .attr("xlink:href", function(d) {return "http://www.jjmoi.com/mousai/prototype_v5/" + d.name + ".html";})
        .append("rect")
        .attr("class", "nodetextbox")
        .attr("x", 10)
        .attr("y", -36)
        .attr("width", 120)
        .attr("height", 24)
        .style("fill", "#222222")
        .style("stroke", "#222222")
        .style("fill-opacity", 1);
        
    node.append("svg:text")
        .attr("class", "nodetext")
        .attr("dx", 16)
        .attr("dy", -18)
        .text(function(d) {return d.name});

    node.append("svg:image")
        .attr("class", "nodecircle")
        .attr("xlink:href", "node.png")
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 16)
        .attr("height", 16);

});

    window.onresize = time;
    
    function time() {
      setTimeout(resize, 400);
    };
    
    function resize() {
      location.reload();
    };