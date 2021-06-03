---
title: JavaScript 개발자를 위한 Elm
category: translation
tags:
  - JavaScript
  - Elm
date: 2015-11-28 02:32:38
redirect_from:
  - /2015/11/28/elm-for-javascript-developers/
---

![elm logo](elm-logo.png)

이 글은 JavaScript Playground의 [Elm for JavaScript Developers](http://javascriptplayground.com/blog/2015/11/elm-for-javascript-developers/)를 번역한 것이다. 저자인 [Jack Franklin](https://twitter.com/Jack_Franklin)의 허락을 받고 번역하였다.

--------

GitHub에나 Twitter에서 나를 follow하고 있는 사람들은 내가 최근에 [Elm](http://www.elm-lang.org)으로 이런저런 일을 했다는 걸 알고 있을 것이다. Elm은 새로운 언어로 탄탄하고 복잡한 애플리케이션의 더욱 쉬운 개발을 목표로 한다. JavaScript로 컴파일되지만  JavaScript와 언어적으로 동일한 부분은 거의 없으며, Haskell로 개발해 본 적이 있는 사람은 Elm의 문법이 익숙할 것이다. Elm에 관한 처음 글로써, Elm의 특징과 왜 Elm을 사용해야 하는지에 대해 이야기해 볼 것이다. 상당히 다른 문법 때문에 망설여질 수도 있겠지만 일단 익숙해지면 아주 만족하게 될 것이다.

## 불변성(Immutability)과 순수 함수(Pure Function)

Elm 애플리케이션 내의 모든 데이터는 불변(immutable)이다. 다시 말해, 데이터의 수정이 불가능하고 생성 시에 정해진 값을 끝까지 가지고 있다. 데이터의 값이 변하지 않기 때문에 실제로 코드를 볼 때 읽고 이해하기가 훨씬 쉽다. 예를 들어 다음의 JavaScript 코드를 보자:

```javascript
var person = { name: 'Jack' };
doSomethingWith(person);
console.log(person);
```

코드를 실행하지 않고 `doSomethingWith`가 실행 된 이후에 `person`이 가질 값을 확신할 수 있을까?

없다.

JavaScript의 객체는 변할 수 있으므로 `person`의 값은 어떤 식으로든 바뀔 수 있다.

이것이 큰 애플리케이션에서 많은 버그가 생겨나는 원인이다. 변수들의 값을 바꿔서 애플리케이션의 상태를 수정하는 함수는 부수효과(side effect)를 가진다. 이런 함수들은 디버깅하기가 어렵다. 또한, 테스트도 힘들기 때문에 가능하다면 사용하지 않는 것이 좋다.

Elm의 모든 함수는 **순수(pure)**하다. 이것은 다음의 두 가지 뜻을 가지고 있다:

* X라는 입력값을 받았을 때, 항상 출력값 Y를 돌려준다. 같은 값을 함수에 넣으면 항상 같은 결과를 만들어낸다.
* 부수효과를 가지고 있지 않으며, 어떤 값도 바꾸지 않는다.

JavaScript에서도 이런 함수들을 만드는 것은 가능하고, 애플리케이션 내에서 순수 함수만을 사용하도록 하는 규칙을 정할 수 있다. Elm은 불변성을 위해 이것을 강제하므로, 직접 짠 코드든 3rd party 라이브러리든 비순수 함수를 코드에 넣는 것이 아예 불가능하다.

값을 변경할 수 없는데 어떻게 애플리케이션의 상태를 저장할지 의아해할지도 모르겠다. Elm에서는 Signal이라는 것을 사용해서 이 문제를 해결한다. 나중 글에서 다루어 볼 것이다.

## 타입(Types)

Elm은 정적(static) 타입 언어이다. 별로 재미없게 들릴 수도 있겠지만 사실 이것이 더욱 탄탄한 애플리케이션을 개발할 수 있게 해준다. Elm에서는 모든 값이 타입을 가진다.

```elm
"Hello World" - String type
True - Boolean type
3 - number type
3.14 - Float type
[1, 2, 3] - List number type
```

JavaScript와 비슷하다고 생각한다면, 대략 맞다. JavaScript(또한, 다른 대부분 언어)에서 값은 특정 타입을 가진다. 중요한 차이점은 이 타입 시스템과 함수를 합칠 때 나온다. JavaScript에서는 다양한 타입을 입력값으로 받고 다양한 타입을 돌려주는 함수를 만들 수 있다:

```elm
someMadeUpFn('Foo') => 5
someMadeUpFn(5) => 'Foo'
someMadeUpFn({ name: 'Jack' }) => { name: 'jack' }
```

또한, JavaScript의 타입 시스템은 **동적(dynamic)**이다. 다시 말해서, **런타임** 때 타입이 결정된다. Elm의 타입 시스템은 **정적(static)**이며 컴파일러가 코드 실행 전에 모든 타입을 확인할 수 있다. 나중에 이것에 대해 다시 이야기해 볼 것이다.

위의 코드에서는 `someMadeUpFn`이 받는 입력값에 대한 타입 제한이 없고, 무슨 타입을 돌려줘야 하는지에 대한 제한 또한 없다. Elm에서는 이것을 명시적으로 선언해줘야만 한다 (사실 컴파일러가 알아서 유추하도록 할 수도 있지만 선언하는 것이 좋다). 아래의 코드는 integer를 받아 integer를 돌려주는 `square`라는 함수를 생성한다.

```elm
square : Int -> Int
square x = x * x
```

만약 같은 함수를 JavaScript로 만든다면 다음과 같을 것이다:

```javascript
function square(x) {
  return x * x;
}
```

Elm 코드의 제일 첫 라인에 주목해보자:

```elm
square : Int -> Int
```

이것은 **type annotation**으로, 이 함수가 하나의 integer를 받아 하나의 integer를 돌려주는 함수라는 것을 Elm--정확히는 컴파일러--에게 알려준다. 만약 다른 타입의 값을 함수에 넣으면 에러를 발생시킬 것이다. 이런 제한 때문에 시간이 조금 더 걸리겠지만 훨씬 깔끔하고 이해하기 쉬운 코드가 된다.

## 컴파일(Compiling)
함수를 잘못된 타입 값으로 호출하려고 한다면 에러가 날 것이라고 위에서 이야기했었다. 심지어 더 좋은 건, **컴파일 시간**에 에러를 낸다는 점이다. Elm은 JavaScript로 컴파일하므로 Elm 코드를 받아 JavaScript 코드를 생성해주는 컴파일러를 실행해야 한다. Elm의 컴파일러는 똑똑해서 JavaScript로 코드를 생성할 때 타입을 검사한다. 예를 들어, 다음의 코드를 컴파일한다면 에러가 발생할 것이다. 세세한 문법에 대해서는 걱정하지 말고 `square`함수에 "Hello"를 넣는다는 것을 기억하자.

```elm
square : Int -> Int
square x = x * x

main =
  square "Hello"
```

다음이 컴파일러가 발생시키는 에러이다:

```
The argument to function `square` is causing a mismatch.

5│   square "Hello"
            ^^^^^^^
Function `square` is expecting the argument to be:

    Int

But it is:

    String
```

멋지지 않은가?! 브라우저에서 코드를 실행할 때 이상한 에러를 보여주는 대신, 컴파일러가 미리 실수를 발견해서 에러를 보여준다.

## Elm 시작하기
이 글이 Elm에 대한 호기심을 자극했기를 바란다. 곧 Elm에 대한 혹은 어떻게 시작할지에 대한 글을 더 쓸 예정이다. 하지만 혹시나 미리 더 많은 정보를 보고 싶다면 아래의 글들을 추천한다.

* [Comparison of Elm and JS Syntax](http://elm-lang.org/docs/from-javascript)
* [Elm syntax introduction](http://elm-lang.org/docs/syntax)
* [Elm video course ($24 이지만 추천)](https://pragmaticstudio.com/elm)
* [My Game of Life implementation in Elm](https://github.com/jackfranklin/elm-game-of-life)
* [Connect Four in Elm](https://github.com/jackfranklin/elm-connect-four)