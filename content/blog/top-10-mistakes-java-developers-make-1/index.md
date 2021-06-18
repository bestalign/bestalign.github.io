---
title: 자바 프로그래머가 자주 실수 하는 10가지 - 1
date: 2015-08-31 21:30:49
category: translation
tags: ["Java", "mistake"]
redirect_from:
	- /2015/08/31/top-10-mistakes-java-developers-make-1/
---

원문: http://www.programcreek.com/2014/05/top-10-mistakes-java-developers-make/

다음글: [자바 프로그래머가 자주 실수하는 10가지 - 2](/top-10-mistakes-java-developers-make-2)

### #1. 일반 배열을 ArrayList로 변환하기
보통 많은 개발자가 다음과 같이 일반 배열을 `ArrayList`로 변환한다:

```java
List<String> list = Arrays.asList(arr);
```

`Arrays.asList()`는 `Arrays`의 private 정적 클래스인 `ArrayList`를 리턴한다. `java.util.ArrayList` 클래스와는 다른 클래스이다. `java.util.Arrays.ArrayList` 클래스는 `set()`, `get()`, `contains()` 매서드를 가지고 있지만 원소를 추가하는 매서드는 가지고 있지 않기 때문에 사이즈를 바꿀 수 없다. 진짜 `ArrayList`를 받기 위해서는 다음과 같이 변환하면 된다:

```java
ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(arr));
```

`ArrayList`의 생성자는 `java.util.Arrays.ArrayList`의 상위(super) 클래스인 Collection type도 받아들일 수 있다.

### #2. 일반 배열에 특정 값이 들어있는지 확인하기
보통 이렇게 많이 확인한다:

```java
Set<String> set = new HashSet<String>(Arrays.asList(arr));
return set.contains(targetValue);
```

이 코드는 동작하지만 list를 set으로 변환하는 것은 시간도 더 걸릴뿐더러 사실 할 필요가 없다. 대신에 다음과 같이 처리할 수 있다:

```java
Arrays.asList(arr).contains(targetValue);

// OR

for(String s: arr){
	if(s.equals(targetValue))
		return true;
}
return false;
```

첫번째 솔루션이 훨씬 읽기 편하다.

### #3. Loop에서 list의 원소를 제거하기
다음과 같이 Loop 안에서 원소를 제거한다고 하자:

```java
ArrayList<String> list = new ArrayList<String>(Arrays.asList("a", "b", "c", "d"));
for (int i = 0; i < list.size(); i++) {
	list.remove(i);
}
System.out.println(list);

// output
// [b, d]
```

위의 코드에는 아주 심각한 문제가 있다. 원소가 삭제될 때, list의 사이즈가 줄어들면서 다른 원소들의 index도 바뀌어 버린다. 그래서 만약 loop 내에서 다수의 원소를 index를 사용해 삭제한다면 생각한대로 동작하지 않을 것이다.

아마 반복자(iterator)를 사용하는 것이 바른 방법이고, foreach loop가 내부적으로 반복자를 사용한다는 것을 알고 있을지도 모른다. 하지만 사실 다음의 foreach loop에서도 올바르게 동작하지 않는다:

```java
ArrayList<String> list = new ArrayList<String>(Arrays.asList("a", "b", "c", "d"));
 
for (String s : list) {
	if (s.equals("a"))
		list.remove(s);
}
```

위의 코드는 `ConcurrentModificationException`을 발생시킬 것이다.

다음의 코드는 제대로 동작한다:

```java
ArrayList<String> list = new ArrayList<String>(Arrays.asList("a", "b", "c", "d"));
Iterator<String> iter = list.iterator();
while (iter.hasNext()) {
	String s = iter.next();
 
	if (s.equals("a")) {
		iter.remove();
	}
}
```

반드시 `.remove()`전에 `.next()`가 호출되어야 한다. 만약 foreach loop안에서 원소가 삭제된 뒤에 `.next()`가 호출된다면 컴파일러는 `ConcurrentModificationException`을 발생시킬 것이다. `ArrayList.iterator()`의 코드가 깊이 이해하는 데 도움이 될 것이다.

### #4. Hashtable vs HashMap
알고리즘적으로 봤을 때 Hashtable은 자료구조 이름이지만 Java에서의 이름은 사실 `HashMap`이다. `Hashtable`이 `HashMap`과 가장 다른 점은 바로 동기화(synchronized)라는 것이다. 그래서 대부분 `Hashtable`보다는 `HashMap`을 사용하는 것이 좋다.

- [HashMap vs. TreeMap vs. Hashtable vs. LinkedHashMap](http://www.programcreek.com/2013/03/hashmap-vs-treemap-vs-hashtable-vs-linkedhashmap/)
- [Top 10 questions about Map](http://www.programcreek.com/2013/09/top-9-questions-for-java-map/)

### #5. Collection의 Raw Type 사용
Java에서는, _raw type_과 _unbounded wildcard type_이 쉽게 섞여서 함께 사용된다. Set을 예로 들어보면, `Set`은 raw type이고 `Set<?>`은 unbounded wildcard type이다.

다음과 같은 raw type `List`를 파라미터로 사용하는 코드가 있다고 하자:

```java
public static void add(List list, Object o){
	list.add(o);
}
public static void main(String[] args){
	List<String> list = new ArrayList<String>();
	add(list, 10);
	String s = list.get(0);
}

// Exception will be thrown..
// Exception in thread "main" java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
// 	at ...
```

raw type collection을 사용하는 것은 타입 체크를 건너뛰기 때문에 안전하지 않다. `Set`, `Set<?>`, `Set<Object>` 사이에는 아주 큰 차이가 있다. 다음 글들을 읽는 걸 추천한다.

- [Raw type vs. Unbounded wildcard](http://www.programcreek.com/2013/12/raw-type-set-vs-unbounded-wildcard-set/)
- [Type Erasure](http://www.programcreek.com/2011/12/java-type-erasure-mechanism-example/)