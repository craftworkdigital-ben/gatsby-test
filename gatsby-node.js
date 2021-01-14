const path = require('path')

const defaultLanguage = 'en'

const getHomepagePaths = (node) => ([
    { id: node?.id, url: `/`, locale: defaultLanguage },
    { id: node?.id, url: `/${defaultLanguage}`, locale: defaultLanguage },
    ...node?.translations?.map(t => ({
        id: t.id,
        url: `/${t?.language?.slug}`,
        locale: t?.language?.slug,
    })),
])

const getSettingsPagePaths = (node) => ([
    { id: node?.id, url: `/${node?.slug}`, locale: defaultLanguage },
    { id: node?.id, url: `/${defaultLanguage}/${node?.slug}`, locale: defaultLanguage },
    ...node?.translations?.map(t => ({
        id: t.id,
        url: `/${t?.language?.slug}/${node?.slug}`,
        locale: t?.language?.slug,
    })),
])

const getDynamicPagePaths = (node) => node?.language?.slug === defaultLanguage ? [
    { id: node?.id, url: `/${node?.slug}`, locale: defaultLanguage },
    { id: node?.id, url: `/${defaultLanguage}/${node?.slug}`, locale: defaultLanguage },
] : [ 
    { id: node?.id, url: `/${node?.language?.slug}/${node?.slug}`, locale: node?.language?.slug },
]

const getPostPaths = (node) => node?.language?.slug === defaultLanguage ? [
    { id: node?.id, url: `/${defaultLanguage}${node?.uri}`, locale: defaultLanguage },
    { id: node?.id, url: node?.uri, locale: node?.language?.uri },
] : [
    { id: node?.id, url: node?.uri, locale: node?.language?.uri },
]

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return graphql(`
        fragment settingsPage on WpPage  {
            id
            slug
            translations {
                id
                language {
                    slug
                }
            }
        }

        query {
            wp {
                siteSettings {
                    options {
                        pages {
                            homepage { ...settingsPage }
                            newsPage { ...settingsPage }
                        }
                    }
                }
            }

            allWpPage {
                nodes {
                    id
                    slug
                    language {
                        slug
                    }
                }
            }
            allWpPost {
                nodes {
                    id
                    uri
                    language {
                        slug
                    }
                }
            }   
        }
    `).then(({ data }) => {
        const homepages = getHomepagePaths(data.wp?.siteSettings?.options?.pages?.homepage)
        const newspages = getSettingsPagePaths(data.wp?.siteSettings?.options?.pages?.newsPage)

        const otherpages = data.allWpPage.nodes.filter(p => [
            ...homepages.map(p => p.id),
            ...newspages.map(p => p.id),
        ].includes(p?.id) === false).map(p => getDynamicPagePaths(p)).reduce((a, b) => [ ...a, ...b ], [])

        const pages = [ ...homepages, ...otherpages ]

        const posts = data.allWpPost.nodes.map(p => getPostPaths(p)).reduce((a, b) => [ ...a, ...b ], [])

        pages.forEach(({ id, url, locale }) => {
            createPage({
                path: url,
                component: path.resolve(`./src/templates/single-page.js`),
                context: { id },
            })
        })

        newspages.forEach(({ id, url, locale }) => {
            createPage({
                path: url,
                component: path.resolve(`./src/templates/archive-post.js`),
                context: { id, locale },
            })
        })
        
        posts.forEach(({ id, url, locale }) => {
            console.log(url)
            createPage({
                path: url,
                component: path.resolve(`./src/templates/single-post.js`),
                context: { id },
            })
        })
    })
}
