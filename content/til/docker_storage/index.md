---
title: 도커 스토리지 (Docker Storage)
category: til
tags:
  - docker
date: 2021-06-16 16:21:37 
---

기본적으로 컨테이너는 분리된 환경에서 실행되기 때문에 컨네이너 내부에 저장된 정보들은 컨테이너의 삭제와 함께 사라진다. 하지만 대부분 애플리케이션은 -- 예: 데이터베이스 -- 저장된 정보를 따로 저장하고 관리해야 한다. 그래서 도커는 스토리지 기능을 제공하며 크게 다음과 같은 종류가 있다.

![types of mounts](/types-of-mounts.png)
(image by [Docker](https://docs.docker.com/storage/))

#### Volume
도커가 관리하는 공간에 볼륨을 생성하고 관리한다. 동시에 여러 컨테이너에 마운트 할 수 있고, 여러 컨테이너의 애플리케이션에서 동시에 접근 할 수 있다.

#### Bind mount
호스트의 특정 디렉토리를 컨테이너에 마운트한다. 강력한 기능이지만 컨테이너에서 호스트의 파일시스템에 접근할 수 있으므로 시큐리티 문제가 생길 수 있다. 일반적인 상황에서는 볼륨을 사용하는 것을 추천한다.

### tmpfs mount
리눅스에서만 사용할 수 있는 기능으로, 메모리에 저장공간을 할당해 마운트한다. 위의 두 종류와는 달리 오랫동안 저장할 필요가 없거나 민감한 정보를 저장할 때 사용할 수 있다. 컨테이너가 멈추면 모든 데이터는 사라진다.

##### Reference
- [Docker Docs - Storage](https://docs.docker.com/storage/)
- [Dev Eric - 도커 볼륨의 종류](https://deveric.tistory.com/111)