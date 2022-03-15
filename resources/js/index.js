import Helpers from "./helpers.js";

document.addEventListener('DOMContentLoaded', async () => {

    Helpers.hideAllExceptOne('detail-selector', 'year-input');

    let selectedOption = 'by-year';

    const bySelectors = document.querySelectorAll('.holidays-by');
    bySelectors.forEach((selector) => {
        selector.addEventListener('click', (e) => {
            const id = e.target.id;
            selectedOption = id;
            switch (id) {
                case 'by-year':
                    Helpers.hideAllExceptOne('detail-selector', 'year-input');
                    break;
                case 'by-month':
                    Helpers.hideAllExceptOne('detail-selector', 'month-input');
                    break;
                case 'by-day':
                    Helpers.hideAllExceptOne('detail-selector', 'day-input');
                    break;
            }

        });
    });

    const searchBtn = document.querySelector('#search');
    searchBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        let holidays;
        let html;
        switch (selectedOption) {
            case 'by-year':
                const yearInput = document.querySelector('#year-input');
                if (!yearInput.value) {
                    alert('Ingrese un año');
                } else {
                    holidays = await Helpers.fetchGet(`https://colombian-holidays.herokuapp.com/api/holidays/${yearInput.value}?by=year`);
                    html = Helpers.holidaysHTML(holidays);
                    Helpers.loadContent('main', html);
                }
                break;
            case 'by-month':
                const monthInput = document.querySelector('#month-input');
                if (!monthInput.value) {
                    alert('Ingrese un mes');
                } else {
                    const { month: m1, year: y1 } = Helpers.splitDate(monthInput.value);
                    holidays = await Helpers.fetchGet(`https://colombian-holidays.herokuapp.com/api/holidays/${m1}${y1}?by=month`);
                    html = Helpers.holidaysHTML(holidays);
                    Helpers.loadContent('main', html);
                }
                break;
            case 'by-day':
                const dayInput = document.querySelector('#day-input');
                if (!dayInput.value) {
                    alert('Ingrese una fecha');
                } else {
                    const { day: d2, month: m2, year: y2 } = Helpers.splitDate(dayInput.value);
                    const { holiday } = await Helpers.fetchGet(`https://colombian-holidays.herokuapp.com/api/holiday/${d2}${m2}${y2}`);
                    html = holiday ?
                        await Helpers.fetchPage('../resources/html/holiday.html')
                        : await Helpers.fetchPage('../resources/html/no-holiday.html');
                    Helpers.loadContent('main', html);
                }
                break;
        }
    });

    // fecha.toLocaleString('Default', { month: 'long'})
    // fecha.toLocaleString('Default', { weekday: 'long'})



});