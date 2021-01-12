require("dotenv").config({ path: `.env` })

module.exports = {
    siteMetadata: {
        title: `Gatsby Default Starter`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        // `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                // failOnError: false,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-wordpress-experimental`,
            options: {
                url: `http://localhost:4000/wp/graphql`,
                develop: {
                    hardCacheMediaFiles: true,
                },
                verbose: true,
                // schema: {
                //     timeout: 100000,
                // },
                // html: {
                //     useGatsbyImage: false,
                //     createStaticFiles: false,
                // },
                excludeFieldNames: [`blocksJSON`, `saveContent`],
                type: {
                    Post: {
                        // limit: process.env.NODE_ENV === `development` ? 50 : null,
                        limit: 50,
                    },
                    MediaItem: {
                        localFile: {
                            // excludeByMimeTypes: [`image/svg+xml`],
                            // maxFileSizeBytes: 0,
                        },
                    },
                    // MediaItem: {
                    //     exclude: true,
                    // },
                    // this shows how to exclude entire types from the schema
                    // these examples are for wp-graphql-gutenberg
                    CoreParagraphBlockAttributes: {
                        exclude: true,
                    },
                    CoreParagraphBlockAttributesV2: {
                        exclude: true,
                    },
                    CorePullquoteBlockAttributes: {
                        exclude: true,
                    },
                },  
                
            },
        },
        `gatsby-transformer-sharp`,
        // {
        //     resolve: `gatsby-plugin-manifest`,
        //     options: {
        //         name: `gatsby-starter-default`,
        //         short_name: `starter`,
        //         start_url: `/`,
        //         background_color: `#663399`,
        //         theme_color: `#663399`,
        //         display: `minimal-ui`,
        //         icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        //     },
        // },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /\.inline\.svg$/, // See below to configure properly
                },
            },
        },
    ],
}
