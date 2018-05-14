//O EventEmitter (evento customizado) realiza uma emissão de um evento. Como o evento sai do componente para o mundo externo a variável possui a propriedade 'Output' que indica que o a ação 
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'botao',
    templateUrl: './botao.component.html'
})
export class BotaoComponent {

    //O componente aceita receber quatro parâmetros
    @Input() nome: string = 'ok';
    @Input() estilo: string = 'btn-default';
    @Input() tipo: string = 'button';
    @Input() desabilitado: boolean = false;
    @Input() confirmacao: boolean = false;

    
    //O Output é um decorator que permite criarmos eventos customizado, isto é, eventos que não existem na especificação JavaScript. Contudo, precisamos associar o decorator a uma instância de EventEmitter do pacte @angular/core.
    //O nome de um evento customizado é o nome do atributo decorado com Output e que guarda uma instância de EventEmitter.
    @Output() acao = new EventEmitter();

    executaAcao(): void {

        //Confirmaçao para utilizar o botão para REMOVER a foto ou para CADASTRAR a foto. Caso seja remover colocamos a mensagem de confirmação
        if(this.confirmacao) {

            if(confirm('Tem certeza da exclusão ?')) {
    
                //Disparo do evento graças ao EventEmitter,e para utiliza-lo é necessário chamar o '(acao)="algumaCoisa()"'
                //Realizamos um event binding.
                this.acao.emit(null);
            }

            return;
        }

        this.acao.emit(null);
    }

}