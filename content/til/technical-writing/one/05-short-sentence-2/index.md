---
title: 테크니컬 라이팅 - Short Sentence 2
category: til
tags: ["technical writing"]
date: 2021-07-02 16:22:14
---

#### 관계없는 단어를 없애거나 줄여라

쓸데없이 자리만 차지하고 도움이 되지 않는 단어가 있다.

다음과 같은 단어들은 짧게 줄일 수 있다:
- at this point in time => now
- determine the location of => find
- is able to => can

##### Examples
In spite of the fact that Arnold writes buggy code, he writes error-free documentation. <br/>
=> Arnold write buggy code, but he writes error-free documentation.

Changing the sentence from passive voice to active voice enhances the clarification of the key points. <br/>
=> Changing the sentence from passive voice to active voice clarifies the key points.

Determine whether Rikona is able to write code in COBOL <br/>
=> Determine whether Rikona can write code in COBOL.

Frambus causes the production of bugs, which will be chronicled in logs by the LogGenerator method. <br/>
=> Frambus generates bugs that the LogGenerator method logs.

#### 종속절을 줄여라

문장은 주절과 종속절로 나눌 수 있다.
- 주절: 중심이 되는 주제를 포함
- 종속절: 부차적인 내용을 포함

<br/>

"한 문장에 하나의 주제"라는 것을 기억하라. 만약 종속절이 문장의 주제를 확장하는 것이 아니라 주제에서 벗어난다면 문장을 나누어라.

##### Examples
Bash is a modern shell scripting langauge that takes many of its features from KornShell88, which was developed by at Bell Labs. <br/>
=> Bash is a modern shell scripting langauge that takes many of its features from KornShell88. KornShell88 was developed by at Bell Labs.

Lisp is a programming language that relies on Polish prefix notation, which is one of the systems invented by the Polish logician Jan Łukasiewicz. <br/>
=> Lisp is a programming language that relies on Polish prefix notation. Polish prefix notation is one of the systems invented by the Polish logician Jan Łukasiewicz.

#### Which와 that을 구분하라

that과 which 모두 종속절을 만들기 위해 필요하다. 하지만 둘의 역할은 살짝 다르다. that이 있는 종속절은 필수적인 내용을 위해서라면 which이 있는 종속절은 꼭 필요한 내용은 아니다.

사실 which도 that과 같은 역할을 할 수 있다. 콤마의 유무로 구분할 수 있다. 콤마가 없다면 필수적인, 콤마가 있다면 부가적인 내용이다.

##### Examples
Python is an interpreted language, which was Guido van Rossum invented.

Fortran is perfect for mathmetical calculations that don't involve linear algebra.

#### Reference
- [Google Dev Technical Writing 1 - short sentence](https://developers.google.com/tech-writing/one/short-sentences)