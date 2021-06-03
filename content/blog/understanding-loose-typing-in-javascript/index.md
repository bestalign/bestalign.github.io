---
title: 자바스크립트의 느슨한 타입(Loose Typing) 이해하기
category: dev
tags:
  - JavaScript
  - loose typing
  - strong typing
date: 2015-10-21 19:41:39
redirect_from:
  - /2015/10/21/understanding-loose-typing-in-javascript/
---

원문: http://blog.jeremymartin.name/2008/03/understanding-loose-typing-in.html

[JavaScript: The Right Way](http://jstherightway.org/ko-kr/)에는 부분적으로 번역되어있기 때문에 전문을 번역해보았다. 대략 8년 전의 글로 아주 오래된 글이지만 지금 보기에도 여전히 좋은 내용이다. 다만 현 ECMAScript와 다른 부분이 있어서 그 부분은 직접 수정하였다.

---

많은 Front-end 개발자들에게 JavaScript는 처음으로 접하는 인터프리터 언어이자 스크립트 언어이다. 이 개발자들에게 느슨한 타입의 개념은 아주 자연스러운 것이다. 하지만 모던 웹 애플리케이션에 대한 수요가 폭발적으로 증가함에 따라 클라이언트 측 기술에 발을 디딘 Back-end 개발자들도 점점 많아지고 있는데, C#이나 Java 같은 강한 타입의 언어에 친숙한 이 사람들에게는 느슨한 타입의 변수들이 주는 자유로움이나 잠재적인 위험들이 익숙하지 않다.

느슨한 타입의 개념은 JavaScript에서 코드를 작성할 때 아주 필수적인 것이기 때문에, 이것을 이해하는 것은 아주 중요하다. 이 글에서는 JavaScript의 느슨한 타입에 대해서 중점적으로 논의해볼 것이다. 느슨한 타입의 개념이 언어마다 약간씩의 차이가 존재하므로 JavaScript로만 제한을 둘 것이다. 자 이제 한번 살펴보도록 하자.

## 느슨한 타입이란 무엇인가?

음... 시작하기 좋은 주제이다. 느슨한 타입이 무엇인지 느슨한 타입이 아닌 것은 무엇인지 둘 다 이해하는 것이 중요하다. 느슨한 타입은 타입 없이 변수를 선언하는 것이다. 반면에 강력한 타입(strong typing)을 사용하는 언어는 타입과 함께 변수를 선언해야만 한다. 다음의 예제를 살펴보자:

``` javascript
/* JavaScript Example (loose typing) */
var a = 13; // Number 선언
var b = "thirteen"; // String 선언

/* Java Example (strong typing) */
int a = 13; // int 선언
String b = "thirteen"; // String 선언
```

JavaScript 예제에서 `a`와 `b` 둘 다 var type으로 선언되었다는 걸 기억하자. 하지만 이것이 타입이 없다거나 var 타입이라는 뜻은 아니다. JavaScript의 변수는 타입을 가지고 있지만, 내부적으로 정해질 뿐이다. 위의 예제에서는, `a`의 타입은 **Number**, `b`의 타입은 **String**이 될 것이다.  JavaScript는 모두 5개의 Primitive type을 가지고 있는데 위의 둘과 **Boolean**, **Null**, **Undefined**이다<sup>1</sup>.

## 타입 변환(Type Coercion)

타입 변환은 느슨한 타입과 아주 가까운 관계가 있는 주제이다. 내부적으로 타입이 관리되기 때문에, 종종 타입들이 내부적으로 바뀔 때도 있다. 타입 변환의 규칙을 아는 것은 아주아주 중요하다. 다음과 같은 표현식을 생각해보자:

``` javascript
7 + 7 + 7; // = 21  
7 + 7 + "7"; // = 147  
"7" + 7 + 7; // = 777 
```

위의 예제에서 계산 식은 **String**을 만나기 전까지 정상적으로 계산된다. 일단 **String**을 만난 이후로는 모든 숫자가 **String**으로 변환되고 결합(concatenate)된다.

타입 변환은 또한 값 비교를 할 때도 일어난다. 하지만 `===`연산자를 써서 타입 변환을 막을 수 있다. 다음을 보자:

```javascript
1 == true; // = true  
1 === true; // = false  
  
7 == "7"; // = true  
7 === "7"; // = false; 
```

`parseInt`나 `parseFloat`같은 명시적으로 타입 변환을 하는 함수도 존재한다(둘 다 **String**에서 **Number**로 변환하는 함수이다).

이중 부정(`!!`)을 사용해서 **Number**를 **Boolean**으로 변환할 수 있다. 다음의 예제를 보자:

```javascript
true == !"0"; // = false
true == !!"0"; // = true
```

## 결론

이 글은 JavaScript의 느슨한 타입에 대해 완벽히 신뢰할 만한 글은 아니다. 하지만 이 주제에 대해서 모르는 사람에게 유용한 자료가 되거나 이미 알고 있더라도 좋은 복습 기회가 되길 기대한다.

---
[1]: 원문에는 **Null**, **Undefined**를 제외한 **Number**, **String**, **Boolean** 만이 primitive type이라고 설명한다. 아주 옛날 기준으로 썼기 때문으로 보인다. 나의 예전 글 [JavaScript Data Type](/javascript-data-type) 에서는 **Null**과 **Undefined**도 primitive type에 포함되어있고, 새롭게 나온 [ESCAScript2015의 스펙](http://www.ecma-international.org/ecma-262/6.0/#sec-primitive-value)도 마찬가지이다.