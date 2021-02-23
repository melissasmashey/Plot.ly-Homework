d3.json("samples.json").then(data => {
  var id_names = data.names;
  var idNum = data.samples.id;
  // var samp_val=data.samples.sample_values;
  var dropdown = d3.select("#selDataset");
  id_names.forEach(id => {
      var option = dropdown.append("option");
      option.text(id);
      option.property("value", id);
  });
});
function optionChanged(value) {
  d3.json("samples.json").then(data => {
  result=data.samples.filter(picked_num=>picked_num.id == value);
  var results=result[0]
  result2=data.metadata.filter(picked_num=>picked_num.id == value);
  var results3=result2[0];
  //  console.log(results3)
  var bar_data =[
    {
      y:results.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:results.sample_values.slice(0,10).reverse(),
      text:results.otu_labels,
      type:"bar",
      orientation:"h"

    }
  ];
  var barLayout = {
    title: "Top 10 OTUs found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", bar_data, barLayout);
  var bubble_data=[
    {
      x:results.otu_ids,
      y:results.sample_values,
      text:results.otu_labels,
      mode: 'markers',
  marker: {
    color:results.otu_ids.slice(0, 10).reverse(),
    size:results.sample_values.slice(0,10).reverse(),
    }
    }];
  var layout = {
    title: 'Bubble Chart Size Scaling',
    xaxis: {
      title:'OTU ID'
    },
    showlegend: false,
   
  }
  Plotly.newPlot('bubble', bubble_data, layout);
  var demoInfo=d3.select("#sample-metadata");
  demoInfo.html("");
  Object.entries(results3).forEach(([key, value])=>{
    demoInfo.append("p").text(`${key}: ${value}`);
  })  
  var gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: results3.wfreq,
      title: { text: "Belly Button Washing Frequency Scrubs per week" },
      type: "indicator",
      mode: "gauge+number",
      text:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      labels:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: "text",
            textposition: "inside",

      gauge: {
        axis: { range: [0, 9]},
        steps: [
          { range: [0, 1], color: "linen"},
          { range: [1, 2], color: "blanchedalmond"},  
          { range: [2, 3], color: "wheat"},
          { range: [3, 4], color: "burlywood"},
          { range: [4, 5], color: "tan"},
          { range: [5, 6], color: "yellowgreen "},
          { range: [6, 7], color: "darkseagreen "},
          { range: [7, 8], color: "olivedrab "},
          { range: [8, 9], color: "darkseagreen "},
          ] 
        }
      }    
  ];
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', gaugeData, layout);
});      
};







