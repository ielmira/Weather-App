const chart = echarts.init(document.getElementById("chart"));
const gaugeChart = echarts.init(document.getElementById("gaugeChart"));
// bar chart
const barChartOption = {
  grid: {
    left: 0,
    containLabel: true,
  },
  xAxis: {
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    data: ["10AM", "11AM", "12AM", "01PM", "02PM", "03PM"],
  },
  yAxis: {
    splitLine: {
      show: false,
      lineStyle: {
        type: "dashed",
        color: "#39393A",
      },
    },
    min: 0,
    max: 30,
    axisLabel: {
      formatter: function (data) {
        console.log(data);
        if (data === 20) {
          return "Sunny";
        } else if (data === 30) {
          return "Rainy";
        } else if (data === 10) {
          return "Heavy";
        } else {
          return "";
        }
      },
      customValues: [30, 10, 20],
    },
  },
  series: [
    {
      type: "bar",
      data: [18, 16, 26, 11, 22, 9],
      barWidth: 5,
      itemStyle: {
        color: "#BAD4EB",
        backgroundStyle: {
          color: "#232325",
        },
      },
    },
    {
      type: "line",
      data: [18, 16, 26, 11, 22, 9, 12],
      smooth: true,
      itemStyle: {
        color: "#2AA1FA",
      },
    },
  ],
};
chart.setOption(barChartOption);
// gauge chart
const option1 = {
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 12,
      splitNumber: 4,
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
        distance: -13,
      },
      pointer: {
        show: false,
      },
      itemStyle: {
        color: "#2AA1FA",
      },
      progress: {
        show: true,
        width: 18,
      },
      title: {
        fontSize: 50,
      },
      axisLine: {
        lineStyle: {
          width: 7,
        },
      },
      detail: {
        width: "100%",
        lineHeight: 100,
        fontSize: 20,
        height: 70,
        color: "#FFFFFF",
        offsetCenter: [0, "100%"],
        formatter: function (value) {
          return value.toFixed(2) + " UV";
        },
        rich: {
          value: {
            fontSize: 50,
            fontWeight: "bolder",
            color: "#777",
          },
          unit: {
            fontSize: 20,
            fontWeight: "normal",
            color: "#999",
            padding: [0, 0, -20, 10],
          },
        },
      },
      data: [
        {
          value: 5.5,
        },
      ],
    },
  ],
};

gaugeChart.setOption(option1);

function createBarChartData(data) {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  now.setHours(hours, 0, 0);
  const nextHourTimeStamp = moment(now.getTime() + 60 * 60 * 1000).unix();
  console.log(`today is day ${day} and the time is ${hours}:${minutes}`);
  console.log(nextHourTimeStamp);
  let todayHoursList = data.days[0];
  console.log(todayHoursList);

  let finalList = [];

  const toadyFilterResult = todayHoursList.hours.filter((item) => {
    return item.datetimeEpoch >= nextHourTimeStamp;
  });

  if (toadyFilterResult.length >= 6) {
    finalList = toadyFilterResult.slice(0 , 6).map((item) => {
      return {
        time : item.datetime,
        temp : item.temp,
      }
    })

  } else {
    const lessHours = 6 - toadyFilterResult.length;
    const tommarowHoursList = data.days[1].hours.slice(0, lessHours);
    finalList = toadyFilterResult.concat(tommarowHoursList).map((item) => {
      return {
        time: item.datetime,
        temp: item.temp,
      };
    });

  }

  return finalList;

}



const apikey = "e75895e9a584af2eeb49e3355b5978cc";
const searchCity = document.querySelector(".searchCity");
const searchBtn = document.querySelector(".searchBtn");

async function fetchData(url) {
  if (url == "") {
    return;
  }

  const response = await fetch(url + `&appid=${apikey}`);
  console.log("Response : ", response);

  return response.json();
}

async function todaySetWeather(city) {
  const data = await fetchData(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`,
  );

  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;
  let sunriseDate = new Date(sunrise * 1000);
  let sunsetDate = new Date(sunset * 1000);
  let day = sunriseDate.getDay();
  let hour = sunriseDate.getHours();
  let hour2 = sunsetDate.getHours();
  let minute = sunriseDate.getMinutes();
  let minute2 = sunsetDate.getMinutes();
  console.log(data);
  document.querySelector(".todayTemp").innerHTML =
    Math.round(data.main.temp) + "°";
  document.querySelector(".cityName").innerHTML = data.name;
  document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".realFeel").innerHTML =
    Math.round(data.main.feels_like) + "°";
  document.querySelector(".pressure").innerHTML = data.main.pressure + "MB";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  document.querySelector(".sunrise").innerHTML = `${hour}:${minute}`;
  document.querySelector(".sunset").innerHTML =
    `&nbsp;` + `${hour2}:${minute2}`;
}

searchBtn.addEventListener("click", async () => {
  await todaySetWeather(searchCity.value);
  const  data = await nextSevenDayWeather(searchCity.value);
  const finalList = createBarChartData(data);
  console.log(`FINAL LIST : `,finalList.toString());
  const barChartTime = finalList.map((item) => {
    return {
      time: item.datetime,
    }
  })
  console.log(barChartTime)
});

async function nextSevenDayWeather(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=uk&key=FA8C5256869T2PXE7FDXKV6XV`,
  );
  let data = await response.json();

  const weather = document.querySelector(".weather");
  weather.classList.add("flex", "gap-9", "text-white");
  weather.innerHTML = "";
  console.log(weather.innerHTML);

  for (let i = 0; i <= 5; i++) {
    let dt = data.days[i].datetimeEpoch;
    let getDate = new Date(dt * 1000);
    let nextDayName = moment(getDate).format("ddd");
    console.log(getDate);
    console.log(nextDayName);

    const nextDiv = document.createElement("div");
    nextDiv.classList.add(
      "bg-[#1B1B1D]",
      "flex",
      "flex-col",
      "items-center",
      "justify-evenly",
      "rounded-[30px]",
    );
    const dayTitle = document.createElement("p");
    dayTitle.classList.add("text-[16px]");
    const border = document.createElement("span");
    border.classList.add("border-t-2", "border-[#39393A]", "w-full");
    dayTitle.innerHTML = nextDayName.toUpperCase();

    let icon = document.createElement("img");
    icon.classList.add("px-4", "w-[100px]", "h-[60px]");
    let iconImg = data.days[i].icon;
    console.log("iconImg");
    console.log(iconImg);
    icon.setAttribute("src", `./assets/img/animated/${iconImg}.svg`);
    let nextDaysTemp = document.createElement("p");
    nextDaysTemp.classList.add("font-semibold", "text-[32px]");
    nextDaysTemp.innerHTML = Math.round(data.days[i].feelslike) + "°";
    weather.appendChild(nextDiv);
    nextDiv.appendChild(dayTitle);
    nextDiv.appendChild(border);
    nextDiv.appendChild(icon);
    nextDiv.appendChild(nextDaysTemp);
  }
  return data ;
}
