import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

export const query = graphql`
    query($id: String!, $locale: String!) {
        wpPage (id: { eq: $id }) {
            title
            content
            slug
            date(formatString: "DD-MM-YYYY")
            author {
                node {
                    name
                }
            }
            # dynamicContent {
            #     flexibleFields {
            #         __typename
            #     }
            # }
        }

        allWpPost(filter:{ language:{ slug:{ eq: $locale }}} sort: { fields: [date] }) {
            nodes {
                uri
                title
                excerpt
            }
        }
    }
`

export default ({ data }) => {
    const page = data.wpPage
    const posts = data.allWpPost?.nodes

    return (
        <Layout>
            <div>
                <h1>{page.title}</h1>

                { posts?.map((p, i) => (
                    <div key={i}>
                        <Link to={p.uri}>
                            <h4>{ p.title }</h4>
                        </Link>

                        <div dangerouslySetInnerHTML={{ __html: p.excerpt}} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}