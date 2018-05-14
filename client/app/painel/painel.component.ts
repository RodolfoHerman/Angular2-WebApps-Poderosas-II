import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
    
    @Input() titulo: string;

    //Um elemento do tipo ElementRef encapsula o elemento do DOM do nosso componente na propriedade nativeElement. Quando o painel for criado o Angular irá passar para o construtor do componente o elemento DOM que ele está associado
    constructor(private elemento: ElementRef) {}

    ngOnInit() {
        this.titulo = this.titulo.length > 7 ?
             this.titulo.substr(0, 7) + '...' : 
             this.titulo;
    }

    fadeOut(cb) {
        //O elemento é um objeto TypeScript e o 'nativeElement' é o DOM
        $(this.elemento.nativeElement).fadeOut(cb);
    }
    
}