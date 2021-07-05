---
title: 테크니컬 라이팅 - Paragraphs
category: til
tags: ["technical writing"]
date: 2021-07-05 13:54:36
---

> The work of writing is simply this: untangling the dependencies among the parts of a topic, and presenting those parts in a logical stream that enables the reader to understand you.

> 글쓰기는 간단히 말해 다음과 같다: 주제 안에 복잡하에 얽혀있는 내용을 논리적으로 풀어써서 독자가 이해할 수 있게 하는 것.

#### 적절한 첫 문장을 써라

문단의 첫 문장은 가장 중요하다. 첫 문장은 그 문단의 핵심내용을 가지고 있어야 한다. 바쁜 독자들은 첫 문장만 읽고 문단을 건너뛰기도 하므로 첫 문장을 가장 신경써서 써야한다.

##### Example

A loop runs the same block of code multiple times. For example, suppose you wrote a block of code that detected whether an input line ended with a period. To evaluate a million input lines, create a loop that runs a million times.

#### 각 문단마다 하나의 주제에 집중하라

각 문단은 하나의 주제에 대해서만 이야기해야한다. 이전 혹은 다음 문단의 내용이 있다면 삭제하거나 적절한 문단으로 옮겨라.

#### 문단은 너무 짧거나 길면 안된다

너무 긴 문단은 독자들이 겁먹게 만든다. 보통 한 문단에 3-5 문장 정도가 적당하고 7 문장이 넘어갈 경우 문단을 나누는 것이 좋다.

반대로 한 문장으로만 이루어진 문단이 많다면 구성에 문제가 있는 것이다. 만약 그렇다면 문단을 합치거나 리스트로 만드는 것을 고려해라.

#### 왜, 무엇을, 어떻게

좋은 문단은 다음의 질문에 대답해야 한다:
1. 독자에게 **무엇을** 말하고 싶은가?
2. **왜** 이것이 독자에게 중요한가?
3. 독자는 이 지식을 **어떻게** 사용해야 하는가? 혹은, 독자는 이 내용을 진실인지 **어떻게** 알아야 하는가?

##### Example

<무엇을>The garp() function returns the delta between a dataset's mean and median.</무엇을><왜>Many people believe unquestioningly that a mean always holds the truth. However, a mean is easily influenced by a few very large or very small data points.</왜><어떻게>Call garp() to help determine whether a few very large or very small data points are influencing the mean too much. A relatively small garp() value suggests that the mean is more meaningful than when the garp() value is relatively high.</어떻게>

#### Reference
- [Google Dev Technical Writing 1 - Paragraphs](https://developers.google.com/tech-writing/one/paragraphs)