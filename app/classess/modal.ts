

export class Modal {
    private readonly id: string;
    public static modals: any[] = [];

    constructor(id = null) {
        const findModal = Modal.modals.find(x => x.id === id);
        console.log("findModal: ", findModal);
        if(!findModal) {
            Modal.removeById(id);
        }

        Modal.modals.push(this);
        console.log("Modal.modals", Modal.modals);
        this.id = id || (Math.random() + Modal.modals.length)
    }
    open(modalTemplate:string){
        const divWrap: HTMLDivElement = document.createElement('div');
        divWrap.innerHTML = modalTemplate;
        divWrap.id = this.id;
        divWrap.setAttribute('modal-id', this.id);
        divWrap.classList.add("modal-element");
        document.body.appendChild(divWrap);

        const closeBtn: Element = divWrap.querySelector('.close-modal');
        console.log("closeBtn: ", closeBtn);
        if(closeBtn) {
            closeBtn.addEventListener("click", (ev: Event) => {
                ev.stopPropagation();
                Modal.removeById();
            })
        }
    }

    public remove(){
        const modalEl: HTMLElement = document.getElementById(this.id);
        console.log("modalEl: ", modalEl)
        modalEl.parentNode.removeChild(modalEl);

    }
    public static removeById(id: string = null) {
        let modalId: string = id;

        const findEl = Modal.modals.find(x => x.id === modalId);
        if(findEl) {
            findEl.remove();
            Modal.modals = Modal.modals.filter((el) => el.id !== modalId);
        } else {
            if(Array.isArray(Modal.modals)) {
                const lastEl = Modal.modals.pop();
                if(lastEl) {
                    lastEl.remove();
                }
            }
        }
     }
}