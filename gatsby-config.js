module.exports = {
    siteMetadata: {
        title: 'Nannou · Creative Coding Framework for Rust',
        titleTemplate: '%s · Nannou',
        author: 'Nannou',
        keywords: ['Nannou', 'Creative Coding', 'Rust', 'Audio', 'Graphics', 'Vulkan', 'Lasers'],
        description:
            'An open-source creative-coding framework for Rust',
        siteUrl: 'https://nannou.cc', // no trailing slash!
        image: '/static/images/josh-profile.jpg',
        owner: 'Nannou',
        social: {
            twitter: '',
            facebook: '',
        },
    },
    plugins: [
        `gatsby-transformer-sharp`,
        'gatsby-plugin-sharp',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        `gatsby-plugin-sitemap`,
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                policy: [
                    { userAgent: '*', allow: '/' },
                ] 
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-140407225-1',
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: false,
                // Setting this parameter is optional but Germany requires it!
                anonymize: true,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: "GatsbyJS",
              short_name: "GatsbyJS",
              start_url: "/",
              background_color: "#f4f4f4",
              theme_color: "#2b2b2b",
              display: "standalone",
              icon: "static/images/icon.png", // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-offline`, // This needs to come AFTER gatsby-plugin-manifest which is why its here
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-responsive-iframe',
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    }
                ]
            }
        }
    ]
}