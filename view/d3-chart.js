(function(module){

  /*global issues issueView helpers highChart d3:true*/

  let width = 800;
  let height = 1000;
  let translateX = 50;
  let translateY = 30;
  let scale;
  let daysAgo = 7;
  let forceStrength = 0.001;
  let speed = 0.5;
  let random = Math.random() * (70-15) + 15;


  let d3Chart = {};
  module.d3Chart = d3Chart;


  //create the svg area on the DOM
  d3Chart.makeSVG = function (){
    d3Chart.svg = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${translateX}, ${translateY})`);

    d3Chart.defs = d3Chart.svg.append('defs');

    //sets radius of bubbles
    d3Chart.radiusScale = d3.scaleSqrt().domain([1, 50]).range([10, 45]);

  };

  //setting scale property so that circles can be sized according to if issue was created today, <= 7 days ago, or > 7 days ago
  d3Chart.addDataScaleProp = function(data){
    if (data.daysAgo === 'today') return data.scale = scale;
    if (data.daysAgo <= daysAgo) return data.scale = scale / 2;
    if (data.daysAgo > daysAgo) return data.scale = scale / 5;
  };

  //if 20 issues or more were posted today, set the scale to 20 so that max radius for a 'today' circle is 20, else, set the scale to 50. This makes it so that repos with many 'today' issues do not have oversized bubbles that go beyond SVG area and bubbles are relatively scaled per how many 'today' circles exist
  d3Chart.makeCirclesRelativeSize = function(data){
    let filteredToday = data.filter((element) => {
      return typeof element.daysAgo !== 'number';
    });
    return filteredToday.length >= data.length * 0.2 ? scale = 20 : scale = 50;
  };

  //make the circles
  d3Chart.makeCircles = function(data){
    d3Chart.makeCirclesRelativeSize(data);
    d3Chart.forceXToday = d3.forceX((d) => {
      if(d.daysAgo === 'today') return 1000;
      return 200000;
    }).strength(forceStrength); //strength between 0-1

    d3Chart.forceYToday = d3.forceY((d) => {
      if(d.daysAgo === 'today') return 1000;
    }).strength(forceStrength); //strength between 0-1

    d3Chart.forceY = d3.forceY(() => {
      return height / 2;
    }).strength(forceStrength);

    d3Chart.forceX = d3.forceX(() => {
      return width / 2;
    }).strength(forceStrength);

    d3Chart.forceCollide = d3.forceCollide((d) => { //d3.forceCollide prevents circles from overlapping
      return d3Chart.radiusScale(d.scale) + 5; //anti-collide force is equal to radius of each circle
    });

  //simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
    d3Chart.simulation = d3.forceSimulation()
    .force('x', d3Chart.forceX)
    .force('y', d3Chart.forceY) //height / 2 forces things to middle of page
    .force('collide', d3Chart.forceCollide);


    d3.select('#today').on('click', () => {

      d3Chart.simulation
      .force('x', d3Chart.forceXToday)
      .force('y', d3Chart.forceY)
      .force('collide', d3Chart.forceCollide())
      .alphaTarget(speed) // tells bubbles how quickly they should be moving
      .restart(); //restarts the simulation

      d3Chart.simulation.nodes(data)
      .on('tick', _ticked);
    });

    let circles;
    //defs are another tag element that holds the actual circles
    d3Chart.defs.selectAll('.user-pattern')
    .data(data)
    .enter().append('pattern')
    .attr('class', 'user-pattern')
    .attr('id', (d) => d.issueUser)
    .attr('height', '100%')
    .attr('width', '100%')
    .attr('patternContentUnits', 'objectBoundingBox')
    .append('image')
    .attr('height', 1)
    .attr('width', 1)
    .attr('preserveAspectRatio', 'none')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('xlink:href', (d) => d.issueUserAvatarURL);

    //circles get created and appended
    circles = d3Chart.svg.selectAll('.issue')
    .data(data)
    .enter().append('circle')
    .attr('class', 'issue')
    .attr('r', (d) => {
      d3Chart.addDataScaleProp(d);
      return d3Chart.radiusScale(d.scale);
    })
    .attr('data-toggle', 'modal')
    .attr('data-target', '#long-modal')
    // .attr('transform', (d) =>  `translate(${d.x}, ${d.y})`)
    .attr('fill', (d) => `url(#${d.issueUser})`)//makes bg image the user's avatar
    .on('click', (d) => {
      console.log(`${d.x} and ${d.y}`);
      let viewObj = issueView.render('.issue-template', d);
      $('.modal-body').empty();
      issueView.appendData('.modal-body', viewObj);
      console.log('what is d?', d);
    });



    //an event where invokes each registered force and essentially causes the bubbles to move around super pretty
    d3Chart.simulation.nodes(data)
    .on('tick', _ticked);


    function _ticked(){
      circles
      .attr('cx', (d) => {
        return d.x = Math.max(random, Math.min(width - 100, d.x));
      })
      .attr('cy', (d) => {
        return d.y = Math.max(random, Math.min(height - 15, d.y));
      });
    }

  };

})(window);
