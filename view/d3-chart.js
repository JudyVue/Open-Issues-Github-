(function(module){

  /*global issues issueView helpers highChart d3:true*/

  let width = 600;
  let height = 800;
  let translateX = 300;
  let translateY = 300;
  let scale = 30;
  let forceStrength = 0.001;

  let d3Chart = {};
  module.d3Chart = d3Chart;


  let svg;
  //create the svg area on the DOM
  d3Chart.makeSVG = function (){
    d3Chart.svg = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', `translate(${translateX}, ${translateY})`);

    d3Chart.defs = d3Chart.svg.append('defs');
    d3Chart.radiusScale = d3.scaleSqrt().domain([1, 50]).range([10, 50]);

  };

  // let defs;
  // defs = svg.append('defs');

  //scale the circles according to an arbitrarily set scale I set to the number of days the issue was created

  //simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
  d3Chart.simulation = d3.forceSimulation()
  .force('x', d3.forceX(width / 2).strength(forceStrength)) //strength between 0-1
  .force('y', d3.forceY(height / 2).strength(forceStrength))
  .force('collide', d3.forceCollide((d) => {
    return d3Chart.radiusScale(d.scale);
  }));

  d3Chart.simulation.nodes;


  //setting scale property so that circles can be sized according to if issue was created today, > 7 days ago, or > 7 days ago
  d3Chart.addDataScaleProp = function(data){
    if (data.daysAgo === 'today') return data.scale = scale;
    if (data.daysAgo <= 7) return data.scale = scale / 2;
    if (data.daysAgo > 7) return data.scale = scale / 5;
  };


  //make the circles
  d3Chart.makeCircles = function(data){


    console.log('what is this?', data[0].repoOwner);


    let circles;
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

    circles = d3Chart.svg.selectAll('.issue')
    .data(data)
    .enter().append('circle')
    .attr('class', 'issue')
    .attr('r', (d) => {
      d3Chart.addDataScaleProp(d);
      return d3Chart.radiusScale(d.scale);
    })
    .attr('fill', (d) => `url(#${d.issueUser})`)
    .on('click', (d) => {
      console.log('what is d?', d);
    });

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

  let form = $('form');


  d3Chart.updateData = function(data){
    form.submit((e) => {
      console.log('what the fuck is ging on?');
      e.preventDefault();
      return d3Chart.makeCircles(data);
    });
  };

})(window);
