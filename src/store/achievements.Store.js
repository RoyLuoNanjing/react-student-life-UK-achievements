import { makeAutoObservable } from 'mobx'
import useContentful from '../hooks/useContentful'


class AchievementStore {
  achievements = { list: [] };
  completedAchievements = { list: [] };

  constructor() {
    makeAutoObservable(this)
  }

  setAchievements = (data) => {
    this.achievements = { list: data }
  };

  setCompletedAchievements = (data) => {
    this.completedAchievements = { list: data }
  };

  getAchievements = () => useContentful().getAchievements().then((data) => {
    this.setAchievements(data)
  });

  getCompletedAchievements = (useInfo) => useContentful().getCompletedAchievements(useInfo).then((data) => {
    this.setCompletedAchievements(data)
  });


}



export { AchievementStore }