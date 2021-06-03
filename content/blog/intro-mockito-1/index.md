---
title: Mockito 사용하기 1
category: dev
tags:
  - Java
  - Unit Test
  - Mockito
date: 2016-07-08 02:40:06
redirect_from:
  - /2016/07/08/intro-mockito-1/
---

![](mockito-logo.png)

이번에 안드로이드 개발을 시작하게 되면서 Mockito와 PowerMock을 처음 만져보게 되었다. Java로 계속 개발을 해왔지만 사용한 유닛테스트 프레임워크와는 사용법이 좀 달랐고, Mockio와 PowerMock을 함께 사용하다보니 헷갈리는 부분이 있어 시간을 내서 한 번 찬찬히 정리를 해보기로 했다. 이 글은 [Mockio JavaDoc](http://site.mockito.org/mockito/docs/current/org/mockito/Mockito.html)에 있는 글에서 필요한 것을 뽑아 추가설명을 더 한 것이다. 내용이 많으므로 조금씩 나눠서 올릴 계획이다.

## Setup

Mockito는 JUnit위에서 동작하며 Mocking과 Verification을 도와주는 프레임워크이다. build.gradle 파일을 아래의 코드와 같이 업데이트 하자.

```groovy
repositories { 
  jcenter()
}
dependencies { 
  testCompile "org.mockito:mockito-core:1.+"
}
```

업데이트 후 프로젝트를 새로 빌드하면 자동으로 다운로드가 될 것이다.

## Mocking과 Verification

예제에서는 List 클래스를 유닛테스트에 사용하지만 실제로 테스트할 때는 자신이 만든 클래스를 사용하자. List 클래스를 테스트할 필요는 없으니까.

```java
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

// mock
List mockedList = mock(List.class);

// mock 사용하기
mockedList.add("one");
mockedList.clear();

// verification
verify(mockedList).add("one");
verify(mockedList).clear();
```

Mockito를 import 할 때에는 `import static org.mockito.Mockito.mock`처럼 하자. `import org.mockito.Mockito`만 하면 메소드를 호출할때마다 `Mockito`를 앞에 붙여줘야 해서 불편하다.

`mock()`를 사용하면 아주 손쉽게 클래스나 인터페이스의 mock을 만들 수 있다. `mock(List.class)`처럼 클래스를 직접 넘겨주면 된다. 생성된 mock은 자신의 모든 행동을 기억하는데, `verify()`를 이용해서 원하는 메소드가 특정 조건으로 실행되었는지를 검증할 수 있다.

## Stubbing

```java
// 클래스 뿐만이 아니라 인터페이스도 mock 할 수 있다.
LinkedList mockedList = mock(LinkedList.class);

// stubbing
when(mockedList.get(0)).thenReturn("first");
when(mockedList.get(1)).thenThrow(new RuntimeException());

System.out.println(mockedList.get(0)); // first
System.out.println(mockedList.get(1)); // Runtime exception 발생
System.out.println(mockedList.get(10)); // null

verify(mockedList).get(0);
```

생성한 Mock의 메소드를 호출하면 아무런 행동도 하지 않는다. 위의 예제에서와 같이 Mock의 메소드를 호출해도 실제로 코드를 실행하지 않으므로 내부의 값은 변하지 않는다. 메소드의 리턴값도 객체의 경우 `null`, int의 경우 `0`, boolean의 경우 `false`로 그 타입의 기본값을 넘겨준다.
stub은 메소드의 행동을 원하는 대로 미리 정해두는 것을 말한다. `when()`, `thenReturn()`, `thenThrow()`등을 사용해서 mock의 메소드의 리턴값 또는 예외발생을 정할 수 있다. 메소드 호출 시의 파라미터 값까지 조건으로 넣을 수 있어서 세세한 컨트롤이 가능하다. 같은 조건으로 다시 stub 할 경우 이전의 행동을 덮어 씌운다. 덮어쓰기를 빈번히 사용할 경우 코드가 쉽게 산으로 갈 수 있으니 꼭 필요할 때만 사용하자. 일단 stub된 메소드는 계속 그 값을 돌려준다.

## Argument matchers

```java
when(mockedList.get(anyInt())).thenReturn("int");
when(mockedList.add(anyFloat())).thenReturn(true);
when(mockedList.add(anyString())).thenReturn(true);

System.out.println(mockedList.get(999)); // int
System.out.println(mockedList.add(3.3)); // true
System.out.println(mockedList.add("string")); // true

verify(mockedList).get(anyInt());
verify(mockedList).add(anyFloat());
verify(mockedList).add(eq("string"));
```

stubbing과 verification을 할 때  `anyInt()`, `anyFloat()`, `anyString()`, `eq()`등으로 넘기는 값에 대한 특정 조건을 지정할 수 있다. 직접 matcher를 만들 수도 있지만 일단 여기서는 스킵.

## Verifying exact number of invocations / at least / at most / never

```java
mockedList.add("once");

mockedList.add("twice");
mockedList.add("twice");

mockedList.add("three times");
mockedList.add("three times");
mockedList.add("three times");

verify(mockedList).add("once"); // times(1) 기본값
verify(mockedList, times(1)).add("once");

verify(mockedList, times(2)).add("twice");
verify(mockedList, times(3)).add("three times");

verify(mockedList, never()).add("never happened"); // 호출된 적 없음

verify(mockedList, atLeastOnce()).add("three times"); // 최소 한 번
verify(mockedList, atLeast(2)).add("five times"); // 최소 두 번
verify(mockedList, atMost(5)).add("three times"); // 최대 다섯 번
```

`verify()`는 기본적으로 메소드 호출이 한 번 되는 것을 검증할 수 있다. 추가로 `times()`, `atLeast()`, `atMost()`, `never()`등을 사용하면 특정 호출 횟수 및 최소/최대 횟수를 지정해서 검증할 수 있다.

## Stubbing void methods with exceptions

void를 리턴형식으로 갖는 메소드는 stub하는 법이 약간 다르다. 위에서 설명한 일반 stubbing은 `when(mock.method()).thenReturn(value)` 형식인데, `mock.method()`이 void값을 가지면 `when(void)`처럼 되기 때문에 Java 문법에 맞지않기 때문이다. 대신 `doThrow(new Exception()).when(mock).method()`처럼 사용한다.

```java
doThrow(new RuntimeException()).when(mockedList).clear();

mockedList.clear(); // RuntimeException
```

## Verification in order

메소드에 호출 시 넘긴 값 뿐만이 아니라 메소드 호출 순서도 검증가능하고, `inOrderObj.verify(mock.method())`같은 형식으로 쓰면 된다. 여러 mock의 메소드 호출 순서도 검증할 수 있다.

```java
// single mock
List singleMock = mock(List.class);

singleMock.add("first");
singleMock.add("second");

InOrder inOrder = inOrder(singleMock);

inOrder.verify(singleMock).add("first");
inOrder.verify(singleMock).add("second");

// multiple mocks
List firstMock = mock(List.class);
List secondMock = mock(List.class);

//using mocks
firstMock.add("first");
secondMock.add("second");

InOrder inOrder = inOrder(firstMock, secondMock); // pass multiple mocks to verify

inOrder.verify(firstMock).add("first");
inOrder.verify(secondMock).add("second");
```

## Finding Redundant Invocations

mock의 행동이 모두 검증 되었는지 확인한다. 모든 테스트에 사용할 필요는 없고 정말 필요한 곳에만 사용하길 추천한다.

```java
mockedList.add("one");
mockedList.add("two");

verify(mockedList).add("one");

verifyNoMoreInteractions(mockedList); // fail here
```