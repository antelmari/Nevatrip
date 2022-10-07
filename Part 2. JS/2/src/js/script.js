const time = document.getElementById('time');
const back = document.getElementById('back');
const route = document.getElementById('route');
const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const hours = document.querySelectorAll('.hour');

function calc() {
    // меняем время с учётом часового пояса пользователя
    const date = new Date();
    const offset = date.getTimezoneOffset();
    hours.forEach(item => {
        let hour = Number(item.value.slice(0, 2));
        let minutes = Number(item.value.slice(3, 5));
        let newTime = (hour - 3) * 60 - offset + minutes;
        if (newTime > 1439) {
            newTime = newTime - 1440;
        } else if (newTime < 0) {
            newTime = 1440 + newTime;
        }
        hour = Math.floor(newTime / 60);
        minutes = newTime % 60;
        item.value = getZero(hour) + ':' + getZero(minutes);
        item.innerHTML = item.value;
    });

    // функция добавления цифры 0 к записи часов и минут
    function getZero(num) {
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    route.value = route.firstElementChild.value;
    time.value = time.firstElementChild.value;
    back.value = back.lastElementChild.value;

    // клик при выборе маршрута
    let index = 0;
    route.addEventListener('change', () => {
        time.value = time.firstElementChild.value;
        back.value = back.lastElementChild.value;
        index = route.selectedIndex;
        if (index === 0) {
            form1.classList.remove('hide');
            form2.classList.add('hide');
        } else if (index === 1) {
            form1.classList.add('hide');
            form2.classList.remove('hide');
            back.childNodes.forEach(item => {
                item.classList.remove('hide');
            });
        } else if (index === 2) {
            form1.classList.remove('hide');
            form2.classList.remove('hide');
            backList();
        }
    });

    // функция корректировки времени обратно при выборе времени туда
    function backList() {
        let timeHour = Number(time.value.slice(0, 2));
        let timeMinutes = Number(time.value.slice(3, 5));
        let timeTime = (timeHour + 3) * 60 + offset + timeMinutes;
        back.childNodes.forEach(item => {
            let backHour = Number(item.value.slice(0, 2));
            let backMinutes = Number(item.value.slice(3, 5));
            let backTime = (backHour + 3) * 60 + offset + backMinutes;
            if (timeTime + 50 > backTime) {
                item.classList.add('hide');
            } else {
                item.classList.remove('hide');
            }
        });
    }

    time.addEventListener('change', () => {
        backList();
    });

    // запоминаем количество билетов
    const num = document.getElementById('num');
    num.value = 1;
    let numValue = num.value;

    num.addEventListener('change', () => {
        if (num.value === '' || num.value === '0') {
            num.value = 1;
        }
        numValue = num.value;
    });

    // считаем стоимость и выводим сообщение
    const button = document.getElementById('button');
    const answer = document.querySelector('.answer');
    let price = 0;
    let string = '';
    button.addEventListener('click', () => {
        let timeValue = time.value;
        let backValue = back.value;
        if (index === 0) {
            price = 700 * numValue;
            string = '50 минут';
            backValue = arrivalTime(timeValue);
        } else if (index === 1) {
            price = 700 * numValue;
            string = '50 минут';
            timeValue = backValue;
            backValue = arrivalTime(backValue);
        } else if (index === 2) {
            price = 1200 * numValue;
            string = '1 час 40 минут';
            backValue = arrivalTime(backValue);
        }
        answer.innerHTML = `
            <div>Вы выбрали маршрут ${route.value}, количество билетов: ${numValue}, стоимость: ${price}р.</div>
            <div>Это путешествие займет у вас ${string}.</div>
            <div>Теплоход отправляется в ${timeValue}, а прибудет в ${backValue}.</div>
        `;
    });

    // функция расчёта времени прибытия
    function arrivalTime(time) {
        let hour = Number(time.slice(0, 2));
        let minutes = Number(time.slice(3, 5));
        let newTime = hour * 60 + minutes + 50;
        if (newTime > 1439) {
            newTime = newTime - 1440;
        } else if (newTime < 0) {
            newTime = 1440 + newTime;
        }
        hour = Math.floor(newTime / 60);
        minutes = newTime % 60;
        let result = getZero(hour) + ':' + getZero(minutes);
        return result;
    }
}

calc();