---
title: package-lock.json은 왜 필요한가?
category: til
tags:
  - node
date: 2021-06-16 15:46:13
---

언젠가부터 node project에 `package.json`과 함께 `package-lock.json` 파일이 생겼다. 왜 `package-lock.json`이 필요할까?

`package-lock.json`은 그 프로젝트가 실제로 사용하고 있는 -- node_modules 폴더에 설치된 -- 모든 의존성 정보 (dependency tree)를 가지고 있다. 이 덕분에 다음과 같은 장점이 있다:

- 항상 같은 의존성을 가지고 프로젝트를 설치/실행 할 수 있다
- 정확히 어떤 의존성이 바뀌었는지 확인할 수 있다
- 이미 어떤 버전을 설치해야 하는지 알기 때문에 설치가 더 빠르다

#### Reference
[NPM package-lock.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json)