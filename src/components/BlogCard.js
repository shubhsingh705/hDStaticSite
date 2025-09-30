import React from "react"
import { Grid2, Typography } from "@mui/material"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function BlogCard(props){
    const {post, title, image} = props;
    console.log('image in post', post, title)
    const imageToPass = getImage(image);
    return(
        <Grid2 size={{xs:12, sm:6}} key={post.fields.slug}>
            <Link to={post.fields.slug}>
                <GatsbyImage 
                    image={imageToPass}
                    alt="PosterImage"
                />
            </Link>
            <Typography variant="caption" color="textSecondary">
                <span style={{fontWeight:'bold'}}>{post.frontmatter.author}</span>
                <span> | </span>
                <span>{post.frontmatter.date}</span>
                <span> | </span>
                <span>{post.frontmatter.timeToRead} min read</span>
            </Typography>
            <Typography variant="h5" sx={{fontWeight:'bold'}}>{post.frontmatter.description}</Typography>
            <Typography variant="body2" color="textSecondary">{post.excerpt}</Typography>
        </Grid2>
    )
}

export default BlogCard;

{/* <li key={post.fields.slug}>
    <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
    >
        <header>
        <h2>
            <Link to={post.fields.slug} itemProp="url">
            <span itemProp="headline">{title}</span>
            </Link>
        </h2>
        <small>{post.frontmatter.date}</small>
        </header>
        <section>
        <p
            dangerouslySetInnerHTML={{
            __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
        />
        </section>
    </article>
</li> */}