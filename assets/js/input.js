const chart = echarts.init(document.getElementById("chart"));
const gaugeChart = echarts.init(document.getElementById("gaugeChart")); 
// bar chart
const option = {
  grid: {
    left:0,
    containLabel: true,
  },
  xAxis: {
    axisLine:{
      show:false
    },
    data: ["10AM", "11AM", "12AM", "01PM", "02PM", "03PM"],
  },
  yAxis: {
    splitLine:{
      show:false,
      lineStyle:{
        type:'dashed',
        color:'#39393A'
      }
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
      data: [18 , 16 , 26 , 11 , 22 , 9],
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
      data: [18 , 16 , 26 , 11 , 22 , 9 , 12 ],
      smooth: true,
      itemStyle: {
        color: "#2AA1FA",
      },
    },
  ],
};
chart.setOption(option);

// gauge chart
