import React from 'react'
import { Avatar, List, Space, Card, Image, Table, Button, Popconfirm, Radio } from 'antd'
import { TeamOutlined, SkinOutlined, FrownOutlined, SmileOutlined, BulbOutlined, StarFilled, CheckCircleFilled } from '@ant-design/icons'
import { ListData } from '../../data/ListData'
import "./index.scss"
import useContentful from '../../hooks/useContentful'
import { useEffect, useState } from 'react'
import image from '../../assets/images/completed.png'
import { useStore } from '../../store'


import { observer } from 'mobx-react-lite'
import { http } from '../../utils'



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)


const AchievementList = () => {

  //use Store
  const { achievementStore } = useStore()
  const achievements = achievementStore.achievements
  const setAchievements = achievementStore.setAchievements
  const getAchievements = achievementStore.getAchievements

  const { userInfoStore } = useStore()
  const getUserInfo = userInfoStore.getUserInfo
  const userInfo = userInfoStore.userInfo

  //将拿到的成就按日期从新到旧排列
  const AchievementsSortedByDate = achievements.list.slice().sort((a, b) => new Date(b.date) - new Date(a.date))

  useEffect(() => {
    getAchievements()
  }, [getAchievements, userInfo])



  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])


  //点击未完成确认后即可完成成就
  const onClick = async (item) => {
    const updateUserAchievements = async () => {
      try {
        const res = await http.put('/userauth', item)
        //一定要在try里面执行依赖，不然页面刷新会有延迟
        getUserInfo()
      } catch (error) {
        console.log(error)
      }
    }
    updateUserAchievements()
  }

  //保证每次filter以后列表会刷新
  const [filteredAchievement, setFilteredAchievement] = useState(AchievementsSortedByDate)
  //第一次页面刷新时默认值AchievementsSortedByDate拿到的实际上是空array，所以datasource需要做判定是否值已经刷新完成
  const [isLoading, setIsLoading] = useState(true)




  const [radioBgImg, setRadioBgImg] = useState({
    all: require('../../assets/images/filterBg/All.jpg'),
    uk: require('../../assets/images/filterBg/UK.jpg'),
    other: require('../../assets/images/filterBg/Other.jpg'),
    manchester: require('../../assets/images/filterBg/Manchester.jpg'),
    london: require('../../assets/images/filterBg/London.jpg'),
    birmingham: require('../../assets/images/filterBg/Birmingham.jpg'),
    liverpool: require('../../assets/images/filterBg/Liverpool.jpg'),
    edinburgh: require('../../assets/images/filterBg/Edinburgh.jpg'),
    bristol: require('../../assets/images/filterBg/Bristol.jpg'),
    glasgow: require('../../assets/images/filterBg/Glasgow.jpg'),
    cambridge: require('../../assets/images/filterBg/Cambridge.jpg'),
    brighton: require('../../assets/images/filterBg/Brighton.jpg')
  })

  const onFilter = async (event) => {
    //此时AchievementsSortedByDate值已经拿到
    setIsLoading(false)
    if (event.target.value === 'All') {
      return setFilteredAchievement(AchievementsSortedByDate)
    }
    return setFilteredAchievement(AchievementsSortedByDate.filter((object) => object.category === event.target.value))
  }





  return (
    <>
      <Radio.Group defaultValue="All" style={{
        marginTop: 16,
      }}
        buttonStyle='outline'
        onChange={(event) => onFilter(event)}
        className='radio-group'
      >
        <Radio.Button value="All" style={{ backgroundImage: `url(${radioBgImg.all})`, backgroundSize: 'cover' }}>全部</Radio.Button>
        <Radio.Button value="UK" style={{ backgroundImage: `url(${radioBgImg.uk})`, backgroundSize: 'cover' }}>英国</Radio.Button>
        <Radio.Button value="London" style={{ backgroundImage: `url(${radioBgImg.london})`, backgroundSize: 'cover' }}>伦敦</Radio.Button>
        <Radio.Button value="Manchester" style={{ backgroundImage: `url(${radioBgImg.manchester})`, backgroundSize: 'cover' }}>曼彻斯特</Radio.Button>
        <Radio.Button value="Edinburgh" style={{ backgroundImage: `url(${radioBgImg.edinburgh})`, backgroundSize: 'cover' }}>爱丁堡</Radio.Button>
        <Radio.Button value="Liverpool" style={{ backgroundImage: `url(${radioBgImg.liverpool})`, backgroundSize: 'cover' }}>利物浦</Radio.Button>
        <Radio.Button value="Bristol" style={{ backgroundImage: `url(${radioBgImg.bristol})`, backgroundSize: 'cover' }}>布里斯托</Radio.Button>
        <Radio.Button value="Glasgow" style={{ backgroundImage: `url(${radioBgImg.glasgow})`, backgroundSize: 'cover' }}>格拉斯哥</Radio.Button>
        <Radio.Button value="Birmingham" style={{ backgroundImage: `url(${radioBgImg.birmingham})`, backgroundSize: 'cover' }}>伯明翰</Radio.Button>
        <Radio.Button value="Cambridge" style={{ backgroundImage: `url(${radioBgImg.cambridge})`, backgroundSize: 'cover' }}>剑桥</Radio.Button>
        <Radio.Button value="Brighton" style={{ backgroundImage: `url(${radioBgImg.brighton})`, backgroundSize: 'cover' }}>布莱顿</Radio.Button>
        <Radio.Button value="Others" style={{ backgroundImage: `url(${radioBgImg.other})`, backgroundSize: 'cover' }}>其他</Radio.Button>
      </Radio.Group >


      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 8,
        }}
        // 页面刚刷新时，数据获取所有的成就事件
        dataSource={isLoading ? AchievementsSortedByDate : filteredAchievement}
        footer={<></>
        }
        renderItem={(item) => (
          <Card style={{
            backgroundImage: `url(${require('../../assets/images/paperBg.jpg')})`,
            backgroundPosition: 'bottom',
            marginBottom: '20px',
            border: '1px solid #ffedac',
            padding: '12px',
            maxWidth: '100%',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
          }}
          >
            <List.Item
              key={item.id}
              actions={[
                <p>{item.date}</p>,
                <IconText icon={SkinOutlined} text={item.bonus[0]} key="时尚值" />,
                <IconText icon={FrownOutlined} text={item.bonus[1]} key="emo值" />,
                <IconText icon={BulbOutlined} text={item.bonus[2]} key="学习值" />,
                <IconText icon={SmileOutlined} text={item.bonus[3]} key="快乐值" />,
                <IconText icon={TeamOutlined} text={item.bonus[4]} key="社交值" />,

                <div>
                  {userInfo.achievements && userInfo.achievements.hasOwnProperty(item.id) ? <CheckCircleFilled style={{ fontSize: '30px', color: 'green' }} /> :
                    <Button >
                      <Popconfirm
                        onConfirm={() => onClick(item)}
                        title="真的完成了吗？Have you really done it?" okText="我确定Yes" cancelText="再想想Not Yet">
                        Uncompleted
                      </Popconfirm>
                    </Button>}
                </div>
              ]}
              extra={
                <div className="card">
                  <Image
                    width={150}
                    alt="Product name: {item.name}"
                    src={item.cover.fields.file.url}
                  />
                </div>
              }
            >


              <List.Item.Meta
                avatar={<Avatar src={item.logo.fields.file.url} />}
                title={<a href={item.href} >{item.title}</a>}
                description={item.description.content[0].content[0].value}
              />
              <span>
                <h1>达成条件:</h1>
                {item.content.map((item) => {
                  return <p key={item}>{'· ' + item}</p>
                })}


                <h1>稀有度:</h1>
                {[...Array(item.rarity)].map((_, index) => (
                  <span key={index}><StarFilled style={{ color: 'gold', fontSize: '20px' }} /></span>
                ))}
              </span>


            </List.Item>

          </Card>

        )}
      />
    </>
  )
}

export default observer(AchievementList)