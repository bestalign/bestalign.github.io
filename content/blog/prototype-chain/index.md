---
title: Prototype Chain and Property Shadowing
category: dev
tags: ["JavaScript", "prototype chain", "property shadowing"]
date: 2015-07-28 00:29:53
redirect_from:
  - /2015/07/28/Prototype-Chain/
---


# Prototype Chain
**JavaScript의 Prototype Chain은 *[[Prototype]]*으로 이루어지는 object들의 연결을 말한다.** JavaScript의 Primitive Type을 제외한 모든 object는 *[[Prototype]]*을 가지고 있으며 그 연결된 Prototype Chain은 마치 Linked List 처럼 생겼다. Prototype Chain의 마지막은 항상 `Object.prototype`에서 끝나며, `Object.prototype`의 *[[Prototype]]*은 일반적인 Linked List처럼 null로 끝난다.

```javascript
var A_Prototype = {
  x: 1, y: 2
};

var A = Object.create(A_Prototype);
A.z = 3;
```

위의 코드는 `A_Prototype`을 만들고 거기서 A라는 instance를 생성하는 것을 보여준다. 이 object와 prototype의 Prototype Chain을 그래프로 간략히 그려보면 다음과 같다.

```javascript
///////////////////////////////////////////////////////
// {z:3} =>  {x:1, y:2}  => {...}            => null //
// A         A_Prototype    Object.prototype         //
///////////////////////////////////////////////////////

console.log(A.z); // 3

console.log(A.x); // 1
console.log(A.y); // 2

console.log(A.a); // undefined
```

위의 예제에 써 있듯이 `A`, `A_Prototype`, `Object.prototype`, `null`순으로 Prototype Chain이 연결된다. `Object.prototype`에는 아주 많은 property가 있지만 가독성을 위해 생략했다. JavaScript engine은 object의 property를 접근할 때 그 object의 property 뿐만이 아니라 상황에 따라 Prototype Chain으로 연결된 상위 object의 property까지 확인하게 된다.

위의 예제에서 `A.z`는 `A`의 property이므로 바로 3을 출력한다. `A.x`와 `A.y`같은 경우는 `A`가 가지고 있지 않은 property이기 때문에 Prototype Chain을 거슬러 올라가면서 확인하게 되며, `A_Prototype`의 property인 `A_Prototype.x`, `A_Prototype.y`의 값인 1, 2를 출력하게 된다. `A.x`와 `A.y`는 `A_Prototype`에게서 상속받았다고 볼 수 있다.

마지막으로 `A.a`는 위의 Prototype Chain에 있는 어느 object에도 존재하지 않는 property이다. JavaScript engine은 Prototype Chain의 끝인 `Object.prototype`까지 확인한 뒤 `undefined`를 출력하게 된다.

# Property Shadowing
위의 Prototype Chain 예제에서는 `A`와 `A_Prototype` 모두 겹치지 않는 property를 가지고 있다. 만약 이들 중 이름이 겹치는 property가 존재한다면 무슨 일이 일어날까?

```javascript
var A_Prototype = {
  x: 1, y: 2
};

var A = Object.create(A_Prototype);
A.z = 3;
A.x = 4;
```

JavaScript engine은 특정 property를 찾을 때 **주어진 object부터** Prototype Chain을 따라 상위로 올라가면서 property를 확인하고 가장 먼저 찾은 property를 가져온다. 이런 방식으로 동작하기 때문에 상위 object에 같은 이름의 property가 존재한다고 해도 무시하게 된다. 이것을 바로 Property Shadowing이라고 부른다.

```javascript
///////////////////////////////////////////////////////////
// {x:4, z:3} => {x:1, y:2}  => {...}            => null //
// A             A_Prototype    Object.prototype         //
///////////////////////////////////////////////////////////

console.log(A.z); // 3

console.log(A.x); // 4
console.log(A.y); // 2

console.log(A.a); // undefined
```

Property Shadowing에 의해서 Line 9에서는 `A_Prototype.x`의 값인 1을 상속받지 않고 `A.x`의 값인 4를 출력한다. Variable뿐만이 아니라 Function도 똑같이 object의 property가 될 수 있으므로 Prototype Chain과 Property Shadowing의 영향 하에 있다. 이를 이용해서 JavaScript에서는 *class*나 *extends* 키워드 없이 function overriding과 object inheritance를 구현한다.

* 관련글: [JavaScript Prototype](/javascript-prototype)
* 참고글: [MDN Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)