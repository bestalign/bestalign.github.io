---
title: 테크니컬 라이팅 - Audience
category: til
tags: ["technical writing"]
date: 2021-07-08 16:39:33
---

좋은 문서는 다음의 수학 방정식으로 표현할 수 있다:

> 좋은 문서 = 독자가 필요로 하는 지식과 기술 - 독자의 현재 지식과 기술

곧, 좋은 문서가 하는 일는 독자가 이미 알고 있지 않는 정보를 전달하는 것이다.

#### 독자를 정의하라

독자를 정의하는데에는 여러 방법이 있지만 좀 쉬운 방법으로는 독자의 역할(role)로 시작할 수 있다. 같은 임무를 가진 사람들은 보통 기본적인 기술과 지식을 가지고 있기 떄문이다.

하지만 역할만으로는 부족하다. 같은 개발자라고 하더라도 여러 많은 프로그래밍 언어와 플랫폼을 사용한다. 여러 다른 프로젝트에서 일하는 개발자들은 다른 기술과 지식을 가지고 있을 수도 있다.

시간도 영향을 줄 수 있다. 오래전에 학교에서 배웠던 미적분학을 개발자들은 모를수도 있다. 또한, 프로젝트에 금방 합류한 개발자와 시니어 개발자의 수준은 다를 수 밖에 없다.

#### 독자가 무엇을 배워야 하는가

목적을 달성하기 위해 독자가 배워야 하는 것을 나열하라. 어떤 경우 독자가 해야하는 일의 리스트가 될 수도 있다.

독자가 해야 할 일에 순서가 필요한 경우도 있다. 예를 들면, 코드를 쓰기 전에 환경 설정을 먼저 해야한다.

디자인 스펙 문서는 특정 작업에 대한 내용보다는 전달할 정보를 가지고 있어야 한다.

##### Examples
###### Instruction document
After reading this document, the audience will know how to do the following tasks:
- Use the API to list items by price
- Use the API to list items by weight
- Use the API to list items by size

###### Design spec document
After reading the design spec, the audience will learn the following:
- Three reasons why the API outperforms the current API we are using.
- How the API works well with the current architecture.

#### 독자에게 맞게 글을 써라

##### Vacobulary and concepts
독자에게 맞는 용어를 써라. 같은 팀원이라면 약어나 구현 세부사항을 알고 있겠지만 다른 팀 혹은 새로운 팀 멤버는 그렇지 않다. 좀 더 설명해야 할지도 모른다.

##### Curse of Knowledge
숙련자에게 익숙한 내용이 새로운 사람에게는 그렇지 않을 경우가 많다. 그 사람이 무엇을 모르는지 알고 그것에 대해 추가적인 설명을 해야한다.

##### Simple words
영어게 익숙하지 않은 사람이 많으므로 가능하면 간단한 단어를 쓰는 것이 좋다.

##### Cultural neutrality and idioms
문화적으로 중립적인 표현을 사용하라. 예를 들어, 야구의 룰을 비유로 들어 설명할 경우 야구를 즐기지 않는 나라에서 온 사람은 이해하기 힘들 것이다.

관용구도 마찬가지다. 영어가 주 언어가 아니거나 다른 영어 문화권에서 온 사람일 경우 이해하지 못할 수 있다. 관용구는 언어의 지식의 저주 (Curse of knowledge)라고도 말할 수 있다.

#### Reference
- [Google Dev Technical Writing 1 - Audience](https://developers.google.com/tech-writing/one/audience)