---
title: JavaScript Data Types
category: dev
tags: [JavaScript, Data Type]
date: 2015-06-29 01:20:21
redirect_from:
	- /2015/06/29/JavaScript-Data-Type/
---

JavaScript data type은 다음과 같다. 5개의 primitive type -- 얼마전에 새로 나온 *ECMAScript 2015*의 스펙에서는 symbol type이 추가 -- 그리고 하나의 object type있다. primitive type은 가장 기본적이고 단순한 값을 가지며 들어가는 모든 값들은 immutable이다.

* primitive type
	* undefined type
	* null type
	* boolean type
	* number type
	* string type
* object type

<!-- more --> 

## undefined type
undefined type은 단 하나의 값 *undefined*을 가지고 있다. type 이름과 거기에 들어가는 값의 이름이 같다.

*undefined*는 새로 선언된 variable의 기본값으로 들어간다.

``` javascript
// undefined의 type은 undefined
console.log(typeof undefined); // undefined

var x;
// x의 안에 들어있는 값이 undefined
console.log(x); // undefined
```

## null type
undefined type 처럼, null type은 단 하나의 값 *null*을 가지고 있다. 타입 이름과 거기에 들어가는 값의 이름이 같다.

하지만 실제로 브라우저에서 *null*의 type을 확인해보면 `"object"`라고 출력된다. 이것은 JavaScript 엔진 초기버전의 버그였는데 하위 호환성을 위해서 고쳐지지 못했다. 아마 영원히 고쳐질일은 없을 듯 하다.. 자세한 내용을 알고 싶으면 [이 링크(영문)](http://www.2ality.com/2013/10/typeof-null.html)에 자세한 설명이 있다.

*null*은 빈 값이라는 것을 의도적으로 보이기 위해 넣는 값이다.

``` javascript
console.log(typeof null); // object - 버그!

var data = null; // no data
var obj = null; // no object
```

## boolean type
*true*/*false*의 type.

``` javascript
console.log(typeof true); // boolean
console.log(typeof false); // boolean

console.log(1 < 2); // true
console.log(1 == 2); // false
```

## number type
정수, 실수, +/- *Infinity*, *NaN*(not-a-number)이 모두 number type이다. JavaScript는 C/C++나 Java와 달리 단 하나의 숫자 type을 가지고 있다.

JavaScript는 숫자를 표현하기 위해서 [IEEE 754 standard](http://en.wikipedia.org/wiki/Double_precision_floating-point_format)를 사용하고 있다. 정수형/실수형을 위해 개별적인 방식은 제공되지 않고 모두 한가지 방식으로 표현된다. 숫자하나당 8 byte로 정수를 저장하기에 조금 비효율적이긴 하지만 개발할 때는 타입을 신경안써도 되기때문에 편하다는 장점이 있다.

``` javascript
console.log(typeof 1); // number
console.log(typeof 0.3); // number
console.log(typeof Infinity); // number
console.log(typeof -Infinity); // number
console.log(typeof NaN); // number
```

## string type
모든 문자열의 type.

JavaScript의 문자열은 Java와 같이 immutable로 일단 생성되면 값을 바꿀 수 없다. 대신 그 문자열에서 새로운 문자열을 만들어 낼 수는 있다. 내부적으로 16-bit unsigned integer set으로 저장된다.

String literal을 만들때는 큰따옴표 혹은 작은따옴표로 원하는 문자열을 감싸서 만들 수 있다.

``` javascript
console.log(typeof "hello world!"); // string
console.log(typeof 'hello world!'); // string
```

## object type
모든 객체의 type. ~~또한 null의 type.~~

JavaScript에는 기본적으로 탑재된 객체가 아주 많다. 모든 JavaScript 객체들의 조상인 *Object*부터 *Array*, *Date*, *RegExp*, *Function*, 그리고 Primitive type의 wrapper인 *Booean*, *Number*, *String* 까지 모두 object type이다.

object에 관련해서는 너무나 많은 내용이 있기 때문에 따로 글을 써볼 생각이다.

``` javascript
console.log(typeof {}); // object
```

참조글: [MDN JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)