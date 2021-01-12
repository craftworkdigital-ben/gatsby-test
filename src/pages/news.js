import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
    query {
        wpPage (slug: { eq: "news" }) {
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

const NewsPage = ({
  data
}) => (
    <Layout>
        <SEO title="Home" />

        <h1>{ data.wpPage?.title}</h1>

        <ul>
            {data.allWpPost?.edges.map(({ node }, i) => (
                <Link key={i} to={node.uri}>
                    <li>{ node.title }</li>
                </Link>
            ))}
        </ul>

        { data.wpPage?.dynamicContent?.flexibleFields?.map((f, i) => (
            <p key={i}>{ f.__typename }</p>
        ))}
    </Layout>
)

export default NewsPage
