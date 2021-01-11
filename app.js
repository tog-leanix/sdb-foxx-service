function runUseCase(useCaseNumber) {
  switch (useCaseNumber) {
    case 1:
      getAllCars();
      break;
    case 2:
      break;
    case 3:
      break;

    default:
      console.log("No use case found");
      break;
  }
}

const getAllCars = async () => {
  const [foxxData, javaData] = await Promise.all([
    getAllCarsFoxx(),
    getAllCarsJava(),
  ]);
  drawChartUseCaseOne(foxxData, javaData);
};

const getAllCarsFoxx = async () => {
  const color = document.querySelector("#color").value;
  const numOfRequests = document.querySelector("#numOfRequests").value;
  let time = 0;
  let times = 0;
  let maxTimeMs = 0;
  let minTimeMs = 9999;
  let avgTimeMs = 0;
  const data = [];

  while (times < numOfRequests) {
    times++;
    const res = await (
      await fetch(
        "http://10.20.110.48:8529/_db/police_register/service/getAllCarsByColor/" +
          color
      )
    ).json();
    time += res.delta;
    avgTimeMs = time / times;
    maxTimeMs = Math.max(maxTimeMs, res.delta);
    minTimeMs = Math.min(minTimeMs, res.delta);
    data.push(res);
    document.querySelector(
      "#resultsUseCaseOneFoxx"
    ).innerHTML = `COUNT: ${times} - MAX: ${maxTimeMs} - AVG: ${avgTimeMs} - MIN: ${minTimeMs}`;
  }
  return data;
};

const getAllCarsJava = async () => {
  const color = document.querySelector("#color").value;
  const numOfRequests = document.querySelector("#numOfRequests").value;
  let time = 0;
  let times = 0;
  let maxTimeMs = 0;
  let minTimeMs = 9999;
  let avgTimeMs = 0;
  const data = [];

  while (times < numOfRequests) {
    times++;
    const res = await (
      await fetch(
        "http://10.20.110.48:8529/_db/police_register/service/getAllCarsByColor/" +
          color
      )
    ).json();
    time += res.delta;
    avgTimeMs = time / times;
    maxTimeMs = Math.max(maxTimeMs, res.delta);
    minTimeMs = Math.min(minTimeMs, res.delta);
    data.push(res);
    document.querySelector(
      "#resultsUseCaseOneJava"
    ).innerHTML = `COUNT: ${times} - MAX: ${maxTimeMs} - AVG: ${avgTimeMs} - MIN: ${minTimeMs}`;
  }
  return data;
};

function drawChartUseCaseOne(dataFoxx = [], dataJava = []) {
  Highcharts.chart("useCaseOneChart", {
    chart: {
      type: "column",
    },
    title: {
      text: "Zeit von der Query für Autos in einer bestimmten Farbe",
    },
    xAxis: {
      categories: dataFoxx.map((_, index) => index + 1),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Time in ms",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} ms</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "FOXX",
        color: "red",
        data: dataFoxx.map((value) => value.delta),
      },
      {
        name: "Java",
        color: "blue",
        data: dataJava.map((value) => value.delta),
      },
    ],
  });
}
