const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return graphql(`
        {
            allWpPage {
                edges {
                    node {
                        uri
                        slug
                    }
                }
            }
            allWpPost {
                edges {
                    node {
                        uri
                        slug
                    }
                }
            }   
        }
    `).then(result => {
        const pages = result.data.allWpPage.edges.filter(p => [
            // TODO: Add any pages that should have a custom template here
            // '/home/',
            '/news/',
        ].includes(p.node.uri) === false)

        pages.forEach(({ node }) => {
            createPage({
                path: node.uri === '/home/' ? '/' : node.uri,
                component: path.resolve(`./src/templates/page.js`),
                context: {
                    slug: node.slug,
                },
            })
        })
        result.data.allWpPost.edges.forEach(({ node }) => {
            createPage({
                path: node.uri,
                component: path.resolve(`./src/templates/post.js`),
                context: {
                    slug: node.slug,
                },
            })
        })
    })
}
