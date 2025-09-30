/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Grid2, Typography } from "@mui/material"
// import coverrImage from '../images/coverImage.jpg' 
import { StaticImage } from 'gatsby-plugin-image'

const Bio = () => {
  // const data = useStaticQuery(graphql`
  //   query BioQuery {
  //     site {
  //       siteMetadata {
  //         author {
  //           name
  //           summary
  //         }
  //         social {
  //           twitter
  //         }
  //       }
  //     }
  //   }
  // `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  // const author = data.site.siteMetadata?.author
  // const social = data.site.siteMetadata?.social

  return (
    <Grid2 
      container 
      sx={{
        width: '100%',
        height: '320px',
        position: 'relative',
        sm:{ height: '400px' }
      }}>
      <Typography 
        sx={{
          position:'absolute',
          left:'20px',
          top:'40px', 
          fontFamily:'Quicksand',
          fontWeight:'bold',
          fontSize:'55px',
          color:'rgb(240, 95, 64)',
          zIndex:'1',
          '&:hover':{
            cursor:'pointer',
          }
        }}
      >
        hyperDart
      </Typography>
      <Typography 
        sx={{
          position:'absolute',
          left:'20px',
          top:'110px', 
          fontFamily:'Quicksand',
          fontWeight:'bold',
          fontSize:'15px',
          color:'rgb(240, 95, 64)',
          zIndex:'1',
        }}
      >
        future of search engine
      </Typography>
      {/* <Typography 
        sx={{
          position:'absolute',
          right:'100px',
          top:'50px', 
          fontFamily:'Quicksand',
          fontWeight:'bold',
          fontSize:'30px',
          color:'rgb(240, 95, 64)',
          zIndex:'1',
        }}
      >
        Our aim
      </Typography>
      <Typography 
        sx={{
          position:'absolute',
          right:'20px',
          top:'70px', 
          fontFamily:'Quicksand',
          fontWeight:'bold',
          fontSize:'15px',
          color:'rgb(240, 95, 64)',
          zIndex:'1',
          maxWidth:'250px'
        }}
      >
        To present information through 'expert-powered smart cards'—called Darts—which are curated by knowledgeable creators in various fields, providing context-rich, trustworthy results beyond traditional algorithm-driven search engines
      </Typography> */}
      <StaticImage 
        src={'../images/coverImage.jpg'}
        alt={'hyperdartImage'}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </Grid2>
  )
}

export default Bio
