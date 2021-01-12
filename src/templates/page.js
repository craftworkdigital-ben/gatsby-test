import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data }) => {
    const page = data.wpPage
    console.log(page)

    return (
        <Layout>
            <div>
                <h1>{page.title}</h1>

                { page.dynamicContent.flexibleFields.map((f, i) => (
                    <p key={i}>{ f.__typename }</p>
                ))}
                
            </div>
        </Layout>
    )
}

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