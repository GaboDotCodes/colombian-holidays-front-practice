export default class Helpers {
    static fetchGet = async (url) => {
        const req = await fetch(url);
        const data = await req.json();
        return data;
    }

    static splitDate = (date) => {
        const dateArray = date.split('-');
        if (dateArray.length === 2) {
            return {
                year: dateArray[0],
                month: dateArray[1]
            }
        } else if (dateArray.length === 3) {
            return {
                year: dateArray[0],
                month: dateArray[1],
                day: dateArray[2]
            }
        }
    }

    static hideAllExceptOne = (commonClass, idToShow) => {
        const elements = document.querySelectorAll(`.${commonClass}`);
        elements.forEach((element) => {
            if (element.id !== idToShow) {
                element.style.display = 'none';
            } else {
                element.style.display = 'block';
            }

        })
    }

    static holidaysHTML = ({holidays}) => {
        const monthsNames = ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo', 'Junio',
                            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let html = '';
        for (let i = 1; i <= 12 ; i++) {
            const days = holidays.filter((holiday) => holiday.month === i)
            if (days.length !== 0) {
                html += `<div class="month-block">
                            <h2 class="month-name">${monthsNames[i-1]}</h2>
                            <ol>
                                ${days.map(({day, name}) => 
                                    `<li class="holiday-li">
                                        <span class="holiday-number">${String(day).padStart(2, '0')}</span>
                                        <span class="holiday-name">${name}</span>
                                    </li>`
                                    ).join('')}
                            </ol>
                        </div>
                        `;
            }
        }
        return html !== ''? html : '<h1>No hay festivos 😢</h1>';
    }

    static fetchPage = async (page) => {
        const req = await fetch(page);
        const html = await req.text();
        return html;
    }

    static loadContent = (containerSelector, content) => {
        const container = document.querySelector(containerSelector)
        container.innerHTML = content;
    }

}