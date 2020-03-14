import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./posts.module.scss"

export const query = graphql`
  query($slug: String!) {
    markdown: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        title
        date
        document_type
        tags
      }
      html
    }
  }
`

const Posts = ({ data }) => {
  const {
    markdown: { excerpt, html, frontmatter },
  } = data
  const image = frontmatter.image
    ? frontmatter.image.childImageSharp.resize
    : null
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={excerpt}
        keywords={frontmatter.tags}
        image={image}
      />
      <div className={styles.post}>
        {frontmatter.document_type === "post" &&
          <div>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
          </div>
        }
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default Posts
