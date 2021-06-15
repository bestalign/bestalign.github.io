module.exports = {
  siteMetadata: {
    title: `bestalign's dev blog`,
    author: {
      name: `최정렬`,
      summary: `who lives and works in Seattle.`,
    },
    description: `bestalign's dev blog`,
    siteUrl: `https://bestalign.github.io/`,
    social: {
      twitter: `bestalign`,
    },
    categories: [
      { name: `home`, url: `/`, displayText: `홈`, priority: 0, generatePage: false },
      { name: `dev`, url: `/dev`, displayText: `개발`, description: `개발, 기술, 방법론 등에 관한 글입니다.`, priority: 1, generatePage: true },
      { name: `translation`, url: `/translation`, displayText: `번역`, description: `관심이 있어 번역한 개발, 기술 글입니다.`, priority: 2, generatePage: true },
      { name: `everydaylife`, url: `/everydaylife`, displayText: `일상`, description: `일상생활의 잡다한 글입니다.`, priority: 3, generatePage: true }
    ]
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/til`,
    //     name: `til`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-37673421-2`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: {draft: {ne: true}}}
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/atom.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `bestalign's dev blog`,
        short_name: `dev blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,

    // below two plugins are to support the old post URLs, which were used on Hexo
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect'
  ],
}
