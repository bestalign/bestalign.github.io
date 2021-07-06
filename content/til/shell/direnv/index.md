---
title: direnv - 폴더별 환경관리
category: til
tags: ["shell"]
date: 2021-07-05 14:25:24
---

`direnv`는 각 디렉토리마다 환경변수를 다르게 설정할 수 있는 기능을 제공한다. 여러 프로젝트를 동시에 진행할 때 프로젝트마다 AWS Token이나 다른 환경변수가 다른 경우가 있다. `direnv`를 사용하면 프로젝트마다 다른 환경변수를 사용하는 것이 가능하다.

#### Install direnv
```shell
# install on mac
$ brew install direnv
```

#### Configure shell
```shell
## BASH -> ~/.bashrc에 아래 내용 추가
eval "$(direnv hook bash)"

## ZSH -> ~/.zshrc에 아래 내용 추가
eval "$(direnv hook zsh)"
```

#### Configure .direnv

```shell
$ cd project_dir
$ touch .envrc
# update .envrc
$ echo 'export HELLO=world' > .envrc
$ direnv allow
```

#### Reference
- [44Bits - direnv](https://www.44bits.io/ko/post/direnv_for_managing_directory_environment)
- [Outsider's Dev Story - 폴더별 환경 관리를 위한 direnv](https://blog.outsider.ne.kr/1306)
- [Github - direnv](https://github.com/direnv/direnv)