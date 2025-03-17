import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef, MdbModalService,} from 'mdb-angular-ui-kit/modal';
import { ContatoFormComponent } from '../contato-form/contato-form.component';
import { ContatoService } from '../../../services/contato.service';
import { Contato } from '../../../models/contato';
import Swal from 'sweetalert2';
import { Observable, debounceTime, switchMap } from 'rxjs';


@Component({
  selector: 'app-contato-list',
  standalone: true,
  imports: [FormsModule, MdbModalModule, ContatoFormComponent],
  templateUrl: './contato-list.component.html',
  styleUrl: './contato-list.component.scss'
})
export class ContatoListComponent {
  @Input() modoAssociacao: boolean = false;
  @Output() retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild('modalContatosForm') modalContatosForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  contatoEdit!: Contato;

  busca: string = '';

  lista: Contato [] = [];

  contatoService = inject(ContatoService);

  constructor(){
    this.listAll();
  }

  /*
  findByTrechoNome() {
    this.contatoService.findByTrechoNome(this.busca).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        alert('Deu erro no find by nome');
      },
    });
  }
  */

  ngOnInit(): void {
    // Chamando a busca sempre que o valor de 'busca' mudar
    // Utilize debounceTime para evitar requisições excessivas
    new Observable<string>((observer) => {
      observer.next(this.busca);
    }).pipe(
      debounceTime(500),  // Atraso de 500ms entre os eventos de digitação
      switchMap(busca => this.contatoService.findByTrechoNome(busca))  // Realiza a busca
    ).subscribe((result) => {
      this.lista = result;
    });
  }

  // ARRUMAR PORQUE ELE NAO RECONHECE LETRA MAIUSCULA
  findByTrechoNome(): void {
    if (this.busca.trim()) {
      this.contatoService.findByTrechoNome(this.busca).subscribe({
        next: (lista) => {
          this.lista = lista;
        },
        error: (erro) => {
          alert('Deu erro no find by nome');
        },
      });
    } else {
      this.listAll(); // Se o campo de busca estiver vazio, mostrar todos
    }
  }

  listAll(){
    this.contatoService.listAll().subscribe({
      next: (list) => {
        this.lista = list;
      },
      error: (erro) => {
        alert('deu erro no list all');
      },
    });
  }

  deleteById(contato: Contato){
    Swal.fire({
      title: 'Tem certeza que deseja deletar o autor ' + contato.nome + '?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed){
        this.contatoService.delete(contato.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.listAll();
          },
          error: (erro) => {
            alert('Deu erro no delete by id');
          },
        });
      }
    });
  }

  novo(){
    this.contatoEdit = new Contato();
    this.modalRef = this.modalService.open(this.modalContatosForm);
  }

  editar(contato: Contato){
    this.contatoEdit = Object.assign({}, contato);
    this.modalRef = this.modalService.open(this.modalContatosForm);
  }

  retornoForm(mensagem: string){
    this.modalRef.close();
    Swal.fire({
      title: mensagem,
      icon: 'success',
    });
    this.listAll();
  }

  selecionar(contato: Contato){
    this.retorno.emit(contato);
  }






}
