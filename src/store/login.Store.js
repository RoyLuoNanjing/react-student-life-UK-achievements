// login module

import { makeAutoObservable } from 'mobx'
import { setAccessToken, getAccessToken, removeAccessToken, setIdToken, getIdToken, removeIdToken, getUser, setUser, removeUser } from '../utils'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
class LoginStore {
  accessToken = getAccessToken() || ''
  idToken = getAccessToken() || ''
  username = getUser() || ''
  constructor() {
    //响应式
    makeAutoObservable(this)
  }
  setUsername = (data) => {
    this.username = data
  };

  getToken = async (formValues, navigate, message) => {
    //调用登陆接口
    var authenticationData = {
      Username: formValues.username,
      Password: formValues.password,
    }

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)


    var poolData = {
      UserPoolId: 'eu-west-2_QROavOwhk',
      ClientId: '1n5kfrdkhagkdnhni64ho9cd6f'
    }

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

    var userData = {
      Username: formValues.username,
      Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    const res = await cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken()
        var idToken = result.idToken.jwtToken


        //提示用户
        message.success('Successful Login')
        //存入token
        this.token = accessToken
        //存入localStorage
        setAccessToken(accessToken)
        setIdToken(idToken)
        setUser(formValues.username)
        navigate('/', { replace: true })

      },

      onFailure: function (err) {
        alert(err)
      },
    })
  }
  //退出登录
  loginOut = () => {
    this.token = ''
    removeAccessToken()
    removeIdToken()
    removeUser()
  }
}

export { LoginStore } 