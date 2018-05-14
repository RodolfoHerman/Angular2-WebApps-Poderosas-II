import { Component, Input } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
//Necessário para identificar os parâmetros da rota 'ActivatedRoute'. Router necessário para redirecionar para a página que queremos. O Router realiza o procedimento de navegar para páginas do lado do 'component' ao contrário do 'routerLink' que é do lado do 'template'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html' 
})
export class CadastroComponent { 

    foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;
    mensagem: string = "";

    constructor(fb: FormBuilder, 
                private service: FotoService, 
                private route: ActivatedRoute,
                private router: Router) {
        
        this.route.params.subscribe(
            params => {
                //O acesso do array é definido pelo nome do parâmetro dado no arquivo 'app.routes.ts'
                let id = params['id'];

                if(id) {

                    this.service
                    .buscaPorId(id)
                    .subscribe(
                        foto => {
                            this.foto = foto;
                        },
                        error => this.mensagem = error
                    );
                }
            }
        );
        
        this.meuForm = fb.group({
            titulo: ['', Validators.compose(
                [Validators.required, Validators.minLength(4)]
            )],
            url: ['', Validators.required],
            descricao: [''],
        });
    }

    cadastrar(event) {
        
        event.preventDefault();
        let atualizar = false;
        
        // ---> A complexidade de enviar dados ao servidor foi para o foto.service.ts
        // cria uma instância de Headers
        //let headers = new Headers();
        // Adiciona o tipo de conteúdo application/json 
        //headers.append('Content-Type', 'application/json');

        // this.http.post('v1/fotos', JSON.stringify(this.foto), { headers: headers })
        //     .subscribe(() => {
        //         this.foto = new FotoComponent();
        //         console.log('Foto salva com sucesso');
        //     }, erro => {
        //         console.log(erro);
        //     });

        if(this.foto._id) {

            atualizar = true;
        }

        this.service.cadastra(this.foto)
            .subscribe(res => {

                //this.mensagem = atualizar ? "Alteração realizada com sucesso !!" : "Foto salva com sucesso !!";
                
                this.mensagem = res.mensagem;

                if(!res.inclusao) {
                    //Alterar ou cadastrar um foto será redirecionado para a página principal (listagem)
                    this.router.navigate(['']);
                }
                
                this.foto = new FotoComponent();
            }, 
            error => this.mensagem = error
        );




    }
}