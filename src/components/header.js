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
                            DOCUMENTATION
                        </a>
                    </li>
                    <li>
                        <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/guide">GUIDE</Link>
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