// // load and display the people
// var svg = d3.select("#vis").select(function() {
//     return this.appendChild(document.getElementById("people"));

// });

// var zoom = d3.zoom()
//       .scaleExtent([1, 8])
//       .on('zoom', function(event) {
//         console.log("hi")
//           d3.select('svg')
//            .attr('transform', event.transform);
// });

// svg.call(zoom);

let data = [], width = 600, height = 400;

let zoom = d3.zoom()
	.on('zoom', handleZoom);

function handleZoom(e) {
	d3.selectAll('svg g')
		.attr('transform', e.transform);
}

function initZoom() {
	d3.select('div')
		.call(zoom);
}

  Promise.all([
    d3.xml('assets/people.svg'),
    d3.xml('assets/paris.svg')
  ]).then(data => {
    d3.select("#people-container").node().append(data[0].documentElement);
    d3.select("#paris-container").node().append(data[1].documentElement);
  });

initZoom();
