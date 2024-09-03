let sliderWrap = document.querySelector('.slider-wrap')
let slider = document.querySelector('.slider')
let clonesWidth
let sliderWidth // 전체 슬라이더 너비 
let clones = []
let disableScroll = false 
let scrollPos 

let items = document.querySelectorAll('.slider-item')
let images = document.querySelectorAll('.img-div')

images.forEach((image, idx) => {
    image.style.backgroundImage = `url('./images/${idx+1}.jpeg')`
})

items.forEach(item => {
    let clone = item.cloneNode(true) // true 이면 item 안의 자손까지 다 포함해서 복사함
    clone.classList.add('clone')
    slider.appendChild(clone)
    clones.push(clone)
})

function getClonesWidth(){
    let width = 0
    clones.forEach(clone => {
        width += clone.offsetWidth // 요소너비
    })
    return width 
}

function getScrollPos(){
    return window.scrollY 
}

function setScrollPos(pos){
    window.scrollTo({top: pos})
}

function scrollUpdate(){
    if(window.innerWidth > 760){ // window.innerWidth : 디바이스 크기
        sliderWrap.style.overflow = 'hidden'
        scrollPos = getScrollPos()
        console.log(scrollPos)
        if(clonesWidth + scrollPos >= sliderWidth){ // 한사이클 돌았을때. 즉, 슬라이더 절반만큼 이동했을때
            setScrollPos(1) // 처음으로 다시 돌아감. 그래야 무한정 보여줄수 있음. 0 으로 해도 동작함
        }else if(scrollPos <= 0){ // 스크롤을 올리는 경우
            setScrollPos(sliderWidth - clonesWidth - 1) // 슬라이더의 중간지점으로 점프해서 거꾸로 보여줌
        }
        slider.style.transform = `translateX(${-scrollPos}px)` // 스크롤 내린만큼 왼쪽으로 슬라이더가 이동함
        requestAnimationFrame(scrollUpdate)
    }else{ // 모바일
        sliderWrap.style.overflow = 'scroll' // 모바일에서는 무한스크롤 아니고 일반 스크롤
    }
    
}

function onLoad(){
    calculateDimensions()
    document.body.style.height = `${sliderWidth}px` // 4000px 만큼 스크롤 내릴동안 2000px 만큼 슬라이더가 이동함. 즉, 컨텐츠 전체높이를 슬라이더 너비로 설정함.
    setScrollPos(1)
    scrollUpdate()
}

function calculateDimensions(){
    sliderWidth = slider.getBoundingClientRect().width  // 4000px
    clonesWidth = getClonesWidth() // 1998px // clonesWidth 는 슬라이더 너비의 절반
    console.log(sliderWidth, clonesWidth)
}

onLoad()

window.addEventListener('resize', onLoad) // 디바이스 크기가 달라질때마다 컨텐츠 높이를 다시 계산함