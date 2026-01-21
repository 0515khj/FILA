document.addEventListener("DOMContentLoaded", e => {
    const tabBtns = document.querySelectorAll('.section1 .filterBtn button');
    const bestBox = document.querySelector('.section1 .best');
    const styleBtn = document.querySelectorAll('.section3 .filterBtn button');
    const styleBox = document.querySelectorAll('.section3 .styleImgBox');
    const cateBtns = document.querySelectorAll('.section4 .filterBtn button');
    const cateLeftImg = document.querySelector('.cateLeft img');
    const bannerTitle = document.querySelector('#bannerTitle');
    const bannerDesc = document.querySelector('#bannerDesc');
    const cateRight = document.querySelector('.cateRight');



    let bestData = null;

    fetch('bestItem.json')
        .then(response => response.json())
        .then(data => {
            bestData = data;
            startBestItem('flowDown');
        })
        .catch(error => console.log('데이터 에러 : ', error));

    tabBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            tabBtns.forEach(tab => tab.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const category = e.currentTarget.dataset.tab;

            startBestItem(category);
        })
    })

    function startBestItem(category) {

        const items = bestData[category];
        bestBox.innerHTML = '';

        items.forEach((item, idx) => {

            const tag = item.tags.map(tag => `<p>${tag}</p>`).join('');

            let priceHTML = '';

            if (item.sale) {
                priceHTML = `
                    <p>
                        <span style="text-decoration:line-through; color:#ccc; font-size:0.8em; margin-right:5px">${item.originalPrice}</span>
                        <span>${item.price}</span>
                        <span style="color:#ff0000; font-weight:bold; margin-left:5px">${item.sale}</span>
                    </p>
                    `;
            } else {
                priceHTML = `<p>${item.price}</p>`;
            }
            const div = document.createElement('div');

            div.classList.add('bestItem', `item${idx + 1}`);

            div.innerHTML = `
                    <a href="detail.html">
                      <div class="bestItem">
                        <div class="img-box">
                            <img src="${item.img}">
                        </div>
                        <div class="bestLabel">
                            ${tag}
                        </div>
                        <div class="textDec">
                            <p>${item.title}</p>
                        </div>
                        <div class="bestPrice">
                            ${priceHTML}
                        </div>
                      </div>    
                    </a>
                `;
            bestBox.append(div);

        })
    } /* startBestItem end */

    function styleGo() {
        styleBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                styleBtn.forEach(del => del.classList.remove('active'));
                e.currentTarget.classList.add('active');
                const styleName = e.currentTarget.dataset.tab;
                styleBox.forEach(box => box.classList.remove('active'));
                const getBox = document.querySelector(`.section3 .styleImgBox.${styleName}`)
                if (getBox) {
                    getBox.classList.add('active')
                }
            })
        })
    }
    styleGo();

    function cateGo() {
        let cateData = null;

        fetch('cate.json')
            .then(response => response.json())
            .then(data => {
                cateData = data;
                startCate('woman');
            })
            .catch(error => console.log('카테고리 에러:', error))

        cateBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                cateBtns.forEach(catebtn => catebtn.classList.remove('active'));
                e.currentTarget.classList.add('active');

                const type = e.currentTarget.dataset.tab;

                // 화면 업데이트 실행
                startCate(type);
            })
        })

        function startCate(type) {


            const data = cateData[type];
            cateLeftImg.src = data.banner.img;
            bannerTitle.textContent = data.banner.title;
            bannerDesc.textContent = data.banner.desc;

            cateRight.innerHTML = '';

            data.list.forEach(item => {
                const tagHTML = item.tags.map(t => `<span>${t}</span>`).join('');

                const div = document.createElement('div');
                div.classList.add('cateItem'); 

                div.innerHTML = `
                    <div class="img-box">
                        <img src="${item.img}" alt="${item.title}">
                    </div>
                    <div class="item-info">
                        <div class="tags">${tagHTML}</div>
                        <p class="title">${item.title}</p>
                        <p class="price">${item.price}</p>
                    </div>
                `;
                cateRight.appendChild(div);
            });
        }
    }
    cateGo();



})