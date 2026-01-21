
const FAQBtn = document.querySelectorAll('.FAQLeft .faqbtn');
const rightSection = document.querySelectorAll('.FAQRight .rightSection');
const FAQcontent = document.querySelectorAll('.rightSection .FAQcontent');
const storeListItems = document.querySelectorAll('.storeList li');
const mapIframe = document.getElementById('storeMap');
const mainTabBtns = document.querySelectorAll('.csBtnBox button');
const mainSections = document.querySelectorAll('.tab-section');
const noticeList = document.querySelectorAll('.section4 .nList li');
const viewImg = document.querySelector('.section4 .viewBody img');


FAQBtn.forEach(faqbtn =>{
        faqbtn.addEventListener('click',e=>{

            FAQBtn.forEach(btn=>{
                btn.classList.remove('active');
            })
            e.target.classList.add('active');

            const getId = e.target.getAttribute('data-tab')


            rightSection.forEach(rightCs=>{
                rightCs.classList.remove('active');
            })

            const getSection = document.getElementById(getId);
            if(getSection) {
                getSection.classList.add('active')
            }

        })
})

FAQcontent.forEach(content =>{
    content.addEventListener('click',e=>{

        const awaitActive = e.currentTarget.classList.contains('active');

        FAQcontent.forEach(con=>{
            con.classList.remove('active');
        })
        if(!awaitActive){
            e.currentTarget.classList.toggle('active')
        }
    })
})

storeListItems.forEach(item=>{
    item.addEventListener('click',e=>{
        const mapUrl = e.currentTarget.getAttribute('data-map');

        if(mapUrl){
            mapIframe.src = mapUrl;
        }
        storeListItems.forEach(li => li.classList.remove('active')); 
        e.currentTarget.classList.add('active'); 
    })
})

mainTabBtns.forEach(btn =>{
    btn.addEventListener('click',e=>{
        mainTabBtns.forEach(button => button.classList.remove('active'));
        
        e.currentTarget.classList.add('active');
        
        const targetId = e.currentTarget.getAttribute('data-tab');
        mainSections.forEach(sec => sec.classList.remove('active'));

        const targetSectionId = document.getElementById(targetId);
        if(targetSectionId){
            targetSectionId.classList.add('active')
        }

    })
})

const noticeData = [
    {
        img: "images/del.jpg", 
    },
    {
        img: "images/sol.jpg",
    },
    {
        img: "images/black.jpg",
    },
    {
        img: "images/chu.jpg",
    },
    {
        img: "images/member.jpg",
        
    }
];

noticeList.forEach((item, index) => {
    item.addEventListener('click', e => {
        noticeList.forEach(li => li.classList.remove('active'));
        e.currentTarget.classList.add('active');
        if(noticeData[index]){
            viewImg.src = noticeData[index].img;
        }
    });
});






