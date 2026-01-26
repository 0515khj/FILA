# FILA Korea 웹사이트 리뉴얼 🏃‍♂️

> HTML, CSS, JavaScript를 활용한 FILA 공식 웹사이트 리뉴얼 프로젝트

## 📖 프로젝트 소개

FILA Korea 공식 웹사이트의 사용성 문제를 분석하고 현대적인 UI/UX를 적용하여 개선한 개인 포트폴리오 프로젝트입니다.

**개발 기간**: 2026.01.20 ~ 2026.01.27 (약 1주일)

## 🎯 개발 동기

기존 FILA 웹사이트의 다음과 같은 문제점을 발견하고 개선하고자 했습니다:

- **복잡한 상품 탐색**: 카테고리 구분이 명확하지 않아 원하는 제품을 찾기 어려움
- **일관성 없는 UI**: 페이지별로 다른 디자인 패턴 적용
- **모바일 최적화 부족**: 반응형 대응이 미흡한 일부 섹션

## ✨ 주요 개선 사항

### 1. 상품 목록 페이지 (PLP)
- ✅ 왼쪽 사이드바에 카테고리 및 필터 통합 배치
- ✅ 그리드/리스트 뷰 전환 기능
- ✅ 필터 접기/펼치기로 화면 공간 효율성 증대

### 2. 메인 페이지
- ✅ Swiper.js 활용한 자동 슬라이드 배너
- ✅ 스타일 제안 갤러리 (캐주얼, 시티캐주얼, 내추럴)
- ✅ 반응형 그리드 레이아웃

### 3. 상품 상세 페이지 (PDP)
- ✅ 다중 이미지 슬라이더 (Swiper.js)
- ✅ 색상/사이즈 선택 인터랙션
- ✅ 수량 조절에 따른 실시간 가격 업데이트
- ✅ 아코디언 형태의 상품 정보 표시

### 4. 반응형 디자인
- ✅ 모바일, 태블릿, 데스크탑 3단계 브레이크포인트
- ✅ 480px, 768px, 1024px 기준 레이아웃 변경
- ✅ 터치 친화적 UI 요소 (버튼 크기, 간격 조정)

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **Markup** | HTML5 |
| **Styling** | CSS3, Bootstrap Icons, Font Awesome |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **Library** | Swiper.js (슬라이더) |
| **Data** | JSON (상품 데이터 관리) |
| **Design** | Figma |

## 📂 프로젝트 구조

```
fila/
├── css/
│   ├── reset.css            # CSS 리셋
│   ├── index.css            # 메인 페이지 스타일
│   ├── common.css           # 공통 페이지 스타일 (header, footer)
│   ├── SubPage.css          # 상품 목록 페이지 스타일
│   └── detail.css           # 상품 상세 페이지 스타일
│   ├── login.css            # 로그인 페이지 스타일
│   ├── join.css             # 회원가입 페이지 스타일
│   ├── cs.css               # 고객센터 페이지 스타일
├── js/
│   ├── index.js             # 메인 페이지 기능
│   ├── common.js            # 헤더/푸터 등 공통 기능
│   ├── SubPage.js           # 상품 목록 필터링
│   └── detail.js            # 상세 페이지 인터랙션
│   └── loginAndJoin.js      # 로그인 인터랙션
│   └── cs.js                # 고객센터 인터랙션
├── data/
│   ├── bestItem.json        # 베스트 아이템 데이터
│   ├── subItem.json         # 상품 목록 데이터
│   └── cate.json            # 카테고리 데이터
│   └── submenu.json         # 서브메뉴 데이터
├── images/                 # 이미지 리소스
├── index.html              # 메인 페이지
├── SubPage.html            # 상품 목록 페이지
└── detail.html             # 상품 상세 페이지
└── login.html              # 로그인 페이지
└── join.html               # 회원가입 페이지
└── cs.html                 # 고객센터 페이지
└── header.html             # 헤더 페이지
└── footer.html             # 푸터 페이지
```

## 💡 주요 기능 구현

### 1. 동적 상품 필터링 (SubPage.js)
```javascript
// 카테고리별 상품 필터링
function setCategoryEvent() {
    menuItems.forEach(menu => {
        menu.addEventListener('click', (e) => {
            const selectedCategory = menu.dataset.category;
            
            if (selectedCategory === 'all') {
                displayProducts(allProducts);
            } else {
                const filteredList = allProducts.filter(
                    item => item.category === selectedCategory
                );
                displayProducts(filteredList);
            }
        });
    });
}
```

### 2. 실시간 가격 계산 (detail.js)
```javascript
// 수량 변경에 따른 가격 업데이트
const basePrice = 259000;

function updatePrice(quantity) {
    const totalPrice = basePrice * quantity;
    priceSpan.textContent = totalPrice.toLocaleString();
}

plusBtn.addEventListener('click', function() {
    let num = parseInt(currentNumber.textContent);
    num++;
    currentNumber.textContent = num;
    updatePrice(num);
});
```

### 3. JSON 데이터 활용 (index.js)
```javascript
// 비동기로 상품 데이터 로드
fetch('/data/bestItem.json')
    .then(response => response.json())
    .then(data => {
        bestData = data;
        startBestItem('flowDown');
    })
    .catch(error => console.log('데이터 에러 : ', error));
```

## 📱 반응형 브레이크포인트

| 디바이스 | 해상도 | 주요 변경사항 |
|---------|--------|--------------|
| **Mobile** | ~ 480px | 2단 그리드, 필터 버튼화, 간소화된 정보 |
| **Tablet** | 481px ~ 768px | 3단 그리드, 사이드바 스틱 해제 |
| **Desktop** | 769px ~ 1024px | 3~4단 그리드, 사이드바 고정 |
| **Large Desktop** | 1025px ~ | 4단 그리드, 전체 레이아웃 최적화 |

## 🎨 디자인 시스템

### Color Palette
```css
/* Primary Colors */
--brand-navy: #001E62;
--brand-red: #DC001A;

/* Grayscale */
--gray-900: #1A1A1A;
--gray-700: #4A4A4A;
--gray-500: #767676;
--gray-300: #C4C4C4;
--gray-100: #F5F5F5;
```

### Typography
- **Font**: Pretendard (Korean), Roboto (English)
- **Scale**: 48px (H1) → 11px (Caption)


**주의**: JSON 파일을 불러오기 때문에 로컬 서버 환경에서 실행해야 합니다.

## 📊 구현 체크리스트

### 메인 페이지
- [x] 히어로 배너 슬라이더
- [x] 베스트 아이템 탭 전환
- [x] 기획전 섹션
- [x] 추천 스타일 필터링
- [x] 카테고리별 상품 전시
- [x] 인스타그램 갤러리

### 상품 목록 페이지
- [x] 카테고리 필터
- [x] 다중 필터 (스포츠/성별/색상/사이즈/가격)
- [x] 필터 토글 기능
- [x] 상품 개수 표시
- [x] 그리드/리스트 뷰
- [x] 찜하기 기능

### 상품 상세 페이지
- [x] 이미지 슬라이더
- [x] 색상 선택
- [x] 사이즈 선택
- [x] 수량 조절
- [x] 가격 계산
- [x] 아코디언 정보
- [x] 모델컷 갤러리
- [x] 핏 가이드
- [x] 사이즈 표

## 🎓 개발 과정에서 배운 점

### 기술적 성장
- **JSON 데이터 관리**: 상품 데이터를 JSON으로 분리하여 유지보수성 향상
- **Vanilla JS 활용**: 라이브러리 없이 DOM 조작 및 이벤트 처리 경험
- **반응형 설계**: 모바일 퍼스트 접근법 적용 및 다양한 미디어쿼리 활용
- **코드 재사용성**: 공통 컴포넌트 분리 및 모듈화

### UX 개선 사례
- 필터링 시스템을 왼쪽 사이드바에 통합하여 사용자 동선 개선
- 상품 호버 시 추가 이미지 표시로 정보 전달력 향상
- 아코디언 UI로 상세 정보를 단계적으로 제공


## 📸 스크린샷

### 메인 페이지
![메인 페이지](링크)

### 상품 목록
![상품 목록](링크)

### 상품 상세
![상품 상세](링크)

## 🔗 링크

- **Live Demo**: [배포 링크]
- **Figma Design**: [디자인 파일]
- **Portfolio**: [포트폴리오 링크]
