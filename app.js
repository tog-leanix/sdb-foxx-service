function runUseCase(useCaseNumber) {
  switch (useCaseNumber) {
    case 1:
      getAllCars();
      break;
    case 2:
      getCarById();
      break;
    case 3:
      getCarAccidentsByModel();
      break;

    default:
      console.log("No use case found");
      break;
  }
}

// ################ Use Case 1 ###############

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
    ).innerHTML = `REQUESTS: ${times} - MAX: ${maxTimeMs}ms - AVG: ${avgTimeMs}ms - MIN: ${minTimeMs}ms`;
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
      await fetch("http://10.20.110.61:8011/carservice/cars/" + color)
    ).json();
    time += res.time;
    avgTimeMs = time / times;
    maxTimeMs = Math.max(maxTimeMs, res.time);
    minTimeMs = Math.min(minTimeMs, res.time);
    data.push(res);
    document.querySelector(
      "#resultsUseCaseOneJava"
    ).innerHTML = `REQUESTS: ${times} - MAX: ${maxTimeMs}ms - AVG: ${avgTimeMs}ms - MIN: ${minTimeMs}ms`;
  }
  return data;
};

const drawChartUseCaseOne = (dataFoxx = [], dataJava = []) => {
  document.querySelector("#dataFoxxUseCaseOne").innerHTML = JSON.stringify(
    dataFoxx[0],
    null,
    2
  );
  document.querySelector("#dataJavaUseCaseOne").innerHTML = JSON.stringify(
    dataJava[0],
    null,
    2
  );
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
        data: dataJava.map((value) => value.time),
      },
    ],
  });
};

// ################ Use Case 2 ###############

const getCarById = async () => {
  const [foxxData, javaData] = await Promise.all([
    getCarByIdFoxx(),
    getCarByIdJava(),
  ]);
  drawChartUseCaseTwo(foxxData, javaData);
};

const getCarByIdFoxx = async () => {
  const carId = document.querySelector("#carId").value;
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
        "http://10.20.110.48:8529/_db/police_register/service/getCarByID/" +
          carId
      )
    ).json();
    time += res.keyValue.delta;
    avgTimeMs = time / times;
    maxTimeMs = Math.max(maxTimeMs, res.keyValue.delta);
    minTimeMs = Math.min(minTimeMs, res.keyValue.delta);
    data.push(res);
    document.querySelector(
      "#resultsUseCaseTwoFoxx"
    ).innerHTML = `REQUESTS: ${times} - MAX: ${maxTimeMs}ms - AVG: ${avgTimeMs}ms - MIN: ${minTimeMs}ms`;
  }
  return data;
};

const getCarByIdJava = async () => {
  const carId = document.querySelector("#carId").value;
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
      await fetch("http://10.20.110.61:8011/carservice/car/" + carId)
    ).json();
    time += res.time;
    avgTimeMs = time / times;
    maxTimeMs = Math.max(maxTimeMs, res.time);
    minTimeMs = Math.min(minTimeMs, res.time);
    data.push(res);
    document.querySelector(
      "#resultsUseCaseTwoJava"
    ).innerHTML = `REQUESTS: ${times} - MAX: ${maxTimeMs}ms - AVG: ${avgTimeMs}ms - MIN: ${minTimeMs}ms`;
  }
  return data;
};

const drawChartUseCaseTwo = (dataFoxx = [], dataJava = []) => {
  document.querySelector("#dataFoxxUseCaseTwo").innerHTML = JSON.stringify(
    dataFoxx[0],
    null,
    2
  );
  document.querySelector("#dataJavaUseCaseTwo").innerHTML = JSON.stringify(
    dataJava[0],
    null,
    2
  );
  Highcharts.chart("useCaseTwoChart", {
    chart: {
      type: "column",
    },
    title: {
      text: "Zeit von der Query für Auto eines bestimmten Nummernschildes",
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
        data: dataFoxx.map((value) => value.keyValue.delta),
      },
      {
        name: "Java",
        color: "blue",
        data: dataJava.map((value) => value.time),
      },
    ],
  });
};

// ################ Use Case 3 ###############

const getCarAccidentsByModel = async () => {
  const [foxxData, javaData] = await Promise.all([
    getCarAccidentsByModelFoxx(),
    getCarAccidentsByModelJava(),
  ]);
  drawChartUseCaseThree(foxxData, javaData);
};

const getCarAccidentsByModelFoxx = async () => {
  const model = document.querySelector("#model").value;
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
        "http://10.20.110.48:8529/_db/police_register/service/getModelStatisticOnAccidents/" +
          model
      )
    ).json();
    time += res.delta;
    avgTimeMs = time / times;
    maxTimeMs = Math.max(maxTimeMs, res.delta);
    minTimeMs = Math.min(minTimeMs, res.delta);
    data.push(res);
    document.querySelector(
      "#resultsUseCaseThreeFoxx"
    ).innerHTML = `REQUESTS: ${times} - MAX: ${maxTimeMs}ms - AVG: ${avgTimeMs}ms - MIN: ${minTimeMs}ms`;
  }
  return data;
};

const getCarAccidentsByModelJava = async () => {
  const model = document.querySelector("#model").value;
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
      await fetch("http://10.20.110.61:8011/carservice/graph/model/" + model)
    ).json();
    time += res.time;
    avgTimeMs = time / times;
    maxTimeMs = Math.max(maxTimeMs, res.time);
    minTimeMs = Math.min(minTimeMs, res.time);
    data.push(res);
    document.querySelector(
      "#resultsUseCaseThreeJava"
    ).innerHTML = `REQUESTS: ${times} - MAX: ${maxTimeMs}ms - AVG: ${avgTimeMs}ms - MIN: ${minTimeMs}ms`;
  }
  return data;
};

const drawChartUseCaseThree = (dataFoxx = [], dataJava = []) => {
  document.querySelector("#dataFoxxUseCaseThree").innerHTML = JSON.stringify(
    dataFoxx[0],
    null,
    2
  );
  document.querySelector("#dataJavaUseCaseThree").innerHTML = JSON.stringify(
    dataJava[0],
    null,
    2
  );
  Highcharts.chart("useCaseThreeChart", {
    chart: {
      type: "column",
    },
    title: {
      text:
        "Zeit von der Query für die Anzahl der Unfälle eines Modells an anderen Modellen",
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
        data: dataJava.map((value) => value.time),
      },
    ],
  });
};
