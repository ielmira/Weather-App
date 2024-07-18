const chart = echarts.init(document.getElementById("chart"));
const gaugeChart = echarts.init(document.getElementById("gaugeChart")); 
// bar chart
const option = {
  grid: {
    left:0,
    containLabel: true,
  },
  xAxis: {
    axisTick: {
      show:false
      },
    axisLine:{
      show:false,
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
const option1 = {
  series:[{
    type:'gauge',
    startAngle:180,
    endAngle:0,
    min:0,
    max:12,
    splitNumber:4,
    axisTick:{
      show:false
    },
    pointer: {
      show:false
    },
    itemStyle:{
      color:'#2AA1FA'
    },
    progress:{
      show:true,
      width:18,
    },
    axisLine: {
      lineStyle: {
        width: 7
      }
    },
    detail: {
      width: '100%',
      lineHeight:200,
      height: 70,
      color: '#FFFFFF',
      formatter: function (value) {
        return value.toFixed(2) + ` UV`;
      },
      rich: {
        value: {
          fontSize: 50,
          fontWeight: 'bolder',
          color: '#777'
        },
        unit: {
          fontSize: 20,
          color: '#999',
          padding: [0, 0, -20, 10]
        }
      }
    },
    data: [
      {
        value: 5.50
      }
    ]
 } ]
}

gaugeChart.setOption(option1);