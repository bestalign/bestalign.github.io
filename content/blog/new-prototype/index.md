---
title: new와 prototype
category: dev
tags: ["JavaScript", "new", "prototype"]
date: 2015-07-20 10:33:56
redirect_from:
  - /2015/07/20/new-prototype
---

JavaScript에서도 다른 여타 언어들처럼 instance를 생성할 떄 new를 사용한다. JavaScript는 prototype으로 instance를 생성해야 하기 때문에 Java나 C++같은 언어와는 다른 방식을 가지고 있다. 내부적으로 어떤식으로 동작하는지 궁금해서 검색해보다가 [Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford)의 책 *JavaScript: The Good Parts*에 좋은 코드가 있어서 가져와보았다. 아래의 코드는 new가 keyword가 아니라 function이라고 가정했을 때 적어본 것이다.

```javascript
///////////////////////////////////////////////////////////
// Douglas Crockford, JavaScript: The Good Parts p4, p47 //
///////////////////////////////////////////////////////////

// prototype에 주어진 function을 추가
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('new', function () {
  // 주어진 prototype을 사용하여 새로운 object를 생성한다
  var that = Object.create(this.prototype);

  // 생성한 object를 바인딩하여 생성자를 호출한다
  var other = this.apply(that, arguments);

  // other가 object가 아니면 that을 대신 돌려준다
  return (typeof other === 'object' && other) || that;
});
```

object를 생성할 때 쓰인 Object.create()는 완전히 빈 object를 만들어서 거기에다가 단순히 prototype을 연결시키는 역할을 한다. 위의 line 13의 코드를 바꿔보자면 다음과 같다.

```javascript
var that = {}; // 혹은 new Object()
// 숨겨진 prototype link
// __proto__는 표준이 아니므로 쓰지 않는 것이 좋다
that.__proto__ = this.prototype;
```

이렇게 만들어진 *new function*을 이용하면 아래와 같이 new를 사용하지 않고 새로운 instance를 만들 수 있다.

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

var p1 = Point.new(1, 1);
```

Douglas Crockford는 *JavaScript: The Good Parts*에서 new을 사용하는 것에 대해서 부정적인 입장을 보였다. 혹시나 개발자가 실수로 new를 사용하는 것을 잊어버리면 instance생성이 아닌 일반적인 function 호출이 되어버려서 생성자 내부에서 쓰이는 this가 global로 바인딩 되어버리기 때문이다. JavaScript engine는 컴파일/런타임 때 아무런 오류를 보여주지 않기 때문에 더욱 문제가 된다. 실제로 많은 사람들이 이 문제로 많은 버그를 겪었고, ECMAScript5부터 **strict mode**를 지원해서 바인딩없이 function이 호출될 경우 this가 undefined로 바인딩되도록 하였다.

다른 것보다도 class가 없는 JavaScript에 Java/C++와 같이 new를 사용하도록 만들었다는 것 자체가 문제라고 본다. prototype을 기반으로 한 훨씬 이해하기 쉬운 instance 생성 문법도 있었을텐데, Java랑 비슷한 문법으로 된 건 그 당시 Netscape의 정책 때문이라고 알고 있다. 열 흘만에 만들어진 언어의 숙명이랄까. 멀리 갈 것도 없이 나부터 바로 이해가 안돼서 이런 글을 쓰게 되었으니.. ES6부터는 아예 class keyword를 지원해서 훨씬 직관적으로 class를 선언하고 instance를 생성할 수 있게 되었다 -- 당연하게도 prototype기반 언어인 것은 변함이 없다. [Dr. Axel Rauschmayer](http://www.2ality.com/)가 적은 글 중에 ES6의 class에 대한 좋은 글이 있는데 나중에 한 번 다뤄볼 생각이다.

* 참고글:
 * [MDN - JavaScript Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
 * [StackOverflow - How does Object.create work in JavaScript](http://stackoverflow.com/questions/7962886/how-does-object-create-work-in-javascript)
* 관련글: [JavaScript Prototype](/javascript-prototype)