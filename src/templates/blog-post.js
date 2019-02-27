import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const theme = {
  green: "#1a967b",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
}

const RecipeStyles = styled.div`
  background: white;
  border: 1px solid ${theme.offWhite};
  border-radius: 10px;
  box-shadow: ${theme.bs};
  margin: 10px 0;
  padding-top: 10px;
  code {
    background-color: ${theme.offWhite};
    color: ${theme.green};
    padding: 5px;
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>{post.frontmatter.title}</h1>
        <p>
          Adapted from{" "}
          <a href={post.frontmatter.link}>
            {post.frontmatter.source || "this recipe"}
          </a>
          <span>
            {`\t`}| Collected by {post.frontmatter.author}
          </span>
        </p>
        Tags: <i>{post.frontmatter.tags}</i>
        <RecipeStyles dangerouslySetInnerHTML={{ __html: post.html }} />
        <p />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        source
        link
        tags
        author
      }
    }
  }
`
