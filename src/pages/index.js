import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'

import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import styles from './home.module.scss'

import vulkan_icon from '../images/icons/vulkan_symbol.jpg' // Tell Webpack this JS file uses this image

import video1 from '../videos/190422.mp4'
import video2 from '../videos/190221.mp4'
import video3 from '../videos/190412.mp4'

export const iconImage = graphql`
  fragment iconImage on File {
    childImageSharp {
      fixed(width: 50, height: 50) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const posterImage = graphql`
  fragment posterImage on File {
    childImageSharp {
      fluid(maxWidth: 150, maxHeight: 150) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
  query {
    banner_image: file(relativePath: { eq: "images/nannou_banner.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 3360, maxHeight: 940) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    logo_image: file(relativePath: { eq: "images/nannou_logo_alpha.png" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    icon2: file(relativePath: { eq: "images/icons/leds_symbol.jpg" }) {
      ...iconImage
    }
    icon3: file(relativePath: { eq: "images/icons/laser_symbol.jpg" }) {
      ...iconImage
    }
    icon4: file(relativePath: { eq: "images/icons/speaker_symbol.jpg" }) {
      ...iconImage
    }
    icon5: file(relativePath: { eq: "images/icons/gui_symbol.jpg" }) {
      ...iconImage
    }
    poster1: file(relativePath: { eq: "videos/190422.jpg" }) {
      ...posterImage
    }
    poster2: file(relativePath: { eq: "videos/190221.jpg" }) {
      ...posterImage
    }
    poster3: file(relativePath: { eq: "videos/190412.jpg" }) {
      ...posterImage
    }
  }
`

const IndexPage = ({data}, props) => {
    return (
            <div> 
              <div className={styles.grid_container_top}>
                  <SEO title="Home" keywords={["Nannou", "About", "Education", "Presentations", "Performances", "Installations"]}/>

                  <BackgroundImage 
                      fluid={data.banner_image.childImageSharp.fluid}
                      className={styles.nested_row1}>
                      <div className={styles.header}>
                          <Header />
                              {props.children}
                      </div>
                      <div className={styles.nannou_logo}>
                        <Img fixed={data.logo_image.childImageSharp.fixed} alt="nannou_logo" />
                      </div>
                      <div className={styles.banner_description}>
                          <h1>An open-source creative-coding framework for Rust</h1>
                      </div>
                  </BackgroundImage>

                  <div className={styles.nested_row2}>
                      <div className={styles.icons}> 
                        <div className={styles.vk_image}> 
                          <img src={vulkan_icon} alt="Vulkan_icon" /> 
                        </div>
                        <div> 
                          <Img fixed={data.icon2.childImageSharp.fixed} alt="LEDs_icon" /> 
                        </div>
                        <div> 
                          <Img fixed={data.icon3.childImageSharp.fixed} alt="Lasers_icon" />
                        </div>
                        <div> 
                          <Img fixed={data.icon4.childImageSharp.fixed} alt="Audio_icon" />
                        </div>
                        <div> 
                          <Img fixed={data.icon5.childImageSharp.fixed} alt="GUI_icon" />
                        </div>
                        <div className={styles.icons_text}><h2>Graphics</h2></div>
                        <div className={styles.icons_text}><h2>LEDs</h2></div>
                        <div className={styles.icons_text}><h2>Lasers</h2></div>
                        <div className={styles.icons_text}><h2>Audio</h2></div>
                        <div className={styles.icons_text}><h2>GUI</h2></div>
                      </div>

                      <div className={styles.description}> 
                          <p>Nannou is a library that aims to make it easy for artists to express themselves with <strong>simple, fast, reliable</strong> code.</p>
                      </div>
                  </div>
              </div>

              <div className={styles.grid_container_middle}>  
                  <div className={styles.left_row_text1}>
                      <h2>Batteries Included</h2>
                      <p>One of the beauties of being a creative coder is that we have the potential to create works in a wide range of domains. Nannou aims to give equal priority to a full suite of creative I/O including graphics, multi-windowing, audio, lasers, lighting and more.</p>
                  </div>
                  <div className={styles.row3_video}> 
                    <video loop="true" autoplay="autoplay" muted poster={data.poster1.childImageSharp.fluid}>
                      <source src={video1} type="video/mp4" />
                    </video>
                  </div>


                  <div className={styles.row4_video}> 
                    <video loop="true" autoplay="autoplay" muted poster={data.poster2.childImageSharp.fluid}>
                      <source src={video2} type="video/mp4" />
                    </video>
                  </div>

                  <div className={styles.right_row_text}>
                      <h2>A fast, modern language</h2>
                      <p>When experimenting with the cutting edge in audiovisual processing high performance becomes a necessity. When performing live or creating long-running installations reliability becomes equally important. Rust ticks these boxes and more.</p>
                  </div>

                  <div className={styles.left_row_text2}>
                      <h2>Open Source & Liberally Licensed</h2>
                      <p>Access to these technologies is often expensive and locked behind proprietary systems. We believe in democratising this space by open sourcing Nannou for everyone to use.</p>
                  </div>

                  <div className={styles.row5_video}> 
                    <video loop="true" autoplay="autoplay" muted poster={data.poster3.childImageSharp.fluid}>
                      <source src={video3} type="video/mp4" />
                    </video>
                  </div> 
              </div>

              <Footer />
              <div className={styles.credits}>
              
                Sketches by <a href="https://www.instagram.com/mactuitui/" aria-label="Guide" target="_blank" rel="noopener noreferrer"> MacTuiTui</a>
              </div>
            </div>
    )
}


export default IndexPage