---
title: JavaScript 상속
category: dev
tags:
  - JavaScript
  - Inheritance
  - prototype chain
  - property shadowing
date: 2015-08-02 19:41:00
redirect_from:
  - /2015/08/02/JavaScript-Inheritance/
---


C++나 Java는 언어자체에서 상속을 위한 방법을 지원하는데 반해서 JavaScript는 이상하게도 특별히 상속을 위해 따로 지원하는 문법이 없다. 더욱이 class가 아닌 prototype을 이용해서 상속을 구현해야하기 때문에 코드가 다른 언어에 비해 길고 이해하기가 어렵다. Douglas Crockford는 이것에 관해서 JavaScript 자체가 prototype 컨셉을 완벽히 이해하고 있지 않다고 말했다 -- [Crockford on JavaScript - Act III: Function the Ultimate 50분20초](https://youtu.be/ya4UHuXNygM?t=50m25s). ECMAScript 2015(ES6)에서는 다행히 *class*와 함께 *extends* 키워드를 추가해서 쉽게 상속을 할 수 있게 되었다.

아래 코드는 [MDN Introduction to Object-Oriented JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)의 코드가 이해하기 좋아서 가져왔다.

```javascript
////////////////////////////////////////////////////
// MDN Introduction to Object-Oriented JavaScript //
////////////////////////////////////////////////////
// Person
function Person (firstName) {
  this.firstName = firstName;
}

Person.prototype.walk = function(){
  console.log("I am walking!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
};

// Student
function Student(firstName, subject) {
  Person.call(this, firstName);

  this.subject = subject;
}

// Student.prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying "
              + this.subject + ".");
};

Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};
```

## Line 18-22
Student의 생성자(constructor)를 만든다. Line 16에선 Student의 생성자 안에서 Person의 생성자를 호출한다. 이것은 Java의 super()와 같은 역할을 하는데, Person 생성자를 불러서 `firstname` property를 만들기 위해서이다 -- *Student 생성자에서 직접 할 수도 있겠지만 그러면 상속의 의미가 없어진다.* super()와 한 가지 다른 건 call function을 사용해서 현재 Student 생성자의 context를 바인딩 한다는 점이다. 바인딩에 대한 내용은 나중에 다뤄보도록 하겠다.

## Line 25 - 26
JavaScript의 상속에서 가장 중요한 부분이다. **`Person.prototype`을 상속받기 위해 Student의 prototype를 업데이트한다.** Person object를 만들어서 Student의 prototype으로 사용하게 되는데, 통째로 Person.prototype을 받으면서 Person의 생성자도 상속받게 되므로 다시 Student 생성자를 넣어준다.

코드를 보고 의문점이 두가지가 있었다.

그 중 하나는 새로운 Person object를 만들어서 사용한다는 것이었다. 왜냐하면 `Person.prototype`를 바로 prototype으로 사용하는게 속도 면에서 좋기 때문이다. Person object를 만들어서 사용하는 것과 `Person.prototype`을 사용해서 Student object를 만들었을때 Prototype chaining은 다음과 같다.

```
Person object를 Student의 prototype으로 사용했을 때
+----------------+    +---------------+    +------------------+    +------------------+
| Student object | => | Person object | => | Person.prototype | => | Object.prototype | => null
+----------------+    +---------------+    +------------------+    +------------------+

Person.prototype을 Student의 prototype으로 사용했을 때
+----------------+    +------------------+    +------------------+
| Student object | => | Person.prototype | => | Object.prototype | => null
+----------------+    +------------------+    +------------------+
```

하지만 Line 26에서 생성자를 업데이트 하는 것을 보고 바로 그 이유를 알았다. 만약 `Person.prototype`을 Student의 prototype으로 사용할 경우 Student 생성자를 업데이트 해버리면 Person의 생성자까지 같이 바뀌어버리기 때문이다. 또, Line 28-35에서 `Student.prototype`에 function을 더 추가하는데 마찬가지로 `Person.prototype`의 값을 바꿔버리게 된다.

두 번째 의문은 Person object를 만들 때 `new Person()`을 사용하지 않고 **생성자를 호출하지 않는** `Object.create(Person.prototype)`를 사용한다는 점이었다. 이건 아주 단순한 이유였는데, 각각의 Student object가 `firstname` property를 가져야하기 때문이다. `firstname` property는 Student 생성자에서 값이 정해져야 하므로 -- *Line 18-22에서 설명했듯이 Person 생성자는 Student 생성자 내에서 호출된다* -- Student의 prototype을 만드는 이곳에서는 `Object.create(Person.prototype)`를 사용해야만 한다.

다시 말해보자면 **Person object를 만들었다고 생각하는 것보다 `Person.prototype`을 상속받는 prototype object를 새로 하나 만든다고 생각하는게 이해하기 더 쉽다.** 

## Line 28-31
`Person.prototype`에서 선언 된 `sayHello` 함수를 재정의 한다. `Student.prototype`에 새로운 이름이 같은 다른 함수를 선언 하는 것 뿐이며 `Person.prototype`의 `sayHello` 함수는 Property Shadowing에 의해 가려진다.

* 참고글: [MDN Introduction to Object-Oriented JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
* 참고동영상: [Crockford on JavaScript - Act III: Function the Ultimate 50분20초](https://youtu.be/ya4UHuXNygM?t=50m25s)