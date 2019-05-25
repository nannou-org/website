import React from 'react'
import { Link } from 'gatsby'

import headerStyles from './header.module.scss'

const Header = () => {
    return (
        <header className={headerStyles.header}>
            <nav>
                <ul className={headerStyles.navList}>
                    <li>
                        <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/">HOME</Link>
                    </li>
                    <li>
                        <a className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} href="https://docs.rs/nannou" aria-label="Donate" target="_blank" rel="noopener noreferrer">
                            DOCS
                        </a>
                    </li>
                    <li>
                        <a className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} href="www.guide.nannou.cc" aria-label="Guide" target="_blank" rel="noopener noreferrer">
                            GUIDE
                        </a>
                    </li>
                    <li>
                        <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/posts">POSTS</Link>
                    </li>
                    <li>
                        <a className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} href="https://opencollective.com/nannou" aria-label="Donate" target="_blank" rel="noopener noreferrer"> 
                            DONATE
                        </a>
                    </li>
                </ul>
            </nav>

        </header>
    )
}


export default Header