// references:
// https://www.d3indepth.com/zoom-and-pan/





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

  console.log(k)
  handleSizeChange(k, x, transform);

    //.attr('cx', function(d) { return xScaleNew(d.distance); })
    //.attr('r', function(d) { return d.scaledRadius * transform.k; });
}

function initZoom() {
  //zoom.transform(selection, transform[, point]);
  var initialTransform = d3.zoomIdentity.scale(20);
  vector.call(zoom.transform, initialTransform);

  initialAnimation()
  
	vector
    .on("dblclick.zoom", null)
    // .attr('transform', 'translate(300,300)')
}



function handleSizeChange(k, x) {
    var peopleWeb = document.querySelector("#people-container");
    var townWeb = document.querySelector("#town-container");
    var parisWeb = document.querySelector("#paris-container");
    var globeWeb = document.querySelector("#globe-container");
    var peopleMobile = document.querySelector("#people-container-mobile");
    var townMobile = document.querySelector("#town-container-mobile");
    var parisMobile = document.querySelector("#paris-container-mobile");
    var globeMobile = document.querySelector("#globe-container-mobile");



    if (x != k) {
      x = k;
      change = true
    }

  if (k == .99 && change) {
    if (!peopleWeb.classList.contains("hidden1") && !peopleMobile.classList.contains("hidden1")) {
      peopleWeb.classList.add("hidden1")
      peopleMobile.classList.add("hidden1")
      townWeb.classList.remove("hidden2")
      townMobile.classList.remove("hidden2")
      change = false;
      //return 1.5
    }
    else if (!townWeb.classList.contains("hidden2") && !townMobile.classList.contains("hidden2")) {
      townWeb.classList.add("hidden2")
      townMobile.classList.add("hidden2")
      parisWeb.classList.remove("hidden3")
      parisMobile.classList.remove("hidden3")
      change = false;
      //return 1.5
    }
    else if (!parisWeb.classList.contains("hidden3") && !parisMobile.classList.contains("hidden3")) {
      parisWeb.classList.add("hidden3")
      parisMobile.classList.add("hidden3")
      globeWeb.classList.remove('hidden4')
      globeMobile.classList.remove('hidden4')
      change = false;
      //return 1.5
    }
  }
  if (k == 1.5 && change) {
    if (!globeWeb.classList.contains("hidden4") && !globeMobile.classList.contains("hidden4")) {
      globeWeb.classList.add("hidden4")
      globeMobile.classList.add("hidden4")
      parisWeb.classList.remove("hidden3")
      parisMobile.classList.remove("hidden3")
      change = false;
      //return .99
    }
    else if (!parisWeb.classList.contains("hidden3") && !parisMobile.classList.contains("hidden3")) {
      parisWeb.classList.add("hidden3")
      parisMobile.classList.add("hidden3")
      townWeb.classList.remove("hidden2")
      townMobile.classList.remove("hidden2")
      change = false;
      // return .99
    }
    else if (!townWeb.classList.contains("hidden2") && !townMobile.classList.contains("hidden2")) {
      townWeb.classList.add("hidden2")
      townMobile.classList.add("hidden2")
      peopleWeb.classList.remove("hidden1")
      peopleMobile.classList.remove("hidden1")
      change = false;
      // return .99
    }
  }
}

function initialAnimation () {


  d3.selectAll('.vectors').call(zoom.transform,
    d3.zoomIdentity
      .translate(0, 0)
      .scale(2)
  )
}



  Promise.all([
    d3.xml('assets/people.svg'),
    d3.xml('assets/towns.svg'),
    d3.xml('assets/paris.svg'),
    d3.xml('assets/people-mobile.svg'),
    d3.xml('assets/town-mobile.svg'),
    d3.xml('assets/paris-mobile.svg')
    
  ]).then(data => {
    d3.select("#people-container").node().append(data[0].documentElement);
    d3.select("#town-container").node().append(data[1].documentElement);
    d3.select("#paris-container").node().append(data[2].documentElement);
    d3.select("#people-container-mobile").node().append(data[3].documentElement);
    d3.select("#town-container-mobile").node().append(data[4].documentElement);
    d3.select("#paris-container-mobile").node().append(data[5].documentElement)
  });






initZoom();
