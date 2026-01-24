let allProducts = []; 
const menuItems = document.querySelectorAll('.cateList li');

async function loadProducts(e) {
    try {
        e.preventDefault();
        const response = await fetch('/data/subItem.json');
        allProducts = await response.json(); 
        
        setCategoryEvent();
        filterToggle();
        itemCount();
        const defaultMenu = document.querySelector('.cateList li.active');

        if(defaultMenu){
            defaultMenu.click();
        }else{
            displayProducts(allProducts);
        }

        const heartBtn = document.querySelectorAll('.heartBtn');
        const sizeBtn = document.querySelectorAll('.sizeGrid button');
       heartBtn.forEach(heart=>{
        heart.addEventListener('click',e=>{
            e.currentTarget.classList.toggle('active');
        })
       })
       
       sizeBtn.forEach(size=>{
        size.addEventListener('click',e=>{
           sizeBtn.forEach(btn=> btn.classList.remove('active'))
                e.currentTarget.classList.add('active');
        })
       })

       
      

    } catch (error) {
        console.error('상품 데이터를 불러오는 중 오류 발생:', error);
    }
}

function itemCount(){
    menuItems.forEach(menu =>{
        const category = menu.dataset.category;
        
        let count = 0;
        if(category === 'all'){
            count = allProducts.length;
        }else {
            count = allProducts.filter(item => item.category === category).length;
        }

        const countValue = menu.querySelector('.count');
        
        countValue.innerHTML = count;

    })
}




function filterToggle(){
      const filterOnOff = document.querySelector('.filterBtn');
      const leftMenu = document.querySelector('.leftMenu');
        filterOnOff.addEventListener('click',e=>{
            e.currentTarget.classList.toggle('active');
            if(e.currentTarget.classList.contains('active')){
                leftMenu.classList.add('hide');
            }else{
                leftMenu.classList.remove('hide');
            }
        })
}





function displayProducts(items) {
    const productList = document.querySelector('#productList');
    
    productList.innerHTML = '';

    if (items.length === 0) {
        productList.innerHTML = '<li class="emptyItem">해당하는 상품이 없습니다.</li>';
        return;
    }

    items.forEach(item => {
        const tagText = item.tags ? item.tags.join(' · ') : '';
        const priceText = item.price.toLocaleString();
        const heartCount = Math.floor(Math.random() * 100) + 1;
        const reviewCount = Math.floor(Math.random() * 200) + 1;

        const li = document.createElement('li');
        li.classList.add('productItem');

            li.innerHTML = `
            <div class="imgBox">
                <a href="detail.html">
                    <div class="img-all">
                    <img src="${item.images[0]}" alt="${item.name}">
                    <img src="${item.images[1]}" alt="${item.name}">
                    </div>
                </a>
                <button class="heartBtn"><i class="bi bi-heart"></i></button>
            </div>
            <div class="miniImg">
                    ${item.images.slice(2).map(img=>
                        `<img src="${img}" alt="${item.name}">`
                    ).join('')}
            </div>
            <div class="infoBox">
                <a href="detail.html">
                    <span class="tags">${tagText}</span>
                    <p class="name">${item.name}</p>
                    <p class="price">${priceText}원</p>
                    <p class="rating">
                    <i class="bi bi-heart-fill" style="color:#ddd; font-size:12px;"></i> ${heartCount} 
                    &nbsp;★ 4.9(${reviewCount})
                    </p>
                </a>
            </div>
        `;
        
        productList.appendChild(li);
    });
}


function setCategoryEvent() {

    menuItems.forEach(menu => {
        menu.addEventListener('click', (e) => {
            menuItems.forEach(m => m.classList.remove('active'));
            menu.classList.add('active');

            const selectedCategory = menu.dataset.category;

            if (selectedCategory === 'all') {
                displayProducts(allProducts);
            } else {
                const filteredList = allProducts.filter(item => item.category === selectedCategory);
                displayProducts(filteredList);
            }
        });
    });
}


window.addEventListener('load', loadProducts);