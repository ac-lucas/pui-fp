var margin = { 
  top: window.innerHeight * 0.3, 
  left: 50, 
  bottom: window.innerHeight * 0.4, 
  right: 50 
}; 

// The chart *and* screen height
var height = window.innerHeight - margin.top - margin.bottom;
var chartWidth = 10000;
var screenWidth = window.innerWidth - margin.left - margin.right;

const minZoom = .99

var x = .99

var change = false;



let data = []

var xScale = d3.scaleLinear()
.domain([0, screenWidth])
.range([0, chartWidth]);

let zoom = d3.zoom()
  .scaleExtent([minZoom,1.5])
  .translateExtent([[0, 0], [0,0]])
  .extent([[0, 0], [0,0]])
	.on('zoom', handleZoom)


var vector = d3.selectAll('.vectors').call(zoom)


function handleZoom({transform}) {
  // transform.x = screenWidth;
  // transform.y = height / 2;

  //var xScaleNew = transform.rescaleX(xScale);

	d3.selectAll('svg g')
		.attr('transform', transform)


  k = transform.k;

  k = handleSizeChange(k, x);
    //.attr('cx', function(d) { return xScaleNew(d.distance); })
    //.attr('r', function(d) { return d.scaledRadius * transform.k; });
}

function initZoom() {
  //zoom.transform(selection, transform[, point]);
  // var initialTransform = d3.zoomIdentity.scale(20);
  // vector.call(zoom.transform, initialTransform);

  // var zoomOutTransform = d3.zoomIdentity.translate(0, 0).scale(minZoom);
    
  // vector
  //     .transition()
  //       .duration(5000)
  //       .call(zoom.transform, zoomOutTransform)
  //       .on('end', zoomToNormal)

  //       function zoomToNormal() {

  //         vector
  //           .transition()
  //             .duration(3000)
  //             .ease(d3.easeQuadInOut)
  //             .call(zoom.transform, d3.zoomIdentity)

	vector
    .on("dblclick.zoom", null)
    // .attr('transform', 'translate(300,300)')
}


zoom.scaleTo(vector, .001)


function handleSizeChange(k, x) {
    var people = document.querySelector("#people-container");
    var town = document.querySelector("#town-container");
    var paris = document.querySelector("#paris-container");
    var globe = document.querySelector("#globe-container");


    if (x != k) {
      x = k;
      change = true
    }
  
    console.log(k, x, change)

  if (k == .99 && change) {
    if (!people.classList.contains("hidden1")) {
      people.classList.add("hidden1")
      town.classList.remove("hidden2")
      change = false;
      return 1.5
    }
    else if (!town.classList.contains("hidden2")) {
      town.classList.add("hidden2")
      paris.classList.remove("hidden3")
      change = false;
      return 1.5
    }
    else if (!paris.classList.contains("hidden3")) {
      paris.classList.add("hidden3")
      globe.classList.remove('hidden4')
      change = false;
      return 1.5
    }
  }
  if (k == 1.5 && change) {
    if (!globe.classList.contains("hidden4")) {
      globe.classList.add("hidden4")
      paris.classList.remove("hidden3")
      change = false;
      return .99
    }
    else if (!paris.classList.contains("hidden3")) {
      paris.classList.add("hidden3")
      town.classList.remove("hidden2")
      change = false;
      return .99
    }
    else if (!town.classList.contains("hidden2")) {
      town.classList.add("hidden2")
      people.classList.remove("hidden1")
      change = false;
      return .99
    }
  }
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
