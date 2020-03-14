import React from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from 'gatsby'
import styles from './header.module.scss'

import menu_styles from './hamburger.module.scss'

import MediaQuery from 'react-responsive'

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = {value: false}
      
      this.onChange = this.onChange.bind(this);
      this.unCheck = this.unCheck.bind(this);

  }

  onChange(e){
      let value = this.state.value;
      value = e.target.checked;
      this.setState({value});

      console.log('checkbox change = ' + this.state.value)
  }

  unCheck(){
      let value = this.state.value;
      value = false;
      this.setState({value})
      console.log('uncheck = ' + this.state.value)
  }

  render() {
      
      return (
          <header className={styles.header}>

              <MediaQuery query="(max-width: 800px)">
                  <div className={menu_styles.menu_wrap}>
                      <input 
                          type="checkbox" 
                          className={menu_styles.toggler} 
                          id="burger_checkbox"
                          checked={this.state.value} 
                          onChange={this.onChange}/>
                      
                      <div className={menu_styles.hamburger}><div></div></div>
                      <div className={menu_styles.menu}>
                          <div>
                              <div>
                                  <ul onClick={this.unCheck} >
                                      <li><Link className={styles.menuNavItem} activeClassName={styles.activeNavItem} to="/">HOME</Link></li>
                                      <li><a className={styles.menuNavItem} activeClassName={styles.activeNavItem} href="https://docs.rs/nannou" aria-label="Docs" target="_blank" rel="noopener noreferrer"> DOCS </a></li>
                                      <li><a className={styles.menuNavItem} activeClassName={styles.activeNavItem} href="https://guide.nannou.cc" aria-label="Guide" target="_blank" rel="noopener noreferrer"> GUIDE </a></li>
                                      <li><Link className={styles.menuNavItem} activeClassName={styles.activeNavItem} to="/posts">POSTS</Link></li>
                                      <li><a className={styles.menuNavItem} activeClassName={styles.activeNavItem} href="https://opencollective.com/nannou" aria-label="Donate" target="_blank" rel="noopener noreferrer"> DONATE </a></li>
                                      <li><a className={styles.menuNavItem} activeClassName={styles.activeNavItem} href="https://github.com/nannou-org/nannou" aria-label="Github" target="_blank" rel="noopener noreferrer"> CODE </a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </MediaQuery>

              <MediaQuery query="(min-width: 801px)">
              <div className={styles.text}>
                  <nav>
                      <ul className={styles.navList}>
                          <li><Link className={styles.navItem} activeClassName={styles.activeNavItem} to="/">HOME</Link></li>
                          <li><a className={styles.navItem} activeClassName={styles.activeNavItem} href="https://docs.rs/nannou" aria-label="Docs" target="_blank" rel="noopener noreferrer"> DOCS </a></li>
                          <li><a className={styles.navItem} activeClassName={styles.activeNavItem} href="https://guide.nannou.cc" aria-label="Guide" target="_blank" rel="noopener noreferrer"> GUIDE </a></li>
                          <li><Link className={styles.navItem} activeClassName={styles.activeNavItem} to="/posts">POSTS</Link></li>
                          <li><a className={styles.navItem} activeClassName={styles.activeNavItem} href="https://opencollective.com/nannou" aria-label="Donate" target="_blank" rel="noopener noreferrer"> DONATE </a></li>
                          <li><a className={styles.navItem} activeClassName={styles.activeNavItem} href="https://github.com/nannou-org/nannou" aria-label="Github" target="_blank" rel="noopener noreferrer"> CODE </a></li>
                      </ul>
                  </nav>
              </div>
              </MediaQuery>

          </header>
      )
  }
}

export default () => (
  <StaticQuery
      query={graphql`
          query {
              site {
                  siteMetadata {
                      author
                      email
                  }
              }
          }
      `}
      render={(data) => (
          <Header site={data.site} />
      )}
  />
)
