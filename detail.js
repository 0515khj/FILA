document.addEventListener('DOMContentLoaded', function() {
    const acoItems = document.querySelectorAll('.acoItem');
     const sizeButtons = document.querySelectorAll('.detailSize .btn-box button');
      const minusBtn = document.querySelector('.numBtn .fa-minus');
    const plusBtn = document.querySelector('.numBtn .fa-plus');
    const currentNumber = document.querySelector('.currentNumber');
    const priceSpan = document.querySelector('.price p span');
    const heart = document.querySelector('.heart');
    
    acoItems.forEach(item => {
        const acoH3 = item.querySelector('.acoH3');
        
        acoH3.addEventListener('click', function() {
            // 클릭한 아이템이 이미 열려있는지 확인
            const isOpen = item.classList.contains('open');
            
            // 모든 아이템 닫기
            acoItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.acoH3').classList.remove('active');
            });
            
            // 클릭한 아이템이 닫혀있었다면 열기
            if (!isOpen) {
                item.classList.add('open');
                acoH3.classList.add('active');
            }
        });
    });

    heart.addEventListener('click',e=>{
        e.target.classList.toggle('active')
    })

   
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

   
    const basePrice = 259000;

    minusBtn.addEventListener('click', function() {
        let num = parseInt(currentNumber.textContent);
        if (num > 1) {
            num--;
            currentNumber.textContent = num;
            updatePrice(num);
        }
    });

    plusBtn.addEventListener('click', function() {
        let num = parseInt(currentNumber.textContent);
        num++;
        currentNumber.textContent = num;
        updatePrice(num);
    });

    function updatePrice(quantity) {
        const totalPrice = basePrice * quantity;
        priceSpan.textContent = totalPrice.toLocaleString();
    }
});