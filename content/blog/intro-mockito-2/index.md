---
title: Mockito 사용하기 2
category: dev
tags:
  - Java
  - Unit Test
  - Mockito
date: 2016-07-10 02:18:23
redirect_from:
  - /2016/07/10/intro-mockito-2/
---

![](/mockito-logo.png)

[Mockito 사용하기 1](/intro-mockito-1)에서 이어지는 글이다.

## @Mock Annotation

Mock 생성은 쓸데없이 반복적이다. `@Mock` Annotation을 사용하면 좀 더 간단하게 mock을 할 수 있고 코드가독성도 좋아진다. `MockitoAnnotations.initMocks()` 또는 `@RunWith(MockitoJUnitRunner.class)`를 사용하면 자동으로 초기화를 해준다.

```java
public class ListTest {
  @Mock private List mockedList;

  @Before
  public void initMocks() {
      MockitoAnnotations.initMocks(this); // mock all the field having @Mock annotation
  }
  
  @Test
  public void test() {
    // test here
  }
}

// also with @RunWith annotation
@RunWith(MockitoJUnitRunner.class)
public class ListTest {
  @Mock private List mockedList;
 
  @Test
  public void test() {
    // test here
  }
}
```

## Iterator-style stubbing

가끔씩 하나의 메소드에서 순차적으로 여러 다른 값을 돌려주거나 예외를 발생시켜야 할 때가 있다. 한 번 stub한 값은 바뀌지 않지만 다음과 같이 매번 호출할 때 마다 다른 행동을 하도록 정할 수 있다.

```java
// chaining
when(mock.someMethod(anyString()))
  .thenReturn("foo")
  .thenReturn("bar")
  .thenThrow(new RuntimeException());

System.out.println(mock.someMethod("some arg")); // foo
System.out.println(mock.someMethod("some arg")); // bar
System.out.println(mock.someMethod("some arg")); // Runtime Exception

// multi arguments
when(mock.someMethod(anyString()))
  .thenReturn("one", "two");

System.out.println(mock.someMethod("some arg")); // one
System.out.println(mock.someMethod("some arg")); // two
System.out.println(mock.someMethod("some arg")); // two - 마지막 stub한 값으로 고정
```

## Stubbing with callbacks

이때까지의 예제에서는 stub 할 때 모두 특정값을 넣었다. 만약 mock의 상태나 메소드 인자값에 따라 다른 값을 돌려주게 하게 만들고 싶다면 어떻게 해야할까. `Answer<?>` 클래스를 사용하면 가능하다. 하지만 아주 특별한 상황이 아니라면 크게 사용할 일은 없을 듯하다.

```java
when(mockedList.get(anyInt())).thenAnswer(new Answer<Integer>() {
  public Integer answer(InvocationOnMock invocation) {
    Object[] args = invocation.getArguments(); // arguments
    List mock = (List)invocation.getMock(); // mock itself
    int result = (Integer)args[0] + 1;
    return result;
  }
});

System.out.println(mockedList.get(1)); // called with argument: 2
```

이 예제에서는 넘겨 받은 값에다가 1을 더해서 넘겨주도록 했다.

## Spying on real objects

`spy()`는 진짜 인스턴스를 mock하는 것이다. 당연히 spy된 인스턴스를 stub 할 수 있다.

```java
List list = new LinkedList();
List spy = spy(list);

when(spy.size()).thenReturn(100); // stubbing

spy.add("one");
spy.add("two");

System.out.println(spy.get(0)); // one
System.out.println(spy.size()); // 100

verify(spy).add("one");
verify(spy).add("two");

// Wrong use case
when(spy.get(10)).thenReturn("foo"); // IndexOutOfBoundsException

// use doReturn() instead
doReturn("foo").when(spy).get(0);
```

단, 어떤 경우는 stub 할 때 조심해야 한다. 위의 `when(spy.get(10))`에서는 진짜 인스턴스의 메소드를 호출하기 때문에 IndexOutOfBountException이 발생하게 된다. 이럴 경우 `doReturn()`를 사용해서 문제를 회피할 수 있다.

## Argument Matcher

이전의 예제에서 말했던 `anyInt()`, `anyString()`의 커스터마이즈 버전이다. stub, verification 용으로 쓸 수 있다. 클래스를 상속해서 `matches()`를 직접 구현하면 된다. 여러 곳에 재사용할 일이 경우 사용하면 좋다.

```java
class ListOfTwoElements extends ArgumentMatcher<List> {
  @Override
  public boolean matches(Object argument) {
    List list = (List)argument;
    return list.size() == 2;
  }
}

List mock = mock(List.class);
when(mock.addAll(argThat(new ListOfTwoElements()))).thenReturn(true);

mock.addAll(Arrays.asList("one", "two")); // true

verify(mock).addAll(argThat(new ListOfTwoElements()));
```

## Capturing arguments for further assertions

Argument Matcher와 비슷한 기능을 가지고 있는 Argument Captor라는 것도 있다. Argument Matcher와 다른 점은 따로 클래스를 만들 필요가 없다는 점, 그리고 verification에만 사용할 수 있다는 점이다.

```java
List mock = mock(List.class);
mock.addAll(Arrays.asList("one", "two"));  // false

ArgumentCaptor<List> argument = ArgumentCaptor.forClass(List.class);
verify(mock).addAll(argument.capture());
Assert.assertTrue(argument.getValue().size() == 2);
```

## Resetting mocks

mock을 초기화를 위해서는 `reset()`을 사용하면 된다. 사실 간단히 새로 mock을 하나 만들면 되기 때문에 거의 쓸 일은 없을 것이다.

```java
List mock = mock(List.class);
when(mock.size()).thenReturn(10);
mock.add(1);

reset(mock);
```

## Verification with timeout

실행시간이 중요한 메소드라면 `timeout()`을 사용해서 검증할 수 있다. `times()`나 `atLeast()`와도 같이 사용할 수 있다.

```java
verify(mock, timeout(100)).size();
verify(mock, timeout(100).times(2)).size();
verify(mock, timeout(100).atLeast(2)).size();
```

## One-liner stubs

체이닝(chaining)을 이용해서 mock 생성과 stub 까지 한 줄에 만들 수 있다. 마지막에 `getMock()`이 중요한 포인트. 코드가독성도 좋은 편이다.

```java
List mock = when(mock(List.class).get(0)).thenReturn(1).thenReturn(2).thenThrow(Exception.class).getMock();
```

## Mocking Details

거의 쓸 일은 없을 것 같지만 mock인지 spy 된 인스턴스인지 확인도 할 수 있는 기능도 지원한다.

```java
mockingDetails(mock).isMock();
mockingDetails(mock).isSpy();
```

이것보다 훨씬 더 많은 기능들이 있으므로 공식 웹사이트의 문서를 보면 도움이 될 것이다. 현재 2.x 버전이 베타테스트 중이므로 나중에는 이 예제가 동작하지 않을 가능성이 있다. 이어지는 글에서는 PowerMock에 대해서 이야기할 것이다.