const path = require('path')

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField} = actions

    if (node.internal.type == "MarkdownRemark") {
        const slug = path.basename(node.fileAbsolutePath, '.md') 
        
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    //1. Get path to template
    const postsTemplate = path.resolve('./src/templates/posts.js')
    
    //2. Get markdown data
    const res = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            document_type
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)
    
    //3. create new pages
    res.data.allMarkdownRemark.edges.forEach((edge) => {
        {edge.node.frontmatter.document_type == 'post' ? createPage({
            component: postsTemplate,
            path: `/posts/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        }) : 
        createPage({
            component: postsTemplate,
            path: `${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })} 
        // createPage({
        //     component: postsTemplate,
        //     path: `'posts/'${edge.node.fields.slug}`,
        //     context: {
        //         slug: edge.node.fields.slug
        //     }
        // })
    })
}