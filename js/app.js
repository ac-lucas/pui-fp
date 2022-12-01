

let data = [], width = window.innerHeight, height = window.innerWidth;

let zoom = d3.zoom()
  .scaleExtent([.99,1.5])
  .translateExtent([[0, 0], [0,0]])
  .extent([[0, 0], [0,0]])
	.on('zoom', handleZoom)


function handleZoom(e) {
	d3.selectAll('svg g')
		.attr('transform', e.transform)
}

function initZoom() {
	d3.selectAll('.vectors')
		.call(zoom)
}

  Promise.all([
    d3.xml('assets/people.svg'),
    d3.xml('assets/towns.svg'),
    d3.xml('assets/paris.svg'),
    
  ]).then(data => {
    d3.select("#people-container").node().append(data[0].documentElement);
    d3.select("#town-container").node().append(data[1].documentElement);
    d3.select("#paris-container").node().append(data[2].documentElement);
  });

initZoom();
