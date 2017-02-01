(function(module){

  /*global issues issueView helpers highChart d3:true*/

  let width = 800;
  let height = 800;
  let translateX = 300;
  let translateY = 300;
  let scale;
  let daysAgo = 7;
  let forceStrength = 0.001;

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

    d3Chart.radiusScale = d3.scaleSqrt().domain([1, 50]).range([10, 45]);

  };

  //setting scale property so that circles can be sized according to if issue was created today, <= 7 days ago, or > 7 days ago
  d3Chart.addDataScaleProp = function(data){
    if (data.daysAgo === 'today') return data.scale = scale;
    if (data.daysAgo <= daysAgo) return data.scale = scale / 2;
    if (data.daysAgo > daysAgo) return data.scale = scale / 5;
  };

  d3Chart.makeCirclesRelativeSize = function(data){

    let filteredToday = data.filter((element) => {
      return typeof element.daysAgo !== 'number';
    });

    //if 70 or more issues are older than 7 days, set the scale to 15, else, set the scale to 40

    return filteredToday.length >= data.length * 0.2 ? scale = 20 : scale = 50;

  };



  //make the circles
  d3Chart.makeCircles = function(data){

    d3Chart.makeCirclesRelativeSize(data);

    //simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
    d3Chart.forceXToday = d3.forceX((d) => {
      if(d.daysAgo === 'today') return 1000;
      return 200000;
    }).strength(forceStrength); //strength between 0-1

    d3Chart.forceY = d3.forceY(() => {
      return height / 2;
    }).strength(forceStrength);

    d3Chart.forceCollide = d3.forceCollide((d) => { //d3.forceCollide prevents circles from overlapping
      return d3Chart.radiusScale(d.scale); //anti-collide force is equal to radius of each circle
    });

    d3Chart.simulation = d3.forceSimulation()
    .force('x', d3.forceX(width / 2).strength(forceStrength))
    .force('y', d3.forceY(height / 2).strength(forceStrength)) //height / 2 forces things to middle of page
    .force('collide', d3Chart.forceCollide);

    d3.select('#today').on('click', () => {

      d3Chart.simulation
      .force('x', d3Chart.forceXToday)
      .force('y', d3Chart.forceY)
      .force('collide', d3Chart.forceCollide())
      // .force('center', center)
      .alphaTarget(0.1) // tells bubbles how quickly they should be moving
      .restart(); //restarts the simulation

      d3Chart.simulation.nodes(data)
      .on('tick', _ticked);
      console.log('Today button clicked');
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
    .attr('fill', (d) => `url(#${d.issueUser})`) //makes bg image the user's avatar
    .on('click', (d) => {
      let viewObj = issueView.render('.issue-template', d);
      issueView.appendData('.modal-body', viewObj);
      console.log('what is d?', d);
    });



    //an event where invokes each registered force and essentially causes the bubbles to move around super pretty
    d3Chart.simulation.nodes(data)
    .on('tick', _ticked);


    function _ticked(){
      circles
      .attr('cx', (d) => {
        return d.x;
      })
      .attr('cy', (d) => {
        return d.y;
      });
    }

  };

  d3Chart.removeStuff = function(){
    d3Chart.svg.remove();
  };


})(window);
