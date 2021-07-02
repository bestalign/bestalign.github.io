---
title: 테크니컬 라이팅 - Short Sentence 1
category: til
tags: ["technical writing"]
date: 2021-07-02 12:03:59
---

짧은 코드가 좋은 것처럼 짧은 글이 다음과 같은 이유로 더 좋다:
- 더 빨리 읽을 수 있다
- 유지보수하기 더 쉽다
- 글이 길면 더 많은 문제가 생길 수 있다

#### 문장 하나마다 하나의 주제에 집중하라

프로그램이 하나의 작업에 집중하듯이 문장도 하나의 주제에 집중해야 한다.

##### Example
In bash, use the if, then, and fi statements to implement a single conditional branching block in which the if statement evaluates an expression, the then statement introduces a block of statements to run when the if statement is true, and the fi statement marks the end of the conditional branching block. <br/>
=> In bash, use the if, then, and fi statements to implement a single conditional branching block. In the block, the if statement evaluates an expression. The then statement introduces a block of statements to run when the if statement is true. And, the fi statement marks the end of the conditional branching block.

#### 긴 문장은 리스트로 만들어라

긴 문장에 접속사 or 이 있을 경우 불렛 리스트로 만드는 것을 고려해라.

##### Example
To get started with the Frambus app, you must first find the app at a suitable store, pay for it using a valid credit or debit card, download it, configure it by assigning a value the `Foo` variable in the `/etc/Frambus` file, and then run it by saying the magic word twice. <br/>
=> To get started with the Frambus app:
1. find the app at a suitable store.
2. pay for it using a valid credit or debit card.
3. download it.
4. configure it by assigning a value the `Foo` varaible in the `/etc/Frambus` file.
5. run it by saying the magic word twice.

#### Reference
- [Google Dev Technical Writing 1 - short sentence](https://developers.google.com/tech-writing/one/short-sentences)