const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const randomBetween = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

const getRandomColorStr = () => {
  const r = randomBetween(100, 255);
  const g = randomBetween(100, 255);
  const b = randomBetween(100, 255);
  return `rgb(${r},${g},${b})`;
};

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width: 700,
  height: 400,
  backgroundColour: '#ffffff',
});

exports.createPlotConfig = function (data) {
  const datasets = [];

  // looping through each field in Y, extract fieldName (sentence case) and values array from each field
  Object.keys(data['Y']).forEach(field => {
    const fieldData = {
      label: data['Y'][field]['tableHeaderName'],
      data: data['Y'][field]['values'],
      fill: false,
      borderColor: getRandomColorStr(),
      borderWidth: 2,
      xAxisID: 'xAxis1',
    };

    datasets.push(fieldData);
  });

  return {
    type: 'line',
    data: {
      // x axis - dates
      labels: data['X']['time']['values'],
      // y axis - dataset
      datasets,
    },
  };
};

exports.plotGraph = async function (configuration, filePath) {
  const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
  const base64Image = dataUrl;

  const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');

  fs.writeFile(filePath, base64Data, 'base64', function (err) {
    if (err) console.log(err);
  });

  return dataUrl;
};
