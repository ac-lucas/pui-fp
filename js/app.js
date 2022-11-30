var width = 960,
    height = 500;

var projection = d3.geoMercator()
    .center([0, 5 ])
    .scale(150)
    .rotate([-180,0]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath()
    .projection(projection);

var g = svg.append("g");

// load and display the World
d3.select("#vis").select(function() {
    return this.appendChild(document.getElementById("people"));

});



var zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', function(event) {
          g.selectAll('path')
           .attr('transform', event.transform);
});

svg.call(zoom);