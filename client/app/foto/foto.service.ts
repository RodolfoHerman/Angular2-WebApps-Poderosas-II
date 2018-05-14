import { Http, Headers, Response } from "@angular/http";
import { FotoComponent } from "./foto.component";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

//É bom criar um serviço para os dados que são retornados do servidor. Assim mantemos um código mais legível e de fácil manutenção
@Injectable()
export class FotoService {

    private url: string = "v1/fotos";
    private headers: Headers;

    constructor(private http: Http) {

        this.headers = new Headers();
    }

    //Observable é bastante genério e é necessário especificar seu tipo
    cadastra(foto: FotoComponent): Observable<MensagemCadastro> {

        this.headers.append('Content-Type', 'application/json');

        //Caso seja realizado a ação de UPDATE, verifica se já possui ID
        if(foto._id) { 

            return this.http.put(`${this.url}/${foto._id}`, JSON.stringify(foto), { headers: this.headers })
            //No 'map' como existe uma única instrução retornamos a expressão sem o bloco '{}' um objeto explicito em javaScript é dado por '{}'. Sendo assim quando queremos retorna um objeto em um única instrução usamos o ({}) para o Angular entender que os {} significa objeto e não o bloco da arrowFunction
            //.map(() => ({ mensagem: "Alterado com sucesso !!", alterado: true }));
                .map(() => new MensagemCadastro("Alterado com sucesso !!!", false));

        } else {

            return this.http.post(this.url, JSON.stringify(foto), { headers: this.headers })
                .map(() => new MensagemCadastro("Inserido com sucesso !!!", true));
        }

    }

    lista(): Observable<FotoComponent[]> {

        return this.http.get(this.url).map(res => res.json());
    }

    remover(foto: FotoComponent): Observable<Response> {

        return this.http.delete(`${this.url}/${foto._id}`);
    }

    buscaPorId(id: string): Observable<FotoComponent> {

        return this.http.get(`${this.url}/${id}`).map(resp => resp.json());
    }


}

//Necessário criar a classe para encapsular a mensagem de retorno quando for uma inclusão ou uma alteração do objeto
export class MensagemCadastro {

    constructor(private _mensagem: string, private _inclusao: boolean) { }

    //Utilizando os métodos getters (somente leitura) de property do ES6
    get mensagem(): string {

        return this._mensagem;
    }

    get inclusao(): boolean {

        return this._inclusao;
    }

    // public obterMensagem(): string {

    //     return this.mensagem;
    // }

    //Por padrão os métodos possuem o acesso como 'public'
    // isInclusao(): boolean {

    //     return this.inclusao;
    // }

}