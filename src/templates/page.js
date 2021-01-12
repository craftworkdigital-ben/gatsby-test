import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export const query = graphql`
    query($slug: String!) {
        wpPage (slug: { eq: $slug }) {
            title
            content
            slug
            date(formatString: "DD-MM-YYYY")
            author {
                node {
                    name
                }
            }
            dynamicContent {
                flexibleFields {
                    __typename
                }
            }
        }
    }
`

export default ({ data }) => {
    const page = data.wpPage

    return (
        <Layout>
            <div>
                <h1>{page.title}</h1>

                { page.dynamicContent?.flexibleFields?.map((f, i) => (
                    <p key={i}>{ f.__typename }</p>
                ))}
            </div>
        </Layout>
    )
}