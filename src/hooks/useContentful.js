import { createClient } from "contentful"
import { entries } from "mobx"

const useContentful = () => {
  const client = createClient({
    space: "rifgzuhygfli",
    accessToken: "CLOrxADrWrF8xecNAmV47bGJPwnnccjxadKjzzUAaps",
    host: "cdn.contentful.com"
  })

  const getAchievements = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "achievements",
        select: "fields",
      })
      //clean the data
      const sanitizedEntries = entries.items.map((item) => {
        const id = item.sys.id
        return {
          ...item.fields,
          id
        }
      }
      )
      return sanitizedEntries

    } catch (error) {
      console.log(error)
    }
  }

  const getCompletedAchievements = async (userInfo) => {
    let array = []
    try {
      array = Object.keys(userInfo.achievements)
    } catch (error) {
      console.log('it is fine')
    }
    const joinedString = array.join(',')

    try {
      const entries = await client.getEntries({
        content_type: "achievements",
        select: "fields",
        "sys.id[in]": joinedString
      })
      //clean the data
      const sanitizedEntries = entries.items.map((item) => {
        const id = item.sys.id
        return {
          ...item.fields,
          id
        }
      }
      )
      return sanitizedEntries

    } catch (error) {
      console.log(error)
    }
  }

  return { getAchievements, getCompletedAchievements }
}

export default useContentful