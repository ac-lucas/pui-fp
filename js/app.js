// references:
// https://www.d3indepth.com/zoom-and-pan/
// https://stackoverflow.com/questions/55942922/how-to-freeze-browser-window-intentionally-like-alert-confirm-and-prompt-does





let margin = {
  top: window.innerHeight * 0.3,
  left: 50,
  bottom: window.innerHeight * 0.4,
  right: 50
};

// The chart *and* screen height
let height = window.innerHeight - margin.top - margin.bottom;
let chartWidth = 10000;
let screenWidth = window.innerWidth - margin.left - margin.right;

const minZoom = .99

let x = .99

let change = false;

let data = []

let oldK = 0;

let postHighSchoolFlag = false;

let populationNum = 4500;



let xScale = d3.scaleLinear()
  .domain([0, screenWidth])
  .range([0, chartWidth]);

let zoom = d3.zoom()
  .scaleExtent([minZoom, 1.5])
  .translateExtent([[0, 0], [0, 0]])
  .extent([[0, 0], [0, 0]])
  .on('zoom', handleZoom)


let vector = d3.selectAll('.vectors').call(zoom)

let peopleWeb = document.querySelector("#people-container");
let townWeb = document.querySelector("#town-container");
let parisWeb = document.querySelector("#paris-container");
let globeWeb = document.querySelector("#globe-container");
let peopleMobile = document.querySelector("#people-container-mobile");
let townMobile = document.querySelector("#town-container-mobile");
let parisMobile = document.querySelector("#paris-container-mobile");
let globeMobile = document.querySelector("#globe-container-mobile");



function handleZoom({ transform }) {

  d3.selectAll('svg g')
    .attr('transform', transform)


  k = transform.k;

  console.log(k)
  handleSizeChange(k, x);
  handleFreezing(k);
  showPopulation();

}

function initZoom() {
  let initialTransform = d3.zoomIdentity.scale(20);
  vector.call(zoom.transform, initialTransform);

  vector
    .on("dblclick.zoom", null)
}



function handleSizeChange(k, x) {

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
      populationNum = 8000000000
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

function handleFreezing(k) {
  let newK = k;
  console.log(k, oldK)

  if (k == 1.5) {
    newK = 1.5
    oldK = 1.5
  }

  else if (1.4 >= k && k >= 1.49 && oldK != 1.45) {
    newK = 1.45
    oldK = 1.45
  }

  else if (1.4 >= k && k >= 1.3 && oldK != 1.35) {
    newK = 1.35
    oldK = 1.35
  }

  else if (1.2 >= k && k >= 1.1 && oldK != 1.15) {
    newK = 1.15
    oldK = 1.15

  }

  else if (k < 1) {
    newK = .99
    oldK = .99
  }

  if (!peopleWeb.classList.contains("hidden1") && !peopleMobile.classList.contains("hidden1")) {
    if (newK == 1.5) {
      postHighSchoolFlag = false;
      populationNum = 4
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display1").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else if (newK == 1.35) {
      postHighSchoolFlag = false;
      populationNum = 50
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display2").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else if (newK == 1.15) {
      populationNum = 4500
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display3").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
      postHighSchoolFlag = true;
    }
    else if (newK == .99) {
      populationNum = 11000
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display4").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else {
      removeAllText();
    }
  }


  else if (!townWeb.classList.contains("hidden2") && !townMobile.classList.contains("hidden2")) {
    if (newK == 1.45) {
      populationNum = 550000
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display5").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else if (newK == 1.15) {
      populationNum = 1620000
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display6").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")

    }
    else if (newK == .99) {
      populationNum = 2100000
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display7").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else {
      removeAllText();
    }
  }


  else if (!parisWeb.classList.contains("hidden3") && !parisMobile.classList.contains("hidden3")) {
    if (newK == 1.45) {
      populationNum = 37000000
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display8").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else if (newK == 1.35) {
      populationNum = 592000000
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display9").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else if (newK == 1.15) {
      populationNum = 1450000000
      document.querySelector(".pageCover").classList.add("freeze")
      document.querySelector(".display10").classList.remove("hideText")
      setTimeout(() => {
        document.querySelector(".pageCover").classList.remove("freeze")
      }, "2000")
    }
    else {
      removeAllText();
    }
  }
}

function showPopulation() {
  if (postHighSchoolFlag) {
    document.querySelector(".populationCounter").classList.remove("hideText");
    document.querySelector(".populationCounterLabel").classList.remove("hideText");
    document.querySelector(".populationCounter").innerHTML = populationNum;
  }
  else {
    document.querySelector(".populationCounter").classList.add("hideText");
    document.querySelector(".populationCounterLabel").classList.add("hideText");
  }
}

function removeAllText() {
  document.querySelector(".display1").classList.add("hideText")
  document.querySelector(".display2").classList.add("hideText")
  document.querySelector(".display3").classList.add("hideText")
  document.querySelector(".display4").classList.add("hideText")
  document.querySelector(".display5").classList.add("hideText")
  document.querySelector(".display6").classList.add("hideText")
  document.querySelector(".display7").classList.add("hideText")
  document.querySelector(".display8").classList.add("hideText")
  document.querySelector(".display9").classList.add("hideText")
  document.querySelector(".display10").classList.add("hideText")
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
