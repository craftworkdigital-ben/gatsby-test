import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const pageQuery = graphql`
    query {
        allWpPost(sort: { fields: [date] }) {
            edges {
                node {
                    title
                    excerpt
                }
            }
        }
    }
`

const IndexPage = ({
  data
}) => (
    <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>

        {data.allWpPost.edges.map(({ node }) => (
            <div>
            <p>{node.title}</p>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
        ))}

        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
)

export default IndexPage
