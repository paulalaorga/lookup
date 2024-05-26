<template>
    <div ref="skyMap" class="sky-map"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  import { getStarData } from '@/services/starService.js';
  
  export default {
    name: 'SkyMap',
    data() {
      return {
        stars: []
      };
    },
    async mounted() {
      try {
        this.stars = await getStarData();
        this.drawSkyMap(this.stars);
      } catch (error) {
        console.error('Error fetching star data:', error);
      }
    },
    methods: {
      drawSkyMap(stars) {
        const width = 800;
        const height = 600;
        const svg = d3.select(this.$refs.skyMap)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .call(d3.zoom().on("zoom", (event) => {
            svg.attr("transform", event.transform);
          }))
          .append("g");
  
        const circles = svg.selectAll('circle')
          .data(stars)
          .enter()
          .append('circle')
          .attr('cx', d => this.scaleX(d.azimuth))
          .attr('cy', d => this.scaleY(d.altitude))
          .attr('r', d => this.scaleSize(d.magnitude))
          .attr('fill', 'white');
  
        circles.on('mouseover', (event, d) => {
          d3.select(event.target).attr('r', this.scaleSize(d.magnitude) * 1.5).attr('fill', 'yellow');
          this.showTooltip(event, d);
        })
        .on('mouseout', (event, d) => {
          d3.select(event.target).attr('r', this.scaleSize(d.magnitude)).attr('fill', 'white');
          this.hideTooltip();
        });
  
        // Tooltip
        this.tooltip = d3.select(this.$refs.skyMap)
          .append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0);
  
        this.tooltip.append('div').attr('class', 'tooltip-title');
        this.tooltip.append('div').attr('class', 'tooltip-description');
      },
      scaleX(azimuth) {
        return d3.scaleLinear().domain([0, 360]).range([0, 800])(azimuth);
      },
      scaleY(altitude) {
        return d3.scaleLinear().domain([0, 90]).range([600, 0])(altitude);
      },
      scaleSize(magnitude) {
        if (isNaN(magnitude)) return 0;
        return d3.scaleLinear().domain([-1.5, 15]).range([8, 1])(magnitude);
      },
      showTooltip(event, data) {
        this.tooltip.style('opacity', 1).style('left', `${event.pageX + 10}px`).style('top', `${event.pageY - 20}px`);
        this.tooltip.select('.tooltip-title').text(data.name);
        this.tooltip.select('.tooltip-description').text(`Magnitude: ${data.magnitude}`);
      },
      hideTooltip() {
        this.tooltip.style('opacity', 0);
      },
    }
  };
  </script>
  
  <style scoped>
  .sky-map {
    position: relative;
    width: 800px;
    height: 600px;
    background-color: black;
  }
  .tooltip {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    pointer-events: none;
  }
  .tooltip-title {
    font-weight: bold;
  }
  </style>
  