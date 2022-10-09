// добавляем кнопку "ещё...", если больше 4 времён
const time = document.querySelectorAll('.cards__item__text__time');
time.forEach(item => {
    if (item.childNodes.length > 4) {
        for (i = 3; i < item.childNodes.length; i++) {
            item.childNodes[i].classList.add('hide');
        }
        item.innerHTML += '<div class="cards__item__text__time-item more">ещё...</div>';
    }
});

// при клике на время выделяем его другим цветом
const list = document.querySelectorAll('.cards__item__text__time-item');
list.forEach((item, i) => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('more')) {
            item.classList.toggle('cards__item__text__time-item-click');
            list.forEach((elem, el) => {
                if (el !== i) {
                    elem.classList.remove('cards__item__text__time-item-click');
                }
            });
        }
    });
});

// при клике на кнопку "ещё" показываем скрытые времена
const cards = document.querySelectorAll('.cards__item');
const img = document.querySelectorAll('.cards__item__img');
time.forEach((item, i) => {
    if (item.lastElementChild.classList.contains('more')) {
        item.lastElementChild.addEventListener('click', () => {
            item.lastElementChild.classList.add('hide');
            for (j = 3; j < item.childNodes.length - 1; j++) {
                item.childNodes[j].classList.remove('hide');
            }
            if (document.documentElement.clientWidth > 1199) {
                img[i].style.height = cards[i].clientHeight + 'px';
            }
        });
    }
});

// при изменении размера окна
window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > 1199) {
        for (i = 0; i < img.length; i++) {
            img[i].style.height = cards[i].clientHeight + 'px';
        }
    } else {
        for (i = 0; i < img.length; i++) {
            img[i].style.height = img[i].firstElementChild.clientHeight + 'px';
        }
    }
});