import View from './View.js';

const EastView = Object.create(View);

EastView.setup = function (el) {
    this.init(el);
    this.createSelector(el);
    this.bindEvents();
    return this;
}

EastView.createSelector = function(el) {
    this.mainEl = document.querySelector('.main');
    this.tabEls = el.querySelectorAll('.east .tab');
    this.tabContentEls = el.querySelectorAll('.east .tabcontent');
    this.closeEl = el.querySelector('.east .close');
    this.slideBtnEl = el.querySelector('.east .slide-btn');
    this.collapseEl = document.querySelector('.east-collapse');
}

//이벤트 등록
EastView.bindEvents = function () {
    const tabsElList =  Array.from(this.tabEls);

    //Tab 클릭
    this.tabEls.forEach((tabEl, index) => {
        tabEl.addEventListener('click', e => {
            this.selectedIndex !== index && this.onClickTab(index);
        });
    });

    //close 클릭
    this.closeEl.addEventListener('click', e => {
        e.stopPropagation(); //Close버튼 눌렀을때 Tab 클릭에 대한 이벤트 버블링 방지
        const tabIndex = tabsElList.indexOf(this.closeEl.parentNode);
        this.closeTab(tabIndex);
    });

    //slide 버튼 클릭 이벤트등록
    this.slideBtnEl.addEventListener('click', e => {
        this.mainEl.classList.add('slide-right');
        this.collapseEl.classList.add('open');
    });
}

EastView.onClickTab = function (index) {
    this.emit('@changeTab', index);
}

EastView.closeTab = function (selectedIndex) {
    this.tabEls[selectedIndex].style.display = 'none';

    this.onchangeContent(selectedIndex);
    this.emit('@closeTab', selectedIndex);
}

EastView.setActiveTab = function (selectedIndex) {
    this.selectedIndex = selectedIndex;
    this.tabEls.forEach((tabEl, index) => {
        if(index === selectedIndex) {
            tabEl.classList.add('active');
            this.onchangeContent(selectedIndex);
        } else {
            tabEl.classList.remove('active');
        }
    });
}

EastView.onchangeContent = function(selectedIndex) {
    this.tabContentEls.forEach((tabContentEl, index) => {
        if(selectedIndex === index) {
            tabContentEl.style.display = 'block';
        } else {
            tabContentEl.style.display = 'none';
        }
    }); 
}

EastView.drawGrid = function(data) {
    console.log(data);
}

EastView.sortGridData = function() {

}

export default EastView;