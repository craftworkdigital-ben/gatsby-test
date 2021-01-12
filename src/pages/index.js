import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const pageQuery = graphql`
    query {
        wpPage (slug: { eq: "home" }) {
            title
            dynamicContent {
                flexibleFields {
                    __typename
                }
            }
        }
        allWpPost (sort: { fields: [date] }) {
            edges {
                node {
                    uri
                    title
                    excerpt
                }
            }
        }
    }
`

const HomePage = ({
    data
}) => (
    <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>

        { console.log('data.wpPage?.dynamicContent', data.wpPage?.dynamicContent)}

        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
        </div>

        { data.wpPage?.dynamicContent.flexibleFields?.map((f, i) => (
            <p key={i}>{ f.__typename }</p>
        ))}
    </Layout>
)

export default HomePage
