---
title: Lexical Scope and Dynamic Scope
category: dev
tags:
  - JavaScript
  - lexical scope
  - lexical
  - scope
date: 2015-07-12 20:33:56
redirect_from:
  - /2015/07/12/Lexical-Scope-and-Dynamic-Scope/
---

C/C++, Java, 그리고 JavaScript 같이 우리가 접하는 대부분의 언어들은 Lexical Scope를 사용한다. Lexical Scope는 Static Scope라고도 불린다. 반대의 방식으로는 Dynamic Scope가 있으며 Perl, Bash Shell, APL 같은 몇몇 오래된 언어들이 사용하는 방식이다. 두 방식의 정의는 다음과 같다.

> **Lexical scope**: use environment where function [and variable] is defined

> **Dynamic scope**: use environment where function [and variable] is called

출처: [University of Washington CSE341 2014 Spring - Lecture 9](https://courses.cs.washington.edu/courses/cse341/14sp/slides/lec09.pdf)

<!-- more --> 
Lexical Scope는 변수나 함수가 **정의 된 곳**의 context를 사용하며, Dynamic Scope는 변수나 함수가 **불려진 곳**의 context를 사용한다. Lexical Scope는 아주 익숙한 개념이므로 Dynamic Scope에 대해서만 간단히 설명하고, Lexical Scope가 JavaScript에서 어떻게 쓰이는 지 적어볼까 한다.

## Dynamic Scope

```javascript
// JavaScript with Dynamic Scope
function foo() {
  console.log(x);
}

function bar() {
  var x = 15;
  foo();
}

var x = 10;
foo(); // 10
bar(); // 15
```

위의 코드는 JavaScript에 Dynamic Scope가 적용되었다고 가정했다. -- *실제로 실행할 경우 다른 결과값이 나온다*. 모든 결과값은 Line 3의 **x의 값을 읽은 타이밍**에 따라서 -- 이름 그대로 동적으로 -- 달라진다. Line 12에서 처음으로 *foo function*이 호출될 때 x의 값은 10이므로 당연히 결과값은 10이 출력된다. Line 13에서도 x의 값은 10이지만 *bar function*내에서 x를 15으로 재선언 뒤 *foo function*을 호출하기 때문에 결과값이 15로 바뀌게 된다.

# 언어에 따른 Lexical Scope의 차이

## Block Scope
C계열의 언어들은 모든 block이 자신의 scope를 가진다.

```c
// C
void main() {
  int x = 1;
  printf("%d", x); // 1
  if(1) {
    int x = 2;
    printf("%d", x); // 2
  }
  printf("%d", x); // 1
}
```

if block 자체가 자신의 scope를 가지고 있으므로 **main function의 scope**에는 영향없이 따로 x의 값을 가질 수 있다. if block이 지난 뒤에는 다시 **main function의 scope**에 접근하게 된다.

## Function Scope
JavaScript는 Function Scope를 사용한다. function만이 자신의 scope를 가진다.

```javascript
// JavaScript
function foo() { // foo 
  var x = 1;
  console.log(x); // 1
  if(true) {
    var x = 2;
    console.log(x); // 2
  }
  console.log(x); // 2
}
 
foo();
```

Block Scope와 JavaScript에서는 **function만이 scope를 가지기 때문에** if block 안에서 x값을 수정하면 **foo function의 scope**의 x에 값이 바뀌게 된다 -- *실제 JavaScript의 if block 안에서 var를 다시 선언하는 건 좋은 코딩스타일은 아니다*. 그러므로, if block이 끝난 뒤에도 수정된 값을 가지게 된다.

# 그럼 JavaScript에서 새 Scope 생성은?

당연한 이야기지만 Function Scope를 생성해야 하므로 필요한 곳에 function을 추가하면 된다.

```javascript
// JavaScript
function foo() {
  var x = 1;
  if (true) {
    (function () {
      var x = 2;
      console.log(x); // 2
    })();
  }
  console.log(x); // 1
}
 
foo();
```

예제와 같은 경우는 if block의 한정된 곳에서 한번만 실행 될 코드이므로 Immediately-Invoked Function Expression(IIFE)를 추가한다. IIFE는 만들어지자마자 바로 실행되며 동시에 새로운 scope를 가진다. 독립적인 scope를 가지므로 그 안에서 선언된 x는 **foo function의 scope**에 영향을 미치지 않는다.

JavaScript에서 function을 이용한 Lexical Scope는 Closure를 이해하는데 아주 중요한 요소 중 하나이며 그 외에도 모듈화를 하는데도 빈번히 사용된다.

# Let keyword in ES6
이번에 제정된 ES6(ECMAScript 2015)에서는 let keyword가 새로 추가되었다. var과 비슷하게 변수를 선언하는 keyword이지만 많은 부분에서 차이를 보인다.
* var keyword
  * Function Scope
  * Hoisting
  * 중복선언 가능
* let keyword
  * Block Scope
  * NO Hoisting
  * 중복선언 불가 (에러 발생)
  
참고글:
* [University of Washington CSE341 2014 Spring](https://courses.cs.washington.edu/courses/cse341/14sp/)
* [MDN JavaScript let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)