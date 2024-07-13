let chart = echarts.init(document.getElementById("chart"));
const option = {
    xAxis:{
        data:['10AM' , '11AM' , '12AM' , '01PM' , '02PM' , '03PM'],
    },
    yAxis:{},
    series:[{
        type:'bar',
        data:[30 , 28 , 45 , 20 , 33 , 15],
        showBackground:true,
        barWidth:'18%',
        itemStyle:{
            color:'#BAD4EB',
            backgroundStyle:{
                color:'#232325'
            },
        }
    },
    {
        type: 'line',
        data: [ 30, 28, 45, 20, 33, 15 , 20],
        smooth:true,
        itemStyle:{
            color:'#2AA1FA',
        }
      }    
]
}
chart.setOption(option);
