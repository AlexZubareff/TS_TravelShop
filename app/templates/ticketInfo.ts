
// указать возвращающий тип
import {ITours} from "../models/tours";

export function initTicketElementTemplate(data: string, i: number): string {
    return `
       <div  data-item-index=${i} class="ticket-block">
           <p>${data}</p>
       </div>
    `

}