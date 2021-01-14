import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.wpPost

    return (
        <Layout>
            <div>
                <Img fluid={post?.featuredImage?.node?.localFile?.childImageSharp?.fluid} />

                {/* <Image />
                <img src={`http://localhost:3000${post.featuredImage?.node?.mediaItemUrl}`} /> */}

                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <p> By: {post.author.node.name} </p>
                <p> On: {post.date} </p>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        wpPost (id: { eq: $id }) {
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
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`