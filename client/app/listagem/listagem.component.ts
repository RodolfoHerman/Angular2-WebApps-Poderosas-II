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
    //Variáveis do Angular possui o CHANGE DETECTION e neste caso a view será atualizada quando a 'mensagem' receber algum valor
    mensagem: string = '';

    constructor(private service: FotoService) {

        this.service
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

    remove(foto: FotoComponent) {

        this.service
            .remover(foto)
            .subscribe(
                () => {
                    
                    let indice = this.fotos.indexOf(foto);
                    let aux = this.fotos.slice(0);
                    
                    aux.splice(indice, 1);
                    //Angular só monitora a referência de this.fotos do nosso componente. Se alguém incluir ou remover um novo item da lista ele não saberá. Para isso, é necessário criar uma nova lista e atribuir essa lista em this.fotos. Como estamos reatribuindo um valor para a variável o Angular desencadeará seu mecanismo de deteção de mudança e renderizará a view. (Change Detection)
                    this.fotos = aux;

                    this.mensagem = "Foto removida com sucesso !!";
                },
                error => {
                    this.mensagem = error;
                }
            );

    }



}