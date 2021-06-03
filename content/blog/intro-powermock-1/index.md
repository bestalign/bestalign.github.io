---
title: PowerMock 사용하기 1
category: dev
tags:
  - Java
  - Mockito
  - PowerMock
  - Unit Test
date: 2017-05-07 04:43:35
redirect_from:
  - /2017/05/07/intro-powermock-1/
---

![](/powermock-logo.png)

Mockito가 지원하는 기능은 간단한 기능의 유닛테스트에는 충분하지만 코드 구조가 복잡할 경우 테스트하기에 힘든 부분이 많다. 혹은 반대로, 테스트를 위해서 좋은 코드 구조를 포기해야만 하는 경우도 있다. PowerMock은 그런 문제들을 피해 유닛테스트를 할 수 있게 도와준다. 이 글은 [PowerMock의 Wiki](https://github.com/powermock/powermock/wiki)를 보고 나름대로 정리한 것이다.

이 글의 모든 예제 코드는 JUnit v4.12, PowerMock v1.6.6, Mockito v1.10.+ 을 기준으로 작성되었다. 추가로 PowerMock v1.6.6 기준으로 Mockito v2나 EasyMock도 지원한다. 공식 위키에 훨씬 더 자세한 내용이 있다.

## Setup

다음과 같이 `build.gradle`에 패키지를 추가하고 Gradle sync를 실행하자. 순서대로 JUnit v4.12,  PowerMock v1.6.6, 그리고 PowerMock v1.6.6과 호환되는 Mockito 버전(작성기준 v1.10.19)을 설치한다. 

```groovy
// omitted for readability

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.12'
    testCompile "org.powermock:powermock-module-junit4:1.6.6"
    testCompile "org.powermock:powermock-api-mockito:1.6.6"
}
```

또, PowerMock을 JUnit test에 사용하기 위해 `@RunWith(PowerMockRunner.class)` Annotation을 원하는 Test class에 추가해주자.

```java
@RunWith(PowerMockRunner.class) // set PowerMockRunner here!
class UnitTest {
  @Test
  public void test()
  {
    // test code here
  }
}
```

## 캡슐화 우회 (Bypass Encapsulation)

캡슐화 우회를 위한 메소드들은 모두 `org.powermock.reflect.Whitebox` 패키지에 정의되어 있다. 패키지의 이름에서도 알 수 있듯이 모든 기능은 리플랙션(reflection)으로 만들어졌다. 사실 이 패키지를 사용하지 않고도 직접 리플랙션 코드로 private 필드나 메소드에 접근할 수 있다. 하지만 역시 이런 세세한 기능을 직접 만드려면 수고가 많이 들기 때문에 Powermock을 사용하는 것을 추천한다.

### Private field access
Getter나 setter가 없어서 private 필드에 접근이 불가능 할 때 `setInternalState()`/`getInternalState()`메소드를 이용하면 접근이 가능하다.

```java
public class PrivateField {
  private String secretField;
}

/////////////////////////////////////////////////////////////////////

import org.powermock.reflect.Whitebox;

@RunWith(PowerMockRunner.class)
public class PrivateFieldTest {
  @Test
  public void accessPrivateFieldByName() {
    PrivateField pf = new PrivateField();
    Whitebox.<String>setInternalState(pf, "secretField", "secret value");
    String s = Whitebox.<String>getInternalState(pf, "secretField");
    Assert.assertEquals("secret value", s);
  }

  @Test
  public void accessPrivateFieldByType() {
    PrivateField pf = new PrivateField();
    Whitebox.setInternalState(pf, String.class, "secret value");
    String s = Whitebox.getInternalState(pf, String.class);
    Assert.assertEquals("secret value", s);
  }
}
```

**이름** 혹은 **타입**으로 특정 private 필드에 접근한다. 필드 타입으로 접근하면 코드를 짤 때는 손쉽지만, 따로 주석을 달아놓지 않는 이상 나중에 테스트 코드를 수정할 때 어느 필드에 접근하는 건지 바로 알기 어렵다는 단점이 있다. 또, 같은 타입의 필드가 여러개 있을 경우 타입으로 접근하는 것이 불가능하다. 코드가 조금 더 길어지더라도 필드 이름으로 접근하는 것이 길게 봤을 때 좋다.

### Private method invocation

`invokeMethod()`로 private 메소드를 호출할 수 있다.

```java
public class PrivateMethod {
    private int sum(int x, int y) { return x + y; }
}

/////////////////////////////////////////////////////////////////////

import org.powermock.reflect.Whitebox;

@RunWith(PowerMockRunner.class)
public class PrivateMethodTest {
  @Test
  public void invokePrivateMethodByName() throws Exception {
    PrivateMethod pm = new PrivateMethod();
    int sum = Whitebox.<Integer>invokeMethod(pm, "sum", 1, 2);
    Assert.assertEquals(3, sum);
  }

  @Test
  public void invokePrivateMethodWithoutName() throws Exception {
    PrivateMethod pm = new PrivateMethod();
    int sum = Whitebox.<Integer>invokeMethod(pm, 1, 2); // without method name
    Assert.assertEquals(3, sum);
  }
}
```

private 필드를 **이름** 혹은 **타입**으로 찾는 것처럼, `invokeMethod()`는 **이름** 또는 **메소드 파라미터 타입**으로 메소드를 찾는다. 같은 파라미터 타입을 가진 메소드가 또 있으면 호출이 불가능하므로 이름까지 꼭 적어주는 편이 좋다.

### Super class' private field access / method invocation

심지어 오버라이드(override)되어서 직접 접근할 수 없는 부모 클래스의 필드나 메소드에도 접근이 가능하다. 위의 예제들과 똑같이 `setInternalState()`/`getInternalState()`/`invokeMethod()`메소드를 사용한다.

```java
public class PrivateParentClass {
    private String secretField;
    private void secretMethod() {
        secretField = "parent method called!";
    }
}
public class PrivateChildClass extends PrivateParentClass {
    private String secretField;
    private void secretMethod() { 
        secretField = "child method called!"; 
    }
}

/////////////////////////////////////////////////////////////////////

import org.powermock.reflect.Whitebox;

@RunWith(PowerMockRunner.class)
public class PrivateSuperFieldTest {
  @Test
  public void accessPrivateSuperFieldByName() {
    PrivateChildClass pcc = new PrivateChildClass();

    Whitebox.setInternalState(pcc, "secretField", "child field accessed!");
    Whitebox.setInternalState(pcc, "secretField", "parent field accessed!", PrivateParentClass.class);

    String childField = Whitebox.getInternalState(pcc, "secretField");
    String parentField = Whitebox.getInternalState(pcc, "secretField", PrivateParentClass.class);

    Assert.assertEquals("child field accessed!", childField);
    Assert.assertEquals("parent field accessed!", parentField);
  }

  @Test
  public void invokePrivateSuperMethod() throws Exception {
    PrivateChildClass pcc = new PrivateChildClass();
    Whitebox.invokeMethod(pcc,"secretMethod");
    Whitebox.invokeMethod(pcc, PrivateParentClass.class,"secretMethod");

    String childField = Whitebox.getInternalState(pcc, "secretField");
    String parentField = Whitebox.getInternalState(pcc, "secretField", PrivateParentClass.class);

    Assert.assertEquals("child method called!", childField);
    Assert.assertEquals("parent method called!", parentField);
  }
}
```

기존과 똑같이 사용하지만 접근하려는 특정 클래스 타입을 추가 파라미터로 넣어주면 된다. 일반적으로 오버라이드된 필드나 메소드를 접근할 일은 거의 없어서 그냥 이런 기능이 있다 정도만 알아두면 될 듯하다.

### Private constructor invocation

자주 사용할 일은 없겠지만 private 생성자를 직접 호출하는 것도 가능하다.

```java
public class PrivateConstructor {
  private final int val;

  private PrivateConstructor() { this.val = 42; }

  private PrivateConstructor(int val) { this.val = val; }

  public int getVal() { return this.val; }
}

/////////////////////////////////////////////////////////////////////

import org.powermock.reflect.Whitebox;

@RunWith(PowerMockRunner.class)
public class PrivateConstructorTest {
  @Test
  public void privateConstructor() throws Exception {
    PrivateConstructor pc = Whitebox.invokeConstructor(PrivateConstructor.class);
    Assert.assertEquals(42, pc.getVal());
  }

  @Test
  public void privateConstructorWithArgs() throws Exception {
    PrivateConstructor pc = Whitebox.invokeConstructor(PrivateConstructor.class, 43);
    Assert.assertEquals(43, pc.getVal());
  }
}
```

## 관련글
* [Mockito 사용하기 1](/intro-mockito-1)
* [Mockito 사용하기 2](/intro-mockito-2)
