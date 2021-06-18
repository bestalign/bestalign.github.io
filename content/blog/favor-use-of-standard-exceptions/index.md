---
title: Method Parameter and Exception Handling
category: dev
tags: ["Java", "Effective Java", "Method Parameter", "Exception"]
date: 2017-04-12 23:18:46
redirect_from:
  - /2017/04/12/favor-use-of-standard-exceptions/
---

![](/NullOrZero.jpg)

오늘 회사에서 코드리뷰를 하다가 나온 내용을 하나 올려본다. ~~대단한 내용은 아니고 어떻게든 포스팅 하나정도 해야할 것 같아서..~~

메소드에 인스턴스를 하나 넘겨주는데 값을 먼저 확인해서 `null`일 경우 `NullPointerException`을 던지는 코드였다.

```java
void method(Object o) {
  if(o == null) {
    throw new NullPointerException();
  }
  // do something..
}
```

넘겨받은 값이 원하는 조건에 맞지 않아서 예외처리를 하는 코드여서 `NullPointerException`보다는 `IllegalArgumentException`이 더 어울리지 않냐고 코멘트를 달았는데, 그 친구는 다른 대꾸없이 *[Effective Java 2/E](https://www.amazon.com/Effective-Java-2nd-Joshua-Bloch/dp/0321356683) - item 60* 의 내용을 답변으로 달았다. 간단히 아래와 같다.

* IllegalArgumentException: `null`은 아니지만 값이 적절하지 않을 때
* IllegalStateException: 객체의 상태가 메소드를 호출하기에 적절하지 않을 때. 예를들어 객체가 제대로 초기화 되기 전에 메소드를 호출했을 경우
* NullPointerException: `null`을 허용하지 않는데 받았을 때
* IndexOutOfBoundsException: 인덱스 값이 [`Array`나 `List`의] 범위에 들어가지 않을 때
* ConcurrentModificationException: 동시성(Concurrency)을 지원하지 않는데 동시에 객체를 수정하려는 시도가 있을 때
* UnsupportedOperationException: 객체가 지원하는 메소드가 아닐 때

두 개를 제외한 다른 예외는 모두 조건이 아주 명료하다. `NullPointerException`과 `IllegalArgumentException`만 제대로 구분하면 될 것 같다. ~~역시 `null`은 태어났으면 안됐다.. [Null References: The Billion Dollar Mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare)~~

```java
void setAge(int age) {
  if(age < 0) {
    throw new IllegalArgumentException();
  }
  // do something..
}
```

위와 같이 논리적으로 값이 음수가 되면 안 될 경우에는 `IllegalArgumentException`을 사용하면 된다.