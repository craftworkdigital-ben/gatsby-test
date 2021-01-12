import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data }) => {
    const post = data.wpPost
    console.log(post)

    return (
        <Layout>
            <div>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <p> By: {post.author.node.name} </p>
                <p> On: {post.date} </p>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($slug: String!) {
        wpPost (slug: { eq: $slug }) {
            title
            content
            slug
            date(formatString: "DD-MM-YYYY")
            author { 
                node {
                    name
                }
            }
            featuredImage {
                node {
                    mediaItemUrl
                }
            }
        }
    }
`