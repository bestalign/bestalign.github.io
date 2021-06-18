---
title: Let's Split Keyboard 조립기
category: everydaylife
tags: ["Keyboard", "Assembly", "Let's Split"]
date: 2017-07-03 02:26:38
redirect_from:
  - /2017/07/03/let-s-switch-keyboard-assembly/
---

![](/keyboard.png)

몇 달전 Massdrop에 올라온 [Planck](https://www.massdrop.com/buy/planck-mechanical-keyboard?mode=open_guest)를 보자마자 곧바로 주문했다. 개인적으로 그리드형의 키보드를 좋아하기도 하고 미니멀한 디자인이 너무 이뻐보였다. 예상 배송일은 6월 말이었지만 현재 글을 쓰는 현재 -- 7월 초 -- 에도 발송은 안 된 상태... Massdrop의 배송속도는 원래부터 느린 걸 알고 있었기 때문에 주문을 했을 때부터 어느정도 예상했었다. 그래서 Planck가 도착하기 전에 남땜 연습겸 뭔가 하나 더 해볼까 고민하다가 Let's Split Keyboard를 사서 조립해 보기로 했다.

자세한 조립 & 그 외 자세한 내용은 다음의 페이지를 참고하면 된다:
- 조립: https://github.com/nicinabox/lets-split-guide/blob/master/assembly.md
- 빌드셋업: https://docs.qmk.fm/#/newbs_getting_started
- Flashing: https://github.com/nicinabox/lets-split-guide/blob/master/flashing.md

## 재료구매

![](/parts.jpg)

필요한 재료는 다음과 같다.
* [Let's Split PCB](http://www.switchtop.com/product/let-s-split-40-percent-pcb) x 2
* [5V/16MHz Pro Micros](https://mehkee.com/products/pro-micro-5v-16mhz) x 2
* [1N4148TR Diode](https://mehkee.com/products/diodes-1n4148tr) x 48
* [CP-43514-ND TRRS Jacks](https://mehkee.com/products/trrs-jacks) x 2
* [TRRS Cable](https://mehkee.com/products/trrs-cable) x 1
* Case
* Cherry MX 호환 스위치 x 48

대부분의 재료는 [Mehkee](https://mehkee.com)라는 사이트에 대부분있어서 편하게 구할 수 있다. 심지어 지금은 [Let's Split Keyboard Kit](https://mehkee.com/products/lets-split-acrylic-cases-kits)까지 팔기 시작해서 더 쉬워졌다.

나는 이 사이트를 알기전에 여러곳에서 재료를 사서 따로따로 배송을 받는 바람에 꽤 많은 시간이 걸렸다.

## 조립

### Diodes
![](/diodes1.jpg)
Let's Split PCB는 회로만 그려져 있어서 다이오드(Diode)와 컨트롤러(Pro Micro)를 직접 PCB에 남땜해줘야 한다. 구조상 컨트롤러는 나중에 붙여야하니 먼저 다이오드를 모두 납땜하자. 양 PCB를 놓았을 때 모두 위쪽으로 향해야 한다. 그리고 왼쪽/오른쪽 상관없이 모든 다이오드의 검정선은 ■ 쪽으로 가야 한다.

![](/diodes2.jpg)
난 남땜에 소질이 없어서 한땀한땀 수를 놓는 기분으로 했다. 그래서 두 PCB에 다이오드 48개를 남땜하는데에도 무려 1시간반... 실수로 다이오드를 태워먹지 않도록 가능한한 단번에 남땜하려고 노력했다.

### TRRS Jacks, Mount Header Pins

컨트롤러와 같이 온 Mount Header Pins과 TRRS Jack을 다이오드의 반대편에 남땜한다. 나중에 Mount Header Pin 위에 컨트롤러를 끼워야하니 평행을 잘 맞춰서 납땜하자. 그렇지 않으면 컨트롤러의 pinhole과 아귀가 안 맞게 된다. 또, pin 사이의 간격이 좁기 때문에 땜납이 서로 붙지않도록 조심해야 한다.

![](/trrs_header_pin1.jpg)

그리고 아래 사진을 자세히 보면 JRRS Jack 아랫쪽도 남땜이 필요하다. 왼쪽 오른쪽 PCB를 다르게 해야하니 잘 확인해야한다. 남땜제거기가 있다면 이건 실수해도 쉽게 고칠 수 있으니 ㅇㅋ.

![](/trrs_header_pin2.jpg)

여기까지 Diodes, TRRS Jacks, Mount Header Pins 완료.

### Case, Switches

케이스는 [Ponoko](https://www.ponoko.com)에서 투명 아크릴로 주문 제작했다. 케이스 디자인은 간단히 [이 곳](http://qmk.fm/lets_split/)에서 제공하는 svg파일을 사용했다. 첫 주문은 $20 할인해줘서 $25 (대략 $17 case + $8 shipping)에 살 수 있었다.

![](/case1.jpg)

레이저로 구워서(?) 나온 녀석이라 포장을 뜯자마자 탄내가 엄청나다. 붙어있는 종이를 뜯어내면 이렇게 깔끔하게 나온다.

![](/case2.jpg)

스위치는 다른 부품보다 약간 더 투자해서 개당 $1.1 의 Zealios 62g를 구매했다. 48개니까 대략 $53. 케이스에 스위치를 끼워넣고 PCB에 남땜한다. 먼저 케이스의 모서리 쪽 스위치만 남땜하자. 다른 스위치의 기준이 되기 때문에 평행을 잘 맞춰야한다.

![](/case_switch1.jpg)

그 뒤에 모든 스위치를 남땜. 반대쪽 PCB에도 똑같이 하자. 여기까지 4시간 넘게 소비한듯.

![](/case_switch2.jpg)

### Pro Micros, TRRS cable

이제 Mount Header Pins에 컨트롤러를 올릴 차례다. 구조상 남땜제거를 하기 힘들기 때문에 먼저 불량 컨트롤러인지 확인을 하는게 좋은데.. 나는 전압/전류 확인을 할 수 있는 공구가 없기 때문에 확인없이 그냥 무식하게 가기로 했다.

![](/controller1.jpg)

그리고 TRRS cable로 양쪽을 연결하고 바닥 케이스를 끼워주면 하드웨어는 일단 끝이다.

![](/controller2.jpg)

### Flashing

프로그래머를 업으로 하고 있지만 아이러니하게도 이 부분이 가장 힘들었다. 잘못하다가 컨트롤러 날려먹는 건 아닌가 싶기도 했고..

나는 macOS Sierra 기준으로 작업했다. 먼저 brew로 코드빌드에 필요한 유틸을 빌드한다.
```shell
brew tap osx-cross/avr
brew install avr-libc
brew install dfu-programmer
brew install dfu-util
brew install avrdude
```

다음은 git으로 qmk_firmware repo를 clone하고 Let's split keyboard의 default keymap을 빌드.
```shell
git clone http://github.com/qmk/qmk_firmware.git
cd keyboards/lets_split
make rev2-default
```

여기까지하면 컨트롤러에 들어갈 hex 파일이 준비된다. 이제 컨트롤러에 업로드만 하면 되는데 이곳에서 시간을 많이 소비했다. 이상하게도 Flashing 관련 문서의 커맨드가 제대로 먹지않고 에러만 계속 뱉어냈다. 정식 컨트롤러 대신 싼 [$6짜리 카피품](https://www.amazon.com/KOOKYE-ATmega32U4-arduino-Leonardo-ATmega328/dp/B01HCXMBOU)을 사용해서 일지도 모르겠다. 그 문제를 해결하려고 구글링하면서 방법을 찾아보다가 [제품 페이지의 리뷰](https://www.amazon.com/gp/customer-reviews/R2JKYWFGBWNGU/ref=cm_cr_dp_d_rvw_btm?ie=UTF8&ASIN=B01HCXMBOU) 하나가 눈에 들어왔다. 나랑 비슷한 문제를 가지고 있다가 해결했다는 내용인데 배쉬 커맨드가 하나 있었다.

`avrdude -c avr109 -p atmega32u4 -P $SERIAL_PORT -U flash:w:$HEX_FILE`

`$SERIAL_PORT`와 `$HEX_FILE`을 적절히 고쳐서 입력했더니 업로드에 성공했다. 똑같이 반대쪽 PCB 컨트롤러에도 업로드.

## 마무리

![](/keyboard.png)

조립 후에 컴퓨터에 연결해서 테스트를 해봤다. 운 좋게도 납땜 실수로 키가 안 먹거나 잘못 입력되거나 하는 경우는 없었다. 키감도 내가 생각했던 것보다 더 좋다. 체리 갈축보다 아주 약간 더 가볍지만 훨씬 부드러워서 오래 사용해도 부담없을 것 같은 느낌. 조금 더 있으면 Planck도 올텐데 좋은 조립 연습이 된 것 같기도 하고 -- 정작 Planck는 다이오드와 컨트롤러 남땜이 필요없어서 훨씬 쉬울 것 같지만.. 

기계식 키보드에 관심이 많고 좀 수고스럽더라도 자신이 직접 키보드를 만들어 보길 원한다면 한번 시도해 볼만하다. 물론 생각보다 지출이 크기 때문에 실패해도 부담없는 분에게 추천. 그럼에도 불구하고 남땜 실력에 자신이 있다면 추천.