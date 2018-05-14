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
    cadastra(foto: FotoComponent): Observable<Response> {

        this.headers.append('Content-Type', 'application/json');

        //Caso seja realizado a ação de UPDATE, verifica se já possui ID
        if(foto._id) { 

            return this.http.put(`${this.url}/${foto._id}`, JSON.stringify(foto), { headers: this.headers });

        } else {

            return this.http.post(this.url, JSON.stringify(foto), { headers: this.headers });
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