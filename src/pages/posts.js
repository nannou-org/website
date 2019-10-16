import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import blogStyles from "./posts.module.scss"

const BlogPage = () => {
  // Fetch the Markdown post data
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO
        title="Posts"
        keywords={[
          "Nannou",
          "Research",
          "Audiovisual",
          "MindBuffer",
          "Granular Synthesis",
        ]}
      />
      <div className={blogStyles.posts}>
        <h1>Posts</h1>
      </div>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <li className={blogStyles.post} key={edge.title}>
              <Link to={`/posts/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.date}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage
