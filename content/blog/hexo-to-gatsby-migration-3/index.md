---
title: Hexo에서 Gatsby로 플랫폼 이전하기 3
category: dev
tags: ["gatsby", "migration"]
date: 
draft: true
---


### Gatsby의 이해

제일 처음에 `gatsby-starter-blog`를 사용했기 때문에 아주 간결한 기능 밖에 지원하지 않았다. 새로운 기능을 만들어 넣기 전에 먼저 Gatsby가 어떻게 돌아가는지 이해해야 했다.

#### Gatsby 프로젝트 파일 구조
기본적으로 프로젝트에 다음의 파일이 필요하다.
- `gatsby-config.js`: Gatsby 웹사이트의 메타데이타, 사용하는 플러그인 설정이 여기에 정의된다.
- `gatsby-node.js`: 사이트가 만들어질 때 쓰는 로직을 포함한다. 가장 많이 사용된다.
- `gatsby-browser.js`: 브라우저 상에서 Gatsby의 이벤트를 처리하기 위한 로직을 포함한다. 커스텀 폰트, CSS 파일도 여기에 정의된다.
- `gatsby-ssr.js`: Server-side Rendering (SSR)을 사용할 경우 필요하다. 정적 사이트일 경우 필요없다.

#### Gatsby 라이프사이클
Gatsby는 GraphQL을 중심으로 돌아간다. 마크다운 파일을 폴더에 넣으면 파일을 읽어서 GraphQL DB에 넣은 후 거기에서 정보를 가져와 웹페이지를 만드는 식이다.

`gatsby-starter-blog`는 frontmatter의 `data`, `title`, `description` 필드를 지원한다. 새로운 