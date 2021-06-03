---
title: JavaScript Prototype
category: dev
tags:
  - JavaScript
  - class
  - prototype
  - object
  - instance
date: 2015-07-07 02:27:32
redirect_from:
  - /2015/07/07/JavaScript-Prototype/
---

JavaScript의 prototype를 처음부터 다시 공부하면서 적어보았다. C/C++와 Java로 프로그래밍을 시작했고 오래써왔기 때문에 prototype을 이해하는데 꽤 오랜시간이 걸렸다. 둘 다 상속, 캡슐화, 추상화, 다형성 등을 전부 지원하지만 접근하는 방식은 좀 다를 뿐 깊게 들어가보면 동작하는 방식은 대동소이하다. Java와 비교하면서 적었기 때문에 Java를 쓰시는 분이면 이해하기 쉬울 듯하다.

# Java Class와 JavaScript Prototype
## Java Class

```java
// Java
// class declaration
class Point {
  private int x, y; // field
  
  // constructor
  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
  
  // print method
  public void print() {
  	// print Point in "(x, y)" format
    System.out.println( "(" + this.x + ", " + this.y + ")" );
  }
}
 
// new objects
Point p1 = new Point(0, 0);
Point p2 = new Point(5, 5);
```

Java는 class를 **설계도**삼아 object를 만들어낸다. 위의 코드에서는 Point class instance인 *p1*, *p2*가 생성된다. 메모리 관점에서 봤을 때 완전히 똑같은 object 두 개가 따로 메모리 상에 저장된다.

## JavaScript Prototype

```javascript
// JavaScript
function Point(x, y) {
  this.x = x;
  this.y = y;
}
// Point.prototype이 자동으로 생성

Point.prototype.print = function () {
  console.log('(' + this.x + ',' + this.y +')');
}

// new instances
var p1 = new Point(0, 0);
var p2 = new Point(5, 5);
```

JavaScript 코드는 Java 코드와 비교하면서 한 줄 한 줄 설명해 해보았다.

### Line 2 ~ 5
Java에서 *class*키워드를 사용해서 class를 선언하는데 비해서, JavaScript에서는 먼저 생성자(constructor)를 만든다. *Point function*이 선언됨과 동시에 **Point function object**가 생성된다 -- *JavaScript에서는 function도 object로 관리된다.* **Point function object**의 내부에는 *prototype*이라는 property가 자동적으로 생성된다. 이게 바로 Point의 prototype이다. prototype은 메모리 상에 존재하는 **object**이며 거기서 생성/파생되는 모든 object의 **원형**이 된다. 기본으로 만들어 지는 prototype은 아무런 값이 없는 object이다 -- 보든 JavaScript의 Object가 그렇듯 prototype object도 *Object.prototype*을 기반으로 한 object이다.

**생성자**인 *Point function* 에서는 일반적으로 property를 만들고 초기화하는 일을 한다. Java에서는 x, y field<sup>1</sup> 를 class 내에 따로 선언하지만 JavaScript는 따로 property<sup>1</sup> 선언은 하지 않고 **생성자** 내에서 `this.x = x`처럼 값을 넣어서 선언 및 초기화 한다. **생성자에서 추가 된 property는 prototype과는 상관없이 각 object에 종속된다.**

### Line 8 ~ 10
*print method*를 Point의 prototype에 추가한다. 이것은 Java의 print method와 같은 역할을 하게 된다. **prototype에 추가 된 method와 property는 이후에 생성된 모든 instance에서 접근이 가능하다.**

### Line 14 ~ 15
Line 14-15에서는 *new*키워드로 Point instance *p1*, *p2*를 생성한다. 내부적으로 동작하는 걸 자세히 따져보면 C/C++나 Java같은 instance화 라기보다는 **prototype을 가리키는 빈 object를 만드는 것에 가깝다.**

*p1*과 *p2*는 아주 단순한 구조를 가지고 있다. 빈 object에 x, y property를 가지고 있고, 거기에 추가로 숨겨진 property인 *[[Prototype]]*를 가진다 -- Chrome, Safari 등 많은 모던브라우저에서는 *\_\_proto\_\_*라는 이름을 사용하고 있지만 ECMAScript 표준은 *[[Prototype]]*이다. 

두 instance의 *[[Prototype]]*은 모두 *Person.prototype*를 가리킨다. 간단히 말해, ***p1*과 *p2*는 하나의 prototype object를 공유한다.** 이렇게 prototype object를 공유함으로써 Prototype Chain과 Property Shadowing이 가능해진다.

<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg"><defs><marker refY="50" refX="50" markerHeight="5" markerWidth="5" viewBox="0 0 100 100" se_type="rightarrow" orient="auto" markerUnits="strokeWidth" id="se_marker_end_svg_6"><path stroke-width="10" stroke="#000000" fill="#000000" d="m100,50l-100,40l30,-40l-30,-40z"/></marker><marker refY="50" refX="50" markerHeight="5" markerWidth="5" viewBox="0 0 100 100" se_type="rightarrow" orient="auto" markerUnits="strokeWidth" id="se_marker_end_svg_11"><path stroke-width="10" stroke="#000000" fill="#000000" d="m100,50l-100,40l30,-40l-30,-40z"/></marker></defs><g><title>JavaScript prototype</title><rect id="svg_2" height="80" width="160" y="40" x="80" stroke-width="2" stroke="#000000" fill="none"/><text xml:space="preserve" text-anchor="middle" font-family="Nanum Gothic" font-size="20" id="svg_3" y="60" x="160" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Point.prototype</text><rect id="svg_4" height="80" width="130" y="200" x="10" stroke-linecap="null" stroke-linejoin="null" stroke-width="2" stroke="#000000" fill="none"/><rect id="svg_5" height="80" width="130" y="200" x="180" stroke-linecap="null" stroke-linejoin="null" stroke-width="2" stroke="#000000" fill="none"/><line y="NaN" x="NaN" marker-end="url(#se_marker_end_svg_6)" id="svg_6" y2="130" x2="140" y1="200" x1="80" stroke-linecap="null" stroke-linejoin="null" stroke-width="2" stroke="#000000" fill="none"/><text xml:space="preserve" text-anchor="middle" font-family="Nanum Gothic" font-size="20" id="svg_9" y="220" x="80" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">p1</text><text xml:space="preserve" text-anchor="middle" font-family="Nanum Gothic" font-size="20" id="svg_10" y="220" x="250" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">p2</text><line marker-end="url(#se_marker_end_svg_11)" id="svg_11" y2="130" x2="180" y1="200" x1="230" stroke-linecap="null" stroke-linejoin="null" stroke-width="2" stroke="#000000" fill="none"/><text xml:space="preserve" text-anchor="middle" font-family="Nanum Gothic" font-size="20" id="svg_12" y="260" x="70" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">x:0, y:0</text><text id="svg_13" xml:space="preserve" text-anchor="middle" font-family="Nanum Gothic" font-size="20" y="260" x="240" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">x:5, y:5</text><text xml:space="preserve" text-anchor="middle" font-family="Nanum Gothic" font-size="20" id="svg_14" y="90" x="160" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">print function</text></g></svg>

* 관련글
  * [New와 Prototype](/new-prototype)
  * [Prototype Chain](/prototype-chain)

---
[1]: Java에서는 field, JavaScript에서는 property
