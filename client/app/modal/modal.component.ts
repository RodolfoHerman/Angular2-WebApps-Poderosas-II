import { Component, EventEmitter, Output, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterViewInit {

    @Input() private titulo: string = 'Tem certeza ?';
    @Input() private frase: string;
    @Output() confirma = new EventEmitter();


    constructor(private elemento: ElementRef) { }

    //O jQueryUI precisa do DOM do template do nosso componente para realizar a transformação. Em 'ngAfterViewInit' o DOM já está disponível para a manipulação, ciclo de vida do componente.
    ngAfterViewInit() {

        //Configurando o modal utilizando o jQueryUI. Assim teremos a garantia de que será configurado toda vez que um novo componente modal for criado
        $(this.elemento.nativeElement).dialog({
            title: this.titulo,
            autoOpen: false,
            resizable: false,
            modal: true,
            buttons: {
                //Tanto o botão cancelar quanto o confirmar irá invocar o close do modal. A diferença é que o confirmar irá disparar um evento
                Cancelar: () => {
                    $(this.elemento.nativeElement).dialog('close');
                },
                Confirmar: () => {
                    $(this.elemento.nativeElement).dialog('close');
                    this.confirma.emit();
                }
            }
        });

    }


    show() {

        $(this.elemento.nativeElement).dialog('open');
    }

}