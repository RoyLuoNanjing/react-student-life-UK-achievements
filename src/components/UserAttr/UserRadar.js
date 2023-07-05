import React, { useEffect } from 'react'
import { Card, } from 'antd'
//echarts
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'


const UserRadar = ({ dataSource }) => {

  //获取用户数值
  const data = []
  dataSource.forEach((value, key) => {
    switch (key) {
      case '时尚值':
        data[0] = value
        break
      case 'emo值':
        data[1] = value
        break
      case '学习值':
        data[2] = value
        break
      case '快乐值':
        data[3] = value
        break
      case '社交值':
        data[4] = value
        break
      default:
        break
    }
  })
  console.log(data)
  //准备echart数据
  const options = {

    tooltip: {
      trigger: 'axis'
    },

    radar: [

      {
        indicator: [
          { text: '时尚', max: 100 },
          { text: 'emo', max: 100 },
          { text: '学习', max: 100 },
          { text: '快乐', max: 100 },
          { text: '社交', max: 100 }
        ],
        radius: 90,
        center: ['70%', '40%']
      }
    ],
    series: [

      {
        type: 'radar',
        radarIndex: 0,
        areaStyle: {},
        data: [
          {
            value: data,
            name: 'User Attributes'
          },
        ]
      },

    ]
  }









  return (

    <ReactECharts option={options} echarts={echarts} />

  )
}

export default UserRadar