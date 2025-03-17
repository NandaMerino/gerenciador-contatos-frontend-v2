import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';



@Component({
  selector: 'app-contato-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './contato-form.component.html',
  styleUrl: './contato-form.component.scss'
})
export class ContatoFormComponent {
  tituloComponente: string = "Novo contato";

  @Input() contato: Contato = new Contato();
  @Output() retorno = new EventEmitter();

  router = inject(Router);
  rotaAtivada = inject (ActivatedRoute);

  contatoService = inject(ContatoService);

  constructor(){
    let id = this.rotaAtivada.snapshot.params['id'];

    if(id > 0){
      this.tituloComponente = "Editar contato";
      this.findById(id);
    }
  }
  

  //FIND BY ID 
  findById(id: number){
    this.contatoService.findById(id).subscribe({
      next: liv => {
        this.contato = liv;
      },
      error: erro => {
        alert('Deu erro no findById');
      }
    })
  }

  //SAVE
  save(){
    this.contatoService.save(this.contato).subscribe({
      next: mensagem => {
        this.retorno.emit(mensagem);
      },
      error: erro => {
        alert('Deu erro no save');
      }
    });
  }

  //UPDATE
  update(){
    this.contatoService.update(this.contato).subscribe({
      next: mensagem =>{
        this.retorno.emit(mensagem);
      },
      error: erro => {
        alert('Deu erro no update');
      }
    });
  }

  //FORMATAR TELEFONE
  formatarTelefone() {
    let telefone = this.contato.telefone.replace(/\D/g, ''); // Remove tudo que não for número
  
    if (telefone.length > 11) {
      telefone = telefone.slice(0, 11); // Garante que o telefone não ultrapasse 11 dígitos
    }
    if (telefone.length > 10) {
      this.contato.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    } else if (telefone.length > 6) {
      this.contato.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
    } else if (telefone.length > 2) {
      this.contato.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    } else {
      this.contato.telefone = telefone;
    }
  }
  
}
