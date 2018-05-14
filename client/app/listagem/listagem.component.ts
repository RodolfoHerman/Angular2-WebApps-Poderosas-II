import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../foto/foto.service';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html' 
})
export class ListagemComponent { 

    fotos: FotoComponent[] = [];

    constructor(service: FotoService) {

        service
            .lista()
            .subscribe(
                fotos => this.fotos = fotos, 
                error => console.log(error));
        
        //Comprexidade de acessar os dados do servidor foi para o foto.service
        // http.get('v1/fotos')
        //     .map(res => res.json())
        //     .subscribe(
        //         fotos => this.fotos = fotos,
        //         erro => console.log(erro)
        //     );
    }

}