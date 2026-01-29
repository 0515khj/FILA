
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const [header, footer] = await Promise.all([
            fetch('header.html').then(res => res.text()),
            fetch('footer.html').then(res => res.text())
        ]);
        document.querySelector('#header').innerHTML = header;
        document.querySelector('#footer').innerHTML = footer;

        /* 서브 메뉴용 */
        await loadMenu();

        headerEvent();
        footerEvent();

        const $top = document.querySelector('#top');

        if ($top) {
            $top.addEventListener('click', e => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return false;
            });

            window.addEventListener('scroll', e => {
                if (window.scrollY > 100) {
                    $top.classList.add('active');
                } else {
                    $top.classList.remove('active');
                }
            });
        }

    } catch (error) {
        console.log('에러 상세 내용:', error);
    }
})


/* 헤더 검색 및 리스트바 함수 */
function headerEvent() {
    const header = document.querySelector('header')
    const xBtn = document.querySelector('.xBtn');
    const searchPop = document.querySelector('.searchPopup');
    const searchDown = document.querySelector('.searchBox');
    const searchBg = document.querySelector('.searchBg');
    const mobileList = document.querySelector('.mobile');
    const menuPop = document.querySelector('.menuPop');
    const menuDim = document.querySelector('.menuDim');
    const menuClose = document.querySelector('.menuClose');
    const sub = document.querySelector('.Line2sub');
    const wrap = document.querySelector(".headerLine2 .list");
    const upcoming = document.querySelector(".headerLine2 .list .UPCOMING");
    const fixed = document.querySelector('.fixed-header');


    if (fixed) {
        header.classList.add('active');
    }


    window.addEventListener('scroll', e => {
        if (fixed) return;
        if (window.scrollY > 50) {
            header.classList.add('active');
        } else {
            if (!sub.classList.contains('active')) {
                header.classList.remove('active')
            }
        }
    })




    /* 검색 창 올림 */
    xBtn.addEventListener('click', e => {
        searchPop.style.top = "-55%"
        searchBg.classList.remove('active');
    })
    /* 검색 창 내림 */
    searchDown.addEventListener('click', e => {
        searchPop.style.top = "0"
        searchBg.classList.add('active');
    })

    searchBg.addEventListener('click', e => {
        searchPop.style.top = "-55%";
        searchBg.classList.remove('active');
    });

    /* 메뉴 리스트 */
    mobileList.addEventListener('click', e => {
        menuPop.classList.add('active');
        menuDim.classList.add('active');
    })

    const close = () => {
        menuPop.classList.remove('active');
        menuDim.classList.remove('active');
    }

    menuClose.addEventListener('click', close);
    menuDim.addEventListener('click', close);

    document.querySelectorAll(".headerLine2 li").forEach(li => {
        li.addEventListener("mouseenter", e => {
            getSubMenu(li.textContent.trim());
            header.classList.add('active');
        })
    })
    sub.addEventListener('mouseenter', e => {
        header.classList.add('active');
    });

    wrap.addEventListener('mouseleave', e => {
        if (sub.contains(e.relatedTarget)) return;
        sub.classList.remove('active');
        if (!fixed) {
            if (window.scrollY <= 50) {
                header.classList.remove('active');
            }
        }
    });


    sub.addEventListener("mouseleave", (e) => {
        if (wrap.contains(e.relatedTarget)) return;
        sub.classList.remove("active");
        if (!fixed) {
            if (window.scrollY <= 50) {
                header.classList.remove('active');
            }
        }
    });

    upcoming.addEventListener('mouseenter', e => {
        sub.classList.remove('active');
        header.classList.add('active');
    });

}


let menu = null;

const loadMenu = async () => {
    const response = await fetch('/data/submenu.json');
    menu = await response.json();
}



/* 서브메뉴 함수 */
function getSubMenu(menuValue) {
    const sub = document.querySelector('.Line2sub');
    sub.classList.add('active');
    const data = menu[menuValue];
    const typeKids = data.type === 'kids' ? 'kidsMenu' : '';


    /* tennis */
    if (data.type === "tennis") {
        sub.innerHTML = `
         <div class="container megaMenu tennisMenu">
         <div class="left">
         <a href="SubPage.html">
                <h3>${data.featureTitle}</h3>
                <ul>
                    ${data.feature.map(item => `<li>${item}</li>`).join("")}
                </ul>
                </a>
            </div>
        <div class="right">
        <div class="rightInleft">
        ${data.columns.map(col => `
            
                <div class="col">
                    <h4>${col.title}</h4>
                    <a href="SubPage.html">
                        <ul>
                        ${col.items.map(item => `<li>${item}</li>`).join("")}
                        </ul>
                    </a>
                </div>`).join("")}
                    <a href="#" class="tennisServiceBtn">
                        🎾 테니스화 커스텀 서비스
                    </a>
            </div>
            <div class="rightInright">
                    ${data.media.map(media => `
                        <div class="mediaItem">
                            <img src="${media.src}" alt="${media.title}">
                            <p>${media.title}</p>
                        </div>
                    `).join("")}
            </div>
        </div>
    </div>

        `
        return;
    }

    /* Brand */
    if (data.type === "brand") {
        sub.innerHTML = `
      <div class="container brandMenu">
        <div class="brandGrid">
          ${data.cards
                .map(
                    (c) => `
              <a href="#" class="brandCard">
                <div class="imgBox">
                  <img src="${c.img}" alt="${c.title}">
                </div>
                <p class="title">${c.title}</p>
              </a>
            `
                )
                .join("")}
        </div>
      </div>
    `;
        return;
    }

    /* 여성 남성 + 키즈 전용 */
    sub.innerHTML = `
    <div class="container megaMenu ${typeKids}">
        <div class="left">
            <h3>${data.featureTitle}</h3>
            <a href="SubPage.html">
            <ul>
                ${data.feature.map(item => `<li>${item}</li>`).join("")}
            </ul>
            </a>
        </div>

        <div class="right">
            ${data.columns.map(col => `
                <div class="col">
                    <h4>${col.title}</h4>
                    <a href="SubPage.html">
                    <ul>
                        ${col.items.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                    </a>
                </div>
                `).join("")}
        </div>
    </div>
    `
}

/*  푸터 쪽 함수 */
function footerEvent() {

    const footerBtn = document.querySelector('.familyButton');
    const info = document.querySelector('.familyInfo');

    footerBtn.addEventListener('click', e => {
        info.classList.toggle('active');
    });

    document.addEventListener('click', e => {
        if (!footerBtn.contains(e.target) && !info.contains(e.target)) {
            info.classList.remove('active')
        }
    })


}