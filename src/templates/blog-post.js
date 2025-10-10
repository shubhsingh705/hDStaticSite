import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  // --- 1. Identify the Current Post ---
  console.log('pageContext in blog post', pageContext);
  const wpPost = data.wpPost;
  const mdPost = data.markdownRemark;

  // The current post is the one that is NOT null
  const currentPost = wpPost || mdPost;
  const isWordPress = !!wpPost;
  let posterImage;
  if(isWordPress) posterImage = getImage(wpPost.featuredImage?.node);

  // Handle case where post is not found (e.g., if ID was bad)
  if (!currentPost) {
    return (
      <Layout location={location} title="Post Not Found">
        <p>The content for this post could not be loaded.</p>
      </Layout>
    );
  }
  
  // Define consistent fields for the current post
  const title = isWordPress ? currentPost.title : currentPost.frontmatter.title;
  const date = isWordPress ? currentPost.date : currentPost.frontmatter.date;
  const htmlContent = isWordPress ? currentPost.content : currentPost.html;
  
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  // --- 2. Identify Navigation Posts ---
  // The navigation post will be the one that is NOT null from the two queries (MD or WP)
  const previousPost = data.previousMD || data.previousWP;
  const nextPost = data.nextMD || data.nextWP;

  // Helper function to get the path and title from a navigation object
  const getNavProps = (navPost) => {
    if (!navPost) return { path: null, title: null };
    
    // Check if it's a WordPress post (has a 'uri' field)
    const isWp = !!navPost.uri; 
    
    return {
      // Use direct fields for WP, nested for MD
      title: isWp ? navPost.title : navPost.frontmatter.title,
      // Use uri for WP, fields.slug for MD
      path: isWp ? navPost.uri : navPost.fields.slug,
    };
  };

  const prevNav = getNavProps(previousPost);
  const nextNav = getNavProps(nextPost);
  
  return (
    <Layout location={location} title={siteTitle} isBlog={true}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {posterImage ? (
          <GatsbyImage 
            image={posterImage}
            alt="Poster Image"
            style={{marginBottom:'20px'}}
          />
        ):null}
        <header>
          <h1 itemProp="headline">{title}</h1>
          <p>{date}</p>
        </header>
        
        {/* Render the HTML content */}
        <section
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          itemProp="articleBody"
        />
        
        <hr />
        <footer>
          {/* Assuming Bio component is available */}
          <Bio /> 
        </footer>
      </article>
      
      {/* Navigation section */}
      <nav className="blog-post-nav">
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
            {previousPost && (
              <Link to={prevNav.path} rel="prev">
                ← {prevNav.title}
              </Link>
            )}
          </li>
          <li>
            {nextPost && (
              <Link to={nextNav.path} rel="next">
                {nextNav.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export const Head = ({ data }) => {
    // 1. Identify the current post data object
    const wpPost = data.wpPost;
    const mdPost = data.markdownRemark;
    const currentPost = wpPost || mdPost;
    const isWordPress = !!wpPost;

    // Handle case where post is not found
    if (!currentPost) {
        return <Seo title="Post Not Found" />;
    }

    // 2. Define consistent variables for SEO fields
    // NOTE: WordPress post object has 'excerpt' and 'description' fields, 
    // but the Markdown frontmatter only has 'description' and the main node has 'excerpt'.
    const title = isWordPress ? currentPost.title : currentPost.frontmatter.title;
    
    // We check for the explicit description field first, then fall back to the excerpt.
    const description = isWordPress
        ? currentPost.excerpt || "Default description for WP post."
        : currentPost.frontmatter.description || mdPost.excerpt;

    return (
        <Seo
            title={title}
            description={description}
        />
    );
};

export default BlogPostTemplate

export const query = graphql`
query BlogPostById(
    $id: String!
		$previousPostId: String
  	$nextPostId: String
  ) {
    # Fetch site metadata (same as before)
    site {
      siteMetadata {
        title
      }
    }
    
    wpPost: wpPost(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
      uri
      featuredImage {
        node {
          gatsbyImage(
            width: 1200 
            layout: FULL_WIDTH 
            aspectRatio: 2.1 
            cropFocus: CENTER
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    
    markdownRemark: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
    
    previousMD: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }

    previousWP: wpPost(id: { eq: $previousPostId }) {
      title
      uri
    }
    
    nextMD: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    
    nextWP: wpPost(id: { eq: $nextPostId }) {
      title
      uri
    }
  }
`;
