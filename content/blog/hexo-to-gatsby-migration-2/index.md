---
title: Hexo에서 Gatsby로 플랫폼 이전하기 2
category: dev
tags: ["gatsby", "migration"]
date: 2021-06-23 11:48:10
---

이전 블로그를 운영하면서 불편했던 점이 있었다. 바로 최초 환경 세팅과 배포였다. 그것 때문에 글쓰기를 시작조차 안하는 경우가 있었고 이번에는 그 허들을 좀 더 낮추고 싶었다.

### 환경 세팅

이전에는 새로운 컴퓨터에서 블로그 글을 쓰는 것이 쉽이 않았다. 저장소를 클론하고 Node같은 필요한 프로그램을 설치하고 그 외의 모든 세팅을 하고 나서야 할 수 있었기 때문이다. 

그래서 선택한 것이 도커 (Docker)다. 약간의 공이 들긴 하지만 일단 해놓으면 다음에는 훨씬 쉽게 환경 세팅을 할 수 있다. `dockerfile`과 몇 개의 쉘스크립트 파일로 이제는 몇 라인만 입력하면 바로 새 글을 작성할 수 있다.

1. 도커 설치
2. 저장소 클론
3. 쉘 스크립트 실행

<br />

자세한 내용은 [README](https://github.com/bestalign/bestalign.github.io/blob/source/README.md) 파일에 적어놔서 저장소만 가면 바로 볼 수 있도록 했다.

### 배포

Hexo에서 배포를 할 때는 publish 명령어로 페이지를 생성하고 Github pages를 설정해놓은 다른 저장소에 push를 해야했다. 복잡하고 관리하기도 힘들었다.

이번에는 깃헙 액션 덕분에 그냥 쓴 글을 push 하는 것만으로 자동으로 처리되도록 할 수 있었다. 액션에서 사용할 ACCESS TOKEN을 설정하는 것이 약간의 시간이 걸렸지만 그 외에는 아주 쉽게 할 수 있었다.

```yaml
name: Gatsby Publish

on:
  push:
    branches:
      - source

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: enriikke/gatsby-gh-pages-action@v2
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
          deploy-branch: gh-pages 
```

### Reference
- [README](https://github.com/bestalign/bestalign.github.io/blob/source/README.md)
- [Gatsby publish](https://github.com/marketplace/actions/gatsby-publish)