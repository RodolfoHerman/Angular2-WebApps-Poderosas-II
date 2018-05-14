import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'foto',
    templateUrl: './foto.component.html',
    //Encapsulamento do CSS somente para esse componente
    styleUrls: ['./foto.component.css'],
    encapsulation: ViewEncapsulation.Emulated
    //Existe uma maneira de termos o controle do tipo de encapsulamento a ser empregado no CSS
    //através do ViewEncapsulation que pode ser NONE, EMULATED, NATIVE. O modo nativo depende do BROWSER implementar o SHADOW DOM (Encapsular o css e javascript ao componente) e acessa consegue acessar estilos globais como o BOOTSTRAP. 
})
export class FotoComponent {

    @Input() titulo: string = '';
    @Input() url: string = '';
    descricao: string = '';
    _id: string = '';
}