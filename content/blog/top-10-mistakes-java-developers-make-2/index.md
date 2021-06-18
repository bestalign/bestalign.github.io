---
title: 자바 프로그래머가 자주 실수 하는 10가지 - 2
category: translation
tags: ["Java", "mistake"]
date: 2015-09-02
redirect_from:
  - /2015/09/02/top-10-mistakes-java-developers-make-2/
---

원문: http://www.programcreek.com/2014/05/top-10-mistakes-java-developers-make/

이전글: [자바 프로그래머가 자주 실수하는 10가지 - 1](/top-10-mistakes-java-developers-make-1)

### #6. 접근 레벨
개발자들은 꽤 자주 public 클래스 필드를 사용한다. 외부에서 아주 간단하게 필드 값에 접근을 할 수 있지만, 이건 아주 안 좋은 디자인이다. 제대로 된 디자인은 각 멤버들에게 가능한한 낮은 접근 레벨을 주는 것이다.

[public, default, protected, and protected](http://www.programcreek.com/2011/11/java-access-level-public-protected-private/)

<!-- more -->
### #7. ArrayList vs. Linked List
`ArrayList`와 `LinkedList`의 차이를 모를 때 종종 그냥 더 익숙해 보이는 `ArrayList`를 사용하곤 한다. 하지만, 이 선택은 아주 큰 성능 차이를 불러온다. 간단히 말해서, `LinkedList`는 임의 접근(Random Access)이 별로 없고 값의 추가/삭제가 많을 때 사용하는 것이 적당하다. 이 자세한 내용은 [ArrayList vs. LinkedList](http://www.programcreek.com/2013/03/arraylist-vs-linkedlist-vs-vector/)에서 알 수 있다.

### #8. Mutable vs. Immutable
Immutable 객체는 심플함, 안전성 등에서 많은 장점을 가지고 있다. 하지만 각각 다른 값을 위해 새로운 객체를 생성해야 하고, 그 때문에 가비지컬렉션(garbage collection)에 부하를 줄 가능성이 있다. mutable과 immutable중에서 선택할 때는 필요해 따라 잘 선택해야 한다.

일반적으로, mutable 객체는 하나의 객체를 만들기 위해 값을 많이 바꿀 필요가 있을 경우에 사용한다. 예를 들어, 많은 문자열(String)을 이어붙여야 할 경우, 만약 immutable 문자열을 사용한다면 매번 문자열을 이을 때마다 가비지컬렉터로 처리되어야 할 필요없는 객체가 생성 될 것이다. 이것은 쓸데 없이 CPU의 시간과 에너지를 소비시킨다. 이런 곳에서는 mutable 객체를 사용하는 것이 바른 해결책이다 (예: `StringBuilder`)

```java
String result="";
for(String s: arr){
	result = result + s;
}
```

mutable 객체를 사용하는 것이 필요한 상황들이 있다. 예를 들면, mutable 객체들을 매서드에 매개변수로 넘겨주면 고생할 필요없이 한 번에 다수의 결과를 돌려받을 수 있다. 또 다른 예로는, 정렬과 필터링이다. 당연히 일반적인 collection을 받고 정렬된 새로운 collection을 리턴하도록 메서드를 만들 수도 있지만, 아주 큰 collection이라면 아주 낭비일 것이다. (Stack Overflow [dasblinkenlight의 답변](http://stackoverflow.com/questions/23616211/why-we-need-mutable-classes))

[Why String is Immutable?](http://www.programcreek.com/2013/04/why-string-is-immutable-in-java/)

### #9. Super와 Sub의 생성자(Constructor)

```java
class Super {
  String s;
  
  public Super(String s) {
    this.s = s;
  }
}

public class Sub extends Super {
  int x = 200;
  public Sub(String s) { // error here
    
  }
  
  public Sub() { // error here
    System.out.println("Sub");
  }
  
  public static void main(String[] args) {
    Sub s = new Sub();
  }
}
```

위의 컴파일 에러는 Super의 기본 생성자가 정의되어 있지 않기 때문이다. 자바에서는, 생성자가 없는 클래스가 있다면 컴파일러가 자동으로 아무런 매개변수를 받지않는 디폴트 생성자를 생성해준다. 만약 어떤 생성자든 Super 클래스에 정의되어 있다면 -- 지금의 경우 Super(String s) -- 디폴트 생성자를 자동으로 만들어 주지 않는다. 이것이 바로 위의 Super 클래스의 상황이다.

위의 두 Sub 클래스의 생성자는 Super 클래스의 디폴트 생성자를 호출할 것이다. 컴파일러는 Sub 클래스의 생성자 내부에 `super()`를 자동으로 추가하지만 Super의 디폴트 생성자는 존재하지 않기 때문에 에러가 나게된다.

이 문제를 해결하기 위해서는, 1) 아래와 같이 `Super()` 생성자를 Super 클래스에 추가하거나

```java
public Super() {
  System.out.println("Super");
}
```

, 또는 2) 정의 되어 있는 Super 클래스의 생성자를 없애거나, 혹은 `super(value)`를 Sub 클래스의 각 생성자에 추가해주면 된다.

### #10. "" 아니면 생성자?
문자열은 두 방법으로 생성할 수 있다:

```java
//1. use double quotes
String x = "abc";
//2. use constructor
String y = new String("abc");
```

여기서의 차이는 무엇일까?

다음의 예제에서 쉽게 확인할 수 있다.

```java
String a = "abcd";
String b = "abcd";
System.out.println(a == b);  // True
System.out.println(a.equals(b)); // True
 
String c = new String("abcd");
String d = new String("abcd");
System.out.println(c == d);  // False
System.out.println(c.equals(d)); // True
```

문자열이 메모리에 어떻게 저장되는지에 대한 더욱 자세한 내용은 [Create Java String Using "" or Constructor?](http://www.programcreek.com/2014/03/create-java-string-by-double-quotes-vs-by-constructor/)에서 볼 수 있다.