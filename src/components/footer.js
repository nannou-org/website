import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import footerStyles from './footer.module.scss'

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                }
            }
        }
    `)

    return (
        <footer className={footerStyles.footer}>
            <div className={footerStyles.links}> 
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

            <p>Copyright © {data.site.siteMetadata.author} 2019</p>

        </footer>
    )
}

export default Footer
