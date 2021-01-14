const path = require('path')

const defaultLanguage = 'en'

const createSlug = (node) => {
    if (node.language.slug === defaultLanguage) {
        if (node.isFrontPage) return [ `/`, `/${node.language.slug}/` ]
        else return [ `/${node.slug}`, `/${node.language.slug}/${node.slug}` ]
    } else {
        const defaultPage = node.translations.find(t => t.language.slug === defaultLanguage)

        if (defaultPage) {
            if (defaultPage.isFrontPage) return [ `/${node.language.slug}/` ]
            else return [ `/${node.language.slug}/${defaultPage.slug}` ]
        } else {
            return [ `/${node.language.slug}/${node.slug}` ]
        }
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return graphql(`
        {
            allWpPage {
                edges {
                    node {
                        uri
                        slug
                        isFrontPage
                        language {
                            slug
                        }
                        translations {
                            slug
                            isFrontPage
                            language {
                                slug
                            }
                        }
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
        result.data.allWpPage.edges.forEach(({ node }) => {
            const slugs = createSlug(node)

            slugs.forEach(p => {
                createPage({
                    path: p,
                    component: path.resolve(`./src/templates/page.js`),
                    context: {
                        slug: node.slug,
                    },
                })
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
