import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './footer.module.scss'
import logo from '../images/nannou_logo_alpha.png' // Tell Webpack this JS file uses this image


const Footer = ({data}) => {
    const site_data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                }
            }
        }
    `)

    return (
        <footer className={styles.footer}>
            <div className={styles.links}> 
                <a href="https://github.com/nannou-org/nannou" aria-label="Github" target="_blank" rel="noopener noreferrer">
                    Github  
                </a>

                <a href="https://communityinviter.com/apps/nannou/nannou-slack" aria-label="Slack" target="_blank" rel="noopener noreferrer">
                    Slack  
                </a>

                <a href="https://docs.rs/nannou/" aria-label="Docs" target="_blank" rel="noopener noreferrer">
                    Docs  
                </a>
            </div>

            <div className={styles.nannou_logo}>
                <img src={logo} alt="nannou_logo" /> 
            </div>

            <div className={styles.copyright}>
                <p>Copyright © {site_data.site.siteMetadata.author} 2019</p>
            </div>

        </footer>
    )
}

export default Footer
