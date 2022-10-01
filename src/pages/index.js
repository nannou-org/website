import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Header from "../components/header"
import FooterHomePage from "../components/footer_home_page"
import SEO from "../components/seo"
import styles from "./home.module.scss"

// import wgpu_icon from "../images/icons/wgpu.jpg" // Tell Webpack this JS file uses this image

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
    icon1: file(relativePath: { eq: "images/icons/wgpu.jpg" }) {
      ...iconImage
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

const IndexPage = ({ data }, props) => {
  return (
    <div>
      <div className={styles.grid_container_top}>
        <SEO
          title="Home"
          keywords={[
            "Nannou",
            "About",
            "Education",
            "Presentations",
            "Performances",
            "Installations",
          ]}
        />

        <div className={styles.row1_video_container}>
          <div className={styles.row1_video_inner}>
            <iframe
              title="Nannou Banner Video"
              src="https://player.vimeo.com/video/341078212?autoplay=1&loop=1&autopause=0?muted=1&background=1"
              width="640"
              height="188"
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            />
          </div>

          <div className={styles.nested_row1}>
            <div className={styles.header}>
              <Header />
              {props.children}
            </div>

            <div />

            <div className={styles.nannou_logo}>
              <Img
                fixed={data.logo_image.childImageSharp.fixed}
                alt="nannou_logo"
              />
            </div>
            <div className={styles.banner_description}>
              <h1>An open-source creative-coding framework for Rust</h1>
            </div>
          </div>
        </div>

        <div className={styles.nested_row2}>
          <div className={styles.icons}>
            <div>
              <Img fixed={data.icon1.childImageSharp.fixed} alt="WGPU_icon" />
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
            <div className={styles.icons_text}>
              <h2>Graphics</h2>
            </div>
            <div className={styles.icons_text}>
              <h2>LEDs</h2>
            </div>
            <div className={styles.icons_text}>
              <h2>Lasers</h2>
            </div>
            <div className={styles.icons_text}>
              <h2>Audio</h2>
            </div>
            <div className={styles.icons_text}>
              <h2>GUI</h2>
            </div>
          </div>

          <div className={styles.description}>
            <p>
              Nannou is a library that aims to make it easy for artists to
              express themselves with <strong>simple, fast, reliable</strong>{" "}
              code.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.grid_container_middle}>
        <div className={styles.left_row_text1}>
          <h2>Batteries Included</h2>
          <p>
            One of the beauties of being a creative coder is that we have the
            potential to create works in a wide range of domains. Nannou aims to
            give equal priority to a full suite of creative I/O including
            graphics, multi-windowing, audio, lasers, lighting{" "}
            <a href="https://guide.nannou.cc/why_nannou.html#goals">and more</a>
            .
          </p>
        </div>
        <div className={styles.row3_video}>
          <div className={styles.row3_video_container}>
            <div className={styles.row3_video_inner}>
              <iframe
                title="MacTuiTui Nannou Sketch 1"
                src="https://player.vimeo.com/video/341087852?autoplay=1&loop=1&autopause=0?muted=1&background=1"
                width="640"
                height="480"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen
              />
            </div>
          </div>
        </div>

        <div className={styles.row4_video}>
          <div className={styles.row4_video_container}>
            <div className={styles.row4_video_inner}>
              <iframe
                title="MacTuiTui Nannou Sketch 2"
                src="https://player.vimeo.com/video/341078895?autoplay=1&loop=1&autopause=0?muted=1&background=1"
                width="640"
                height="480"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen
              />
            </div>
          </div>
        </div>

        <div className={styles.right_row_text}>
          <h2>A fast, modern language</h2>
          <p>
            When experimenting with the cutting edge in audiovisual processing
            high performance becomes a necessity. When performing live or
            creating long-running installations reliability becomes equally
            important. Rust ticks these boxes{" "}
            <a href="https://guide.nannou.cc/why_nannou.html#why-rust">
              and more
            </a>
            .
          </p>
        </div>

        <div className={styles.left_row_text2}>
          <h2>Open Source & Liberally Licensed</h2>
          <p>
            Access to these technologies is often expensive and locked behind
            proprietary systems. We believe in democratising this space by open
            sourcing Nannou for everyone to use. You can find the code{" "}
            <a href="https://github.com/nannou-org/nannou">here</a>.
          </p>
        </div>

        <div className={styles.row5_video}>
          <div className={styles.row5_video_container}>
            <div className={styles.row5_video_inner}>
              <iframe
                title="MacTuiTui Nannou Sketch 3"
                src="https://player.vimeo.com/video/341087591?autoplay=1&loop=1&autopause=0?muted=1&background=1"
                width="640"
                height="480"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen
              />
            </div>
          </div>
        </div>

        <div className={styles.row6_video}>
          <div className={styles.row6_video_container}>
            <div className={styles.row6_video_inner}>
              <iframe
                title="MacTuiTui Nannou Sketch 4"
                src="https://player.vimeo.com/video/341102804?autoplay=1&loop=1&autopause=0?muted=1&background=1"
                width="640"
                height="480"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen
              />
            </div>
          </div>
        </div>

        <div className={styles.right_row_text2}>
          <h2>Join Us!</h2>
          <p>
            You can get started with nannou by visiting{" "}
            <a href="https://guide.nannou.cc">the guide</a>. If you need some
            help or simply feel like hanging out with some fellow creative
            coders you are welcome to join us at{" "}
            <a href="https://communityinviter.com/apps/nannou/nannou-slack">
              the nannou slack
            </a> or{" "}
            <a href="https://matrix.to/#/!YGozjjyCcWclgcRQUL:matrix.org?via=matrix.org&via=fairydust.space&via=systemli.org">
              the nannou matrix community
            </a>
            .
          </p>
        </div>
      </div>
      <FooterHomePage />
    </div>
  )
}

export default IndexPage
