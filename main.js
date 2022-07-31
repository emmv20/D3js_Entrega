/* Variable para convertir a global los datos. */
let data2

/* Valores svg y margenes */
const width = 800
const height = 500
const margin = {
    top: 10,
    bottom: 40,
    left: 60,
    right: 40
}

/* Grupos */
const svg = d3.select("#chart")
    .append("svg")
    .attr("width",width)
    .attr("height", height)
const elementGroup = svg.append("g")
    .attr("id","elementgroup")
    .attr("transform",`translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g")
    .attr("id","axisGroup")
const xAxisGroup = axisGroup.append("g")
    .attr("id","xAxis")
    .attr("transform",`translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup
    .append("g").attr("id","yAxis")
    .attr("transform",`translate(${margin.left}, ${margin.top})`)
 
/* escalas */  
 const x = d3.scaleLinear().range([0, width - margin.left - margin.right])
 const y = d3.scaleBand().range([height - margin.top - margin.bottom, 0]).padding(0.1)

 /* ejes */
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

/* Procesado del csv, transformacion de los años a INT, filtrado por años sin mundial*/
d3.csv("data.csv").then(data => {
    data.map(d => {
        d.year = +d.year})
        data = d3.nest()
            .key(d => d.winner)
            .entries(data.filter(d => d.winner != ''))
    data2 = data
    
/* dominio */        
x.domain([0, d3.max(data2.map(d => d.values.length)),10])
y.domain(data2.map(d => d.key))

/* d ejes */    
xAxisGroup.call(xAxis)
yAxisGroup.call(yAxis)

/* data binding */
elementGroup.selectAll("rect").data(data2)
.enter()
.append("rect")
    .attr("x", 0)
    .attr("y", (d) => y(d.key))
    .attr("width", d => x(d.values.length))
    .attr("height", y.bandwidth())
    .attr("class", d => d.key)
})