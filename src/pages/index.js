import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Header from "../components/header"
import Footer from "../components/footer"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from './home.module.scss'

import logo from '../images/nannou_logo_alpha.png' // Tell Webpack this JS file uses this image
import vulkan_icon from '../images/vulkan_symbol.png'
import led_icon from '../images/leds_symbol.png'
import lasers_icon from '../images/laser_symbol.png'
import audio_icon from '../images/speaker_symbol.png'
import gui_icon from '../images/gui_symbol.png'

import video1 from '../videos/190422.mp4'
import video2 from '../videos/190412.mp4'
import video3 from '../videos/190221.mp4'

export const query = graphql`
  query {
    file(relativePath: { eq: "images/nannou_logo_alpha.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const IndexPage = ({data}, props) => {
    return (
            <div> 
              <div className={styles.grid_container_top}>
                  <SEO title="Home" keywords={["Nannou", "About", "Education", "Presentations", "Performances", "Installations"]}/>

                  <div className={styles.nested_row1}>
                      <div className={styles.header}>
                          <Header />
                              {props.children}
                      </div>
                      <div className={styles.nannou_logo}>
                        <img src={logo} alt="nannou_logo" /> 
                      </div>
                      <div className={styles.banner_description}>
                          <h4>An open-source creative-coding framework for Rust</h4>
                      </div>
                  </div>


                  <div className={styles.nested_row2}>
                      <div className={styles.icons}> 
                        <div className={styles.vk_image}> 
                          <img src={vulkan_icon} alt="vulkan_icon" /> 
                        </div>
                        <div> 
                          <img src={led_icon} alt="led_icon" /> 
                        </div>
                        <div> 
                          <img src={lasers_icon} alt="lasers_icon" />
                        </div>
                        <div> 
                          <img src={audio_icon} alt="audio_icon" /> 
                        </div>
                        <div> 
                          <img src={gui_icon} alt="gui_icon" />
                        </div>
                        <div className={styles.icons_text}><b>Graphics</b></div>
                        <div className={styles.icons_text}><b>LEDs</b></div>
                        <div className={styles.icons_text}><b>Lasers</b></div>
                        <div className={styles.icons_text}><b>Audio</b></div>
                        <div className={styles.icons_text}><b>GUI</b></div>
                      </div>

                      <div className={styles.description}> 
                          <p>Nannou is a library that aims to make it easy for artists to express themselves with <b>simple, fast, reliable</b> code.</p>
                      </div>
                  </div>
              </div>

              <div className={styles.grid_container_middle}>  
                  <div className={styles.left_row_text1}>
                      <h4>Batteries Included</h4>
                      <p>One of the beauties of being a creative coder is that we have the potential to create works in a wide range of domains. Nannou aims to give equal priority to a full suite of creative I/O including graphics, multi-windowing, audio, lasers, lighting and more.</p>
                  </div>
                  <div className={styles.row3_video}> 
                    <video loop="true" autoplay="autoplay" muted>
                      <source src={video1} type="video/mp4" />
                    </video>
                  </div>

                  <div className={styles.row4_video}> 
                    <video loop="true" autoplay="autoplay" muted>
                      <source src={video2} type="video/mp4" />
                    </video>
                  </div>

                  <div className={styles.right_row_text}>
                      <h4>A fast, modern language</h4>
                      <p>When experimenting with the cutting edge in audiovisual processing high performance becomes a necessity. When performing live or creating long-running installations reliability becomes equally important. Rust ticks these boxes and more.</p>
                  </div>

                  <div className={styles.left_row_text2}>
                      <h4>Open Source & Liberally Licensed</h4>
                      <p>Access to these technologies is often expensive and locked behind proprietary systems. We believe in democratising this space by open sourcing Nannou for everyone to use.</p>
                  </div>

                  <div className={styles.row5_video}> 
                    <video loop="true" autoplay="autoplay" muted>
                      <source src={video3} type="video/mp4" />
                    </video>
                  </div> 
              </div>

              <Footer />
            </div>
    )
}


export default IndexPage