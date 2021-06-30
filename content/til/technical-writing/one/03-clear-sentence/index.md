---
title: 테크니컬 라이팅 - Clear Sentence
category: til
tags: ["technical writing"]
date: 2021-06-29 23:41:45
---

#### 적절한 동사를 사용하라
정확하고 명확한 동사를 사용하라. 다음과 같은 몇 개의 동사만 돌려쓰면 지루하다.
- be 동사
- occur
- happen

##### Examples
- When a variable declaration doesn't have a datatype, a compiler errors happens.
  - When a variable declaration doesn't specify a datatype, the compiler generates an error message.
- Compiler errors occur when you leave off a semicolon at the end of a statement.
  - A missing semicolon at the end of a statement triggers compiler errors.

#### There is/There are 의 사용을 줄여라

There is/There are는 지루하다.

- 문장 내에 진짜 주어와 동사가 있는 경우가 있다. 그럴 경우 There is/There are을 없애고 완전한 문장으로 만들어라.
- 문장 내에 진짜 동사가 없는 경우도 있다. 적당한 동사를 만들어서 완전한 문장으로 바꾸어라.

##### Examples
- There is a variable called `met_trick` that stores the current accuracy.
  - A varaible called `met_trick` stores the current accuracy.
- There is no guarantee that the updates will be received in sequential order.
  - Clients might not receive the updates in sequential order.

#### 형용사와 부사는 조심해서 사용하라
형용사와 부사는 테크니컬 문서에서 사용하기에 충분히 정확하게 정의되어 있지 않다. 읽는 사람의 관심을 끌어낼 수 있을지는 몰라도 그 뿐이다. 형용사와 부사 대신 객관적인 숫자를 이용하라.

##### Example
- Setting this flag makes the application run screamingly fast.
  - Setting this flag makes the application run 3 times faster.

#### Reference
- [Google Dev Technical Writing 1 - clear sentence](https://developers.google.com/tech-writing/one/clear-sentences)