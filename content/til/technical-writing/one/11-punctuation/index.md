---
title: 테크니컬 라이팅 - punctuation
category: til
tags: ["technical writing"]
date: 2021-07-17 16:40:58
---

#### Commas

프로그래밍 언어와는 달리 영어의 comma 룰은 확실하지 않다. 문장을 읽다가 자연스럽게 잠깐 멈추는 곳에 comma를 넣어라.

Embedded list item 사이에 comma를 넣어라.

조건문일 경우 조건과 결과 사이에 comma를 넣어라.

문장 내에서 간단한 정의나 추가적인 설명을 끼워넣을 때에 comma로 감싸라.

두 독립적인 문장을 comma로 연결하지마라. 이런 문법적 문제를 comma splice라고 부른다.

##### Examples
C behaves as a mid-level language, just a couple of steps up in abstraction from assembly language.

Our company uses C++, Python, Java, and JavaScript.

If the program runs slowly, then try the --perf flag.

Python, an easy-to-use language, has gained significant momentum in recent years.

#### Semicolons

개별적인 문장은 마침표로 나누고 깊게 관련되어 있는 문장은 semicolon으로 연결하라.

두 문장은 문법적으로 완벽한 문장이어야 하고 두 문장의 순서를 바꾸었을 때에도 말이 되어야 한다.

semicolon 바로 뒤에 접속사/접속절을 넣을 수도 있다.

##### Examples

Rerun Frambus after updating your configuration file; don't rerun Frambus after updating existing source code.

Even seemingly trivial code changes can cause bugs; therefore, write abundant unit tests.

#### Em-Dashes

Em-dash은 comma보다 더 긴 멈춤을 나타내고 comma와 같은 역할을 한다. 둘의 정확한 용법상 차이점은 없다.

##### Examples

C++ is a rich language—one requiring extensive experience to master.

**Protocol** Buffers—often nicknamed **protobufs**—encode structured data in an efficient yet extensible format.

#### Parenthesis

Parenthesis는 사소한 내용이나 문장을 끼워넣을 때 사용한다. 중요하지 않은 내용을 넣을 때 사용하므로 최소한으로 사용하는 게 좋다.

문장 전체를 감쌀 때에는 마침표까지 같이 감싸고, 문장의 마지막에 부분적으로 넣을 때에는 마침표는 바깥에 표기하라.

##### Examples

(Incidentally, Protocol Buffers make great birthday gifts.)

Binary mode relies on the more compact native form (described later in this document).

#### Reference
- [Google Dev Technical Writing 1 - Punctuation](https://developers.google.com/tech-writing/one/punctuation)