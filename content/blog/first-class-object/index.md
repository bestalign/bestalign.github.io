---
title: JavaScript의 함수는 1급 객체(first class object)이다
category: dev
tags:
  - JavaScript
  - function
  - first class object
  - first class citizen
date: 2015-10-18 18:05:06
redirect_from:
  - /2015/10/18/first-class-object/
---


JavaScript의 함수는 1급 객체(first class object)이다. 이 글에서는 1급 객체가 무엇이고 왜 이것이 JavaScript에서 중요한지 이야기해 보고자 한다.

먼저 1급 시민(first class citizen)의 정의에 대해 알아보자.

## 1급 시민(first class citizen)의 정의

[Christopher Strachey](https://en.wikipedia.org/wiki/Christopher_Strachey)는 1967년 수업에 사용한 노트<sup>1</sup>에서 다음과 같이 **1급 시민(first class citizen)**과 **2급 시민(second class citizen)**을 소개했다. 아주 정확하게 정의한 것은 아니지만 ALGOL의 실수(real number)와 프로시져(procedure)를 비교하면서 설명하였다.

> In ALGOL a real number may appear in an expression or be assigned to a variable, and either may appear as an actual parameter in a procedure call. A procedure, on the other hand, may only appear in another procedure call either as the operator (the most common case) or as one of the actual parameters. There are no other expressions involving procedures or whose results are procedures. Thus in a sense procedures in ALGOL are second class citizens—they always have to appear in person and can never be represented by a variable or expression (except in the case of a formal parameter), while we can write (in ALGOL still)

일반적으로 **1급 시민**의 조건을 다음과 같이 정의한다.

* 변수(variable)에 담을 수 있다
* 인자(parameter)로 전달할 수 있다
* 반환값(return value)으로 전달할 수 있다

대부분의 프로그래밍 언어에서 숫자는 **1급 시민**의 조건을 충족한다. 숫자는 변수에 저장할 수 있고 인자나 반환값으로 전달할 수 있다.

## 1급 객체(first class object)

**1급 객체(first class object)**라는 것은 특정 언어에서 객체(object)를 1급 시민으로써 취급한다는 뜻이다. 당연히 위의 조건을 모두 충족한다.

## 1급 함수(first class function)

1급 객체 뿐만 아니라 **1급 함수**도 존재한다. 함수를 **1급 시민**으로 취급하는 것이다. 몇몇의 학자들은 **1급 시민**의 조건과 함께 다음과 같은 추가적인 조건을 요구한다.

* 런타임(runtime) 생성이 가능하다
* 익명(anonymous)으로 생성이 가능하다

이런 추가조건으로 봤을 때 C의 함수는 **1급 함수**로 볼 수 없다.

## JavaScript의 함수는 1급 함수? 1급 객체?

JavaScript에서는 객체를 **1급 시민**으로 취급한다. 그리고 사실  JavaScript의  함수도 객체로써 관리되므로 **1급 객체**라고 볼 수 있다. 동시에 JavaScript의 함수는 **1급 함수**의 추가조건도 만족한다.

이렇게 **1급 객체**인 동시에 **1급 함수**이지만, 보통 **1급 객체**로 기술하는 편인듯하다. 아마 함수가 객체이기 때문이지 않을까 싶다.

## JavaScript에서 함수가 1급 객체인 것이 중요한 이유

함수가 **1급 객체**라는 사실은 겉으로 봤을 땐 그리 특별하지 않다. 함수를 그냥 주고받을 수 있다는 것 뿐이지만 이것이 아주 큰 차이점을 만든다.

가장 중요한 장점은 바로 **고차 함수(high order function)가 가능하다**는 점이다. JavaScript의 each, filter, map, sort 등의 함수들이 얼마나 편리한지는 잘 알고 있을 것이다. 인자로 목적에 맞는 함수를 하나 넘겨주면 아주 쉽게 처리가 된다. 반면, Java 7의 [Collections.sort](http://docs.oracle.com/javase/7/docs/api/java/util/Collections.html)함수같은 경우도 비교를 위해 인자를 하나 넘겨주게 되는데, 이것은 함수가 아니라 [Comparator interface](http://docs.oracle.com/javase/7/docs/api/java/util/Comparator.html) 타입의 인스턴스(instance)이다. 함수 하나를 넘겨주기 위해서 새로운 클래스를 만들고 그것의 인스턴스까지 생성해야 하는 것이다 -- ES6와 Java 8에서는 람다(lambda)가 지원되면서 훨신 간편해졌다.

**1급 객체**가 JavaScript의 **클로져(closure)**와 만나면 또 하나의 장점이 생긴다. JavaScript의 함수는 생성될 당시의 Lexical Environment를 기억하게 되는데, 함수를 주고받게 되면 이 Lexical Environment도 함께 전달된다. 이것을 이용해서 **커링(currying)**과 **메모이제이션(memoization)**이 가능해진다. 여기서 적기엔 너무 큰 주제이므로 기회가 될 때 따로 다뤄보도록 하겠다.

## 참고글
* [Functions are first class objects in javascript](http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/)
* [First-class citizen](https://en.wikipedia.org/wiki/First-class_citizen)
* [First-class function](https://en.wikipedia.org/wiki/First-class_function)

---
[1]: 2000년에 따로 출판된 글에서 이 글을 찾을 수 있다. [Christopher Strachey, "Fundamental Concepts in Programming Languages" in Higher-Order and Symbolic Computation 13:11 (2000)](https://www.cs.cmu.edu/~crary/819-f09/Strachey67.pdf)