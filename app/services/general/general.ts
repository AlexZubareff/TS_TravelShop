
/* Общие методы используются для вставки текста в header   footer*/

/*  -
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы
*/
import {getTourTemplate} from "../../templates/tours";
import {openModal} from "@services/modal/modalService";
import {ITours} from "../../models/tours";

export function initHeaderTitle(ticketName: string, selector: string): void {
    const headerElement: HTMLElement = document.querySelector('header');
    const targetItem: HTMLElement = headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initFooterTitle(ticketName: string, selector: string) {
    const headerElement: HTMLElement = document.querySelector('footer');
    const targetItem: HTMLElement = headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initToursDivElements(data: ITours[]):void {

    if (Array.isArray(data)) {
        const rootElement: Element = document.querySelector('.main-app');
        const tourWrap: HTMLDivElement = document.createElement('div');

        tourWrap.classList.add('tour-wrap');

        // init click for modal
        initTourElemListener(tourWrap);

        let rootElementData: string = '';
        data.forEach((el: ITours, i:number) => {
            rootElementData += getTourTemplate(el, i);
        });

        tourWrap.innerHTML = rootElementData;
        rootElement.appendChild(tourWrap) ;
    }
}


function initTourElemListener(tourWrap) {
    console.log(tourWrap);
    tourWrap.addEventListener('click', (ev) => {
        const targetItem = ev.target;
        console.log(typeof (targetItem));
        console.log("targetItem",targetItem);
        const parentItem = targetItem?.parentNode;
        let realTarget: HTMLElement;

        if (targetItem.hasAttribute('data-tour-item-index')) {
            realTarget = targetItem;
        } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
            realTarget = parentItem;
        }

        if (realTarget) {
            const dataIndex = realTarget.getAttribute('data-tour-item-index');
            openModal('order', Number(dataIndex));
        }


    });
}

