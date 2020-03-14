import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/index.scss"
import styles from "./layout.module.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fab)

class Layout extends React.Component {
  constructor(props) {
      super(props);
  }
  
  render() {
      return (
          <div>
              <div className={styles.container}>
                  <div className={styles.content}>
                    <Header />
                    {this.props.children}
                  </div>
              </div>
              <Footer />
          </div>
      )
  }
}

export default Layout

