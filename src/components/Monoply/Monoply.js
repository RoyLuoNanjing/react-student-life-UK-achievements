import React from 'react'
import { List, Card } from 'antd'

const Monoply = () => {
  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
    {
      title: 'Title 7',
    },
    {
      title: 'Title 8',
    },
  ]


  return (
    <div style={{
      width: '70%',
      //height: '70%',
    }}>
      <div style={{
        flex: '1',
        height: '150px',
        border: '1px solid black',
        margin: '5px',
      }}>
        {/* <List
          grid={{ gutter: 1, column: 15 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item >
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        /> */}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', }}>
        <div style={{
          flex: '1 0 10%',
          height: '400px',
          border: '1px solid black',
          margin: '5px',
        }}>Box 1</div>
        <div style={{
          flex: '1 0 60%',
          height: '400px',
          border: '1px solid black',
          margin: '5px',
        }}>Box 2</div>
        <div style={{
          flex: '1 0 10%',
          height: '400px',
          border: '1px solid black',
          margin: '5px',
        }}>Box 3</div>
      </div>
      <div style={{
        flex: '1',
        height: '150px',
        border: '1px solid black',
        margin: '5px',
      }}>
      </div>
    </div>
  )

}

export default Monoply