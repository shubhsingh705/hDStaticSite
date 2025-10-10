import * as React from "react"
import { graphql } from "gatsby"
import { Card, Grid2 } from "@mui/material"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogCard from "../components/BlogCard"
import Tabs from "../components/Tabs"
import { useState } from "react"

const EXCERPT_LENGTH = 180; 

const getExcerpt = (wpPost, mdPost) => {
    const isWordPress = !!wpPost;
    let text = '';
    if (isWordPress) {
        text = wpPost.excerpt || '';
        text = text.replace(/<\/?p>/g, '');
        text = text.replace(/\[&hellip;\]/g, '');
        text = text.trim();         
    } else if (mdPost) {
        text = mdPost.excerpt || '';
    }
    if (text.length > EXCERPT_LENGTH) {
        return text.substring(0, EXCERPT_LENGTH).trim() + '...';
    }
    return text;
};

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const postsMD = data.allMarkdownRemark.nodes
  let postsWP = data.allWpPost.nodes
  // now lets modify the structure of postsWP to match postsMD
  postsWP = postsWP.map(post => {
    return {
      excerpt: getExcerpt(post, null),
      fields: {
        slug: post.slug
      },
      frontmatter: {
        date: post.hdBlogFields?.date,
        title: post.hdBlogFields?.title,
        description: post.hdBlogFields?.seoDescription,
        author: post.hdBlogFields?.authorName,
        timeToRead: post.hdBlogFields?.readingTime
      },
      posterImage: post.featuredImage?.node
    }
  })
  const posts = postsMD.concat(postsWP);
  
  const posterImages = data.allImageSharp.nodes;
  console.log('allImageSharp', data)
  const [selectedTab, setSelectedTab] = useState(0)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab == 0 ? 
        <ol style={{ listStyle: `none` }}>
          <Grid2 container columnSpacing={3} rowSpacing={5}>
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug
              const image = posterImages.find(image => image.parent.name == post.fields.slug.replace(/\//g, ''));
              return (
                <BlogCard post={post} title={title} key={post.fields.slug} image={post?.posterImage || image} />
              )
            })}
          </Grid2>
        </ol>
      :null}

      {selectedTab == 1 ? 
        <h5>Company</h5>
      :null}

      {selectedTab == 2 ? 
        <h5>About Us</h5>
      :null}
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        author
        timeToRead
      }
    }
  }
  allImageSharp {
    nodes {
      id
      gatsbyImageData(
        transformOptions: {cropFocus: CENTER}
        placeholder: BLURRED
        aspectRatio: 1.5
      )
      parent {
        ... on File {
          name
        }
      }
    }
  }
  allWpPost {
    nodes {
      excerpt
      slug
      hdBlogFields {
        authorName
        date(formatString: "MMMM DD, YYYY")
        readingTime
        seoDescription
        title
      }
      featuredImage {
        node {
          gatsbyImage(
            width: 1200 
            layout: FULL_WIDTH 
            aspectRatio: 1.5 
            cropFocus: CENTER
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
}
`
