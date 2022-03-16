export default class Helpers {
    /**
     * Obtener información de la web
     * @param {String} url Url a solicitar información por método GET
     * @returns Información recibida en formato JSON
     */
    static fetchGet = async (url) => {
        const req = await fetch(url);
        const data = await req.json();
        return data;
    }

    /**
     * Separar fecha dada en sus componentes de año, mes y día
     * @param {String} date Fecha separada por guion AAAA-MM-DD
     * @returns Objeto con propiedades year, month, day
     */
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

    /**
     * Oculta varios elementos con una clase en común y solo muestra uno específico
     * @param {String} commonClass Clase en común para varios elementos
     * @param {String} idToShow Identificador del elemento que se quiere mostrar
     */
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

    /**
     * Dadas fechas de festivos retorna el html dándoles formato
     * @param {Objet} param0 Objeto con la propiedad holidays
     * @returns Texto con estructura HTML
     */
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

    /**
     * Dada una ruta de archivo retorna el contenido del mismo en formato texto
     * @param {String} page Ruta de archivo que se quiere cargar
     * @returns Texto del archivo
     */
    static fetchPage = async (page) => {
        const req = await fetch(page);
        const html = await req.text();
        return html;
    }

    /**
     * Carga un contenido dado dentro de una etiqueda especificada
     * @param {String} containerSelector Selector del contenedor
     * @param {String} content Contenido a cargar
     */
    static loadContent = (containerSelector, content) => {
        const container = document.querySelector(containerSelector)
        container.innerHTML = content;
    }

}