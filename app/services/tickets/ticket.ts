import {IVipTicket, TicketType} from "../../models/ticket/ticket";
import {initTicketElementTemplate} from "../../templates/ticketInfo";
import {postTicketData} from "@rest/tickets";
import {ITours} from "../../models/tours";
import {IUser} from "../../models/user/user";



let ticketPostInstance: TicketType;
const clientType = "custom";
export function initTicketInfo(ticket: TicketType | IVipTicket) {
    const targetElement = document.querySelector('.ticket-info');

    const ticketDescription: string = ticket?.description;
    const ticketOperator: string = ticket?.tourOperator;
    let vipClientType: string;
    if ("vipStatus" in ticket) {
        vipClientType = ticket.vipStatus;
    }


    const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];
    console.log("ticketElemsArr: ", ticketElemsArr);
    let ticketElemTemplate: string;

    ticketElemsArr.forEach((el: string, i: number): void => {
        ticketElemTemplate+= initTicketElementTemplate(el, i);
    });

    targetElement.innerHTML = ticketElemTemplate;

}

export function initUserData() {
    const userInfo = document.querySelectorAll('.user-info > p');
    let userInfoObj: IUser;
    userInfo.forEach((el: Element) => {
        const inputDataName: string = el.getAttribute('data-name');
        if (inputDataName) {
            const inputElems: HTMLInputElement = el.querySelector('input');
            userInfoObj[inputDataName] = inputElems.value;
        }
    });

    console.log('userInfoObj',userInfoObj)
    return userInfoObj;
}

export function initPostData(data: {}) {
    initUserData();
    postTicketData(data).then((data) => {
        if (data.success) {

        }
    })
}

export function registerConfirmButton(): void {
    const targetEl: HTMLElement = document.getElementById('accept-order-button');
    if (targetEl) {
        targetEl.addEventListener('click', () => {
            initPostData(ticketPostInstance);
        });
    }
}
