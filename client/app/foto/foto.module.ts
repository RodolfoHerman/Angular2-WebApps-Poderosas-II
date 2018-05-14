import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoComponent } from './foto.component';
import { FiltroPorTitulo } from './foto.pipes';
import { FotoService } from './foto.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ FotoComponent, FiltroPorTitulo ],
  exports: [ FotoComponent, FiltroPorTitulo ],
  //FotoService não é um 'component' e nem um 'pipe', não podemos exportar e nem declarar. O 'service' é uma classe javaScript com a anotação @Injectable que indica que é ejetável e que o ANGULAR será responsável por colocar as devidas dependências na classe
  providers: [ FotoService ]
})
export class FotoModule { }