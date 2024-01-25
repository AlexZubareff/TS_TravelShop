
import {Modal} from "../../classess/modal";
import {toursDataArray} from "../../index"; // ссылка на массив с данными


// Определить типы для метода (возвращающие и для переменных в теле функции)

export function openModal(type: string, i: number) {

    const data = toursDataArray[i];
    console.log("data: ", data);
    const tourId: string = data?.id;
    console.log("tourId: ", tourId);
    let modalInfo = {};
    switch (type) {
        case "order":
            const modalTemplate = `
      <div> 
      <p data-modal-id=${tourId} class="close-modal">x</p>
      <p>${data.name}</p>
      <p>${data.description}</p>
       
       <div data-tour-id=${tourId} class="ticket-submit">
       <a href="ticket.html">Купить билет</a>
</div>
     </div>
  `
            const findModal = Modal.modals.find(x => x.id === tourId);
            console.log("findModal: ", findModal);
            if(!findModal) {
                const modal = new Modal(`${tourId}`);
                modal.open(modalTemplate);
                break;
            }

    }

}

function removeModal() {
    Modal.removeById();
}

