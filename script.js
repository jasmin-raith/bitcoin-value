const API_KEY = "QSI722W7PY3CQ42D";
let month = [];
let course = [];

async function init() {
  await loadCourse();
  await loadMonthlyCourse();
  renderChart();
}

async function loadCourse() {
  url =
    "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=" +
    API_KEY;
  let respose = await fetch(url);
  let responseAsJson = await respose.json();

  let currrentCourse = Math.round(
    responseAsJson["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
  );

  document.getElementById("course").innerHTML = `<b> ${currrentCourse} € </b>`;
}

async function loadMonthlyCourse() {
  url =
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=" +
    API_KEY;
  let respose = await fetch(url);
  let responseAsJson = await respose.json();

  let monthlyCourse = responseAsJson["Time Series (Digital Currency Monthly)"];

  for (let date in monthlyCourse) {
    month.push(date);
    let courseEachMonth = Math.round(monthlyCourse[date]["1. open"]);
    course.push(courseEachMonth);
  }
}

function renderChart() {
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: month.reverse(),
      datasets: [
        {
          label: "Bitcoin Kurs in €",
          data: course.reverse(),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  document.getElementById("LoadingGraphMessage").innerHTML = ``;
}
