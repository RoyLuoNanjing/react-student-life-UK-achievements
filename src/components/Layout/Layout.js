

import * as React from "react"


import Header from "../Header/Header"
import { GlobalStyles } from "../styles/GlobalStyles"



const Layout = ({ children }) => {


  return (
    <>
      <GlobalStyles />
      <Header />
      <main>{children}</main>




    </>
  )
}

export default Layout