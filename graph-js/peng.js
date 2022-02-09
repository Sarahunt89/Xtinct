function pengRender() {
    fetch('JSONs/Peng.json')
        .then(response => response.json())
        .then(data => {

            let dataSet = data.data;
            const newData = dataSet.map(function (item) {
                let newPop = item.population.split(",");
                let nextPop = newPop.join("");
                let finPop = parseInt(nextPop);
                return {
                    year: Date.parse(item.year),
                    population: finPop
                }
            })

            // This is getting the Min and Max years
            let yearMin = d3.min(newData, d => d.year);
            let yearMax = d3.max(newData, d => d.year);

            // This is getting the Min and Max population
            let popMax = d3.max(newData, d => d.population);
            let popMin = d3.min(newData, d => d.population);

            // This is creating width, height and margins on graph
            const w = $("#graph").width() * 1;
            const h = w / 2;
            const margin = {
                top: 0,
                right: 0,
                bottom: 40,
                left: 70
            };

            const innerWidth = w - margin.left - margin.right;
            const innerHeight = h - margin.top - margin.bottom;

            const svg = d3.select("#graph")
                .append("svg")
                .attr('id', 'animal-svg')
                .attr('width', w)
                .attr('height', h)
            svg.append('text')
                .attr('id', 'header')
                .attr('transform', 'translate(215, 40)')
                .text("Decline in African Penguin's Population")
 
            const xScale = d3.scaleTime()
                .domain([new Date(yearMin), new Date(Date.parse(2016))])
                .range([2, innerWidth]);

            const xAxis = d3.axisBottom(xScale);

            const yScale = d3.scaleLinear()
                .domain([popMin - 5000, popMax])
                .range([innerHeight, margin.bottom])
                .nice();

            const yAxis = d3.axisLeft(yScale);

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const yAxisG = g.append('g').call(yAxis)
                    .attr('id', 'yAxis')
                    .style("font-size", "15px");
 
            const xAxisG = g.append('g').call(xAxis)
                    .attr('transform', `translate(0, ${innerHeight})`)
                    .attr('id', 'xAxis')
                    .style("font-size", "15px")

            // Line from dot to dot
            const lineGenerator = d3.line()
                .x(d => xScale((d.year)))
                .y(d => yScale((d.population)));
            g.append('path')
                .attr('class', 'line-path')
                .attr('d', lineGenerator(newData));

            // Circle Dots for chart
            svg.selectAll('circle')
                .data(newData)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.year) + margin.left)
                .attr('cy', d => yScale(d.population))
                .attr('r', 3)
                .attr("fill", "#454148")
                .attr("class", "dot")
                .attr('id', 'tooltip')
                .append("title")
                .text((d, i) => "Population: " + d.population )
        });
};