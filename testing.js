let time = [0, 0];
let times = 0;
setInterval(async () => {
  times++;
  const res = await (
    await fetch(
      "http://10.20.110.48:8529/_db/police_register/service/getCarByID/K-MJ-319"
    )
  ).json();
  time[0] += res.query.delta;
  time[1] += res.keyValue.delta;
  console.log(time, time[0] / times, time[1] / times);
}, 10);

let time = 0;
let times = 0;
setInterval(async () => {
  times++;
  const res = await (
    await fetch(
      "http://10.20.110.48:8529/_db/police_register/service/getAllCarsByColor/blue"
    )
  ).json();
  time += res.delta;
  console.log(time, time / times);
}, 10);
