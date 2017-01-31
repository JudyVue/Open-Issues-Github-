(function(module){

  /*global issues issueView helpers highChart d3:true*/

  let width = 600;
  let height = 800;
  let translateX = 300;
  let translateY = 300;
  let scale = 30;
  let forceStrength = 0;

  let d3Chart = {};
  module.d3Chart = d3Chart;


  //create the svg area on the DOM
  let svg = d3.select('#chart')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', `translate(${translateX}, ${translateY})`);

  let defs = svg.append('defs');


  //scale the circles according to an arbitrarily set scale I set to the number of days the issue was created
  let radiusScale = d3.scaleSqrt().domain([1, 50]).range([10, 50]);

  //simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
  let simulation = d3.forceSimulation()
  .force('x', d3.forceX(width / 2).strength(forceStrength)) //strength between 0-1
  .force('y', d3.forceY(height / 2).strength(forceStrength))
  .force('collide', d3.forceCollide((d) => {
    return radiusScale(d.scale);
  }));


  //setting scale property so that circles can be sized according to if issue was created today, > 7 days ago, or > 7 days ago
  d3Chart.addDataScaleProp = function(data){
    if (data.daysAgo === 'today') return data.scale = scale;
    if (data.daysAgo <= 7) return data.scale = scale / 2;
    if (data.daysAgo > 7) return data.scale = scale / 5;
  };


  //make the circles
  d3Chart.makeCircles = function(data){

    defs.selectAll('.user-pattern')
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
    .attr('xlink:href', (d) => d.issueUserAvatarURL);

    let circles = svg.selectAll('.issue')
    .data(data)
    .enter().append('circle')
    .attr('class', 'issue')
    .attr('r', (d) => {
      d3Chart.addDataScaleProp(d);
      return radiusScale(d.scale);
    })
    .attr('fill', (d) => `url(#${d.issueUser})`)
    .on('click', (d) => {
      console.log('what is d?', d);
    });

    simulation.nodes(data)
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

  d3Chart.updateData = function(){

  }


})(window);
