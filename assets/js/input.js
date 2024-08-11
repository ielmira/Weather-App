const chart = echarts.init(document.getElementById("chart"));
const gaugeChart = echarts.init(document.getElementById("gaugeChart"));
document.documentElement.classList.add("dark");

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
    // min: 0,
    // max: 100,
    axisLabel: {
      formatter: function (data) {
        console.log(data);
        if (data === 0) {
          return "Sunny";
        } else if (data === 65) {
          return "Rainy";
        } else if (data === 30) {
          return "Heavy";
        } else {
          return "";
        }
      },
      customValues: [0, 30, 65],
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
  // console.log("rrrrr", nextHourTimeStamp);
  // console.log(`today is day ${day} and the time is ${hours}:${minutes}`);
  let todayHoursList = data.days[0];
  // console.log(todayHoursList);

  let finalList = [];

  const toadyFilterResult = todayHoursList.hours.filter((item) => {
    return item.datetimeEpoch >= nextHourTimeStamp;
  });

  if (toadyFilterResult.length >= 6) {
    finalList = toadyFilterResult.slice(0, 6).map((item) => {
      return {
        time: item.datetime,
        precipprob: item.precipprob,
      };
    });
  } else {
    const lessHours = 6 - toadyFilterResult.length;
    const tommarowHoursList = data.days[1].hours.slice(0, lessHours);
    finalList = toadyFilterResult.concat(tommarowHoursList).map((item) => {
      return {
        time: item.datetime,
        precipprob: item.precipprob,
      };
    });
  }

  return finalList;
}
const apikey = "e75895e9a584af2eeb49e3355b5978cc";
const searchCity = document.querySelector(".searchCity");
const searchBtn = document.querySelector(".searchBtn");
const modal2 = document.querySelector(".modal2");
const reload = document.querySelector(".reload");
// console.log("reload:");
// console.log(reload);

async function fetchData(url) {
  if (url == "") {
    return;
  }

  const response = await fetch(url + `&appid=${apikey}`);
  console.log("Response : ", response);

  return response.json();
}

async function todaySetWeather(city) {
  // const data = await fetchData(
  //   `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`,
  // );
  try {
    const data = await fetchData(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`
    );
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let sunriseDate = new Date(sunrise * 1000);
    let sunsetDate = new Date(sunset * 1000);
    let today = data.dt;
    let dayName = new Date(today * 1000);
    let todayHour = dayName.getHours();
    let todayMinute = dayName.getMinutes();
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
    document.querySelector(".humidityPercent").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".visibility").innerHTML =
      data.visibility * 0.001 + "km";
    document.querySelector(".sunset").innerHTML =
      `&nbsp;` + `${hour2}:${minute2}`;
    document.querySelector(".dayName").innerHTML =
      moment(dayName).format("dddd");
    document.querySelector(
      ".timeLine"
    ).innerHTML = `${todayHour}:${todayMinute} AM`;
  } catch (error) {
    console.log("There was an error", error);
    modal2.classList.replace("hidden", "fixed");
    reload.addEventListener("click", () => {
      todaySetWeather(city);
    });
  }
}

searchBtn.addEventListener("click", async () => {
  const modal = document.querySelector(".modal");
  try {
    modal.classList.replace("hidden", "fixed");
    await todaySetWeather(searchCity.value);
    const data = await nextSevenDayWeather(searchCity.value);
    setDataVar(data);
    modal.classList.replace("fixed", "hidden");
  } catch (error) {
    modal2.classList.replace("hidden", "fixed");
    modal.classList.replace("fixed", "hidden");
  }
});

async function nextSevenDayWeather(city) {
  const modal = document.querySelector(".modal");
  try {
    modal.classList.replace("hidden", "fixed");
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=uk&key=FA8C5256869T2PXE7FDXKV6XV`
    );
    let data = await response.json();

    const weather = document.querySelector(".weather");
    weather.classList.add("flex", "gap-9", "text-white");
    console.log("xxxxxxxxxxxxxx");
    console.log(weather.firstElementChild);
    let bgColor;
    if (document.documentElement.classList.contains("dark")) {
      bgColor = "bg-primary";
    } else {
      bgColor = "bg-lightMode";
    }

    weather.innerHTML = "";
    // console.log(weather.innerHTML);
    for (let i = 2; i <= 7; i++) {
      let dt = data.days[i].datetimeEpoch;
      let getDate = new Date(dt * 1000);
      let nextDayName = moment(getDate).format("ddd");

      const bgLight = document.querySelectorAll(".bg-lightMode");

      const nextDiv = document.createElement("div");
      const weatherChild = weather.childNodes;

      nextDiv.classList.add(
        // bgColor,
        // "bg-lightMode dark:bg-primary",

        "flex",
        "flex-col",
        "items-center",
        "justify-evenly",
        "rounded-[30px]",
        "js-theme-dependent"
      );
      if (document.documentElement.classList.contains("dark")) {
        nextDiv.classList.add("bg-primary");
      } else {
        nextDiv.classList.add("bg-lightMode");
      }
      const dayTitle = document.createElement("p");
      dayTitle.classList.add("text-[16px]");
      const border = document.createElement("span");
      border.classList.add("border-t-2", "border-[#39393A]", "w-full");
      dayTitle.innerHTML = nextDayName.toUpperCase();

      let icon = document.createElement("img");
      icon.classList.add("px-4", "w-[100px]", "h-[60px]");
      let iconImg = data.days[i].icon;
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
    return data;
  } catch (error) {
    // console.log("There was an error", error);
    modal2.classList.replace("hidden", "fixed");
    modal.classList.replace("fixed", "hidden");
    reload.addEventListener("click", () => {
      nextSevenDayWeather(city);
    });
  }
}

function setDataVar(data) {
  const uvData = data.days[0].uvindex;
  option1.series[0].data[0].value = uvData;
  gaugeChart.setOption(option1);
  // console.log("uvData", uvData);
  const finalList = createBarChartData(data);
  // console.log(`FINAL LIST : `, finalList.toString());
  // console.log("finallllllllll", finalList);
  const barChartTime = finalList.map((item) => {
    return moment(item.time.substring(0, 2), "hh A").format("hh A");
  });
  // console.log("yeeeeeeeessssssss", moment(barChartTime, "hh A").format("hh A"));
  const barChartPrecip = finalList.map((item) => {
    return item.precipprob;
  });
  barChartOption.series[0].data = barChartPrecip;
  barChartOption.series[1].data = barChartPrecip;

  barChartOption.xAxis.data = barChartTime;
  chart.setOption(barChartOption);

  // chart.setOption(barChartOption);
  // console.log("timeeeeeeeeee", barChartOption.data);
  // console.log(barChartPrecip);
}

const otherCitiesBoxes = document.querySelectorAll(".otherCitiesBoxes");
const cityWeather = document.querySelectorAll(".cityWeather");
const cityNameOther = document.querySelectorAll(".cityNameOther");
const newIcon = document.querySelectorAll(".newIcon");

window.onload = async function cityBoxes() {
  const modal = document.querySelector(".modal");
  modal.classList.replace("hidden", "fixed");
  let i = 0;
  const cityName =
    otherCitiesBoxes[i].querySelector(".cityNameOther").innerHTML;
  try {
    // throw new Error("ERROR");/
    const data = await fetchData(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}`
    );
    const modal = document.querySelector(".modal");
    modal.classList.replace("hidden", "fixed");
    for (let i = 0; i < otherCitiesBoxes.length; i++) {
      setWeatherIcon(newIcon[i], cityWeather[i].innerHTML);

      // console.log(cityWeather[i]);
      cityWeather[i].innerHTML = data.weather[0].description;

      // console.log("cityyyyyyyy", cityWeather[i].innerHTML);
    }

    modal.classList.replace("fixed", "hidden");
    for (let i = 0; i < otherCitiesBoxes.length; i++) {
      setWeatherIcon(newIcon[i], cityWeather[i].innerHTML);
      otherCitiesBoxes[i].addEventListener("click", async () => {
        const modal = document.querySelector(".modal");
        modal.classList.replace("hidden", "fixed");
        await todaySetWeather(cityNameOther[i].innerHTML);
        const data = await nextSevenDayWeather(cityNameOther[i].innerHTML);
        setDataVar(data);
        modal.classList.replace("fixed", "hidden");
      });
    }
  } catch (error) {
    console.log("There was an error", error);
    modal2.classList.replace("hidden", "fixed");
    modal.classList.replace("fixed", "hidden");

    reload.addEventListener("click", () => {
      // console.log("CLICKED");
      cityBoxes();
    });
  }
};

function setWeatherIcon(element, iconName) {
  let icon = iconName;

  if (icon === "cloudy") {
    icon = "cloudy-day-1";
  } else if (icon === "Windy") {
    icon = "thunder";
  } else if (icon === "Mostly Sunny") {
    icon = "clear-day";
  } else if (icon === "broken clouds") {
    icon = "broken clouds";
  } else if (icon === "clear sky") {
    icon = "clear sky";
  } else if (icon === "overcast clouds") {
    icon = "overcast clouds";
  } else {
    icon = "overcast clouds";
  }

  console.log("icon:" + icon);

  element.setAttribute("src", `./assets/img/animated - Copy/${icon}.svg`);
}

const themeSwitch = document.getElementById("themeSwitch");
const body = document.querySelector(".body");
const bgPrimary = document.querySelectorAll(".bg-primary");
const bgInput = document.querySelectorAll(".bg-input");
const weatherElement = document.querySelectorAll(".weather");
function updateThemeForElements() {
  const elements = document.querySelectorAll('.js-theme-dependent'); // همه المنت‌هایی که باید تم‌شان آپدیت شود
  elements.forEach(element => {
    if (document.documentElement.classList.contains("dark")) {
      element.classList.remove("bg-lightMode");
      element.classList.add("bg-primary");
    } else {
      element.classList.remove("bg-primary");
      element.classList.add("bg-lightMode");
    }
  });
}
themeSwitch.addEventListener("change", (event) => {
  if (event.target.checked) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  updateThemeForElements(); 
});
