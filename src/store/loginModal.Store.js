import { makeAutoObservable } from 'mobx'



class LoginModalStore {
  open = false;

  constructor() {
    makeAutoObservable(this)
  }

  setOpen = () => {
    this.open = !this.open
  };

}



export { LoginModalStore }