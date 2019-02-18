import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from '../../pessoa';
import { Response } from '../../response';
import { PessoaServiceService } from '../../PessoaService.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  private titulo: string;
  private pessoa:Pessoa = new Pessoa();
  res: Response;
  formularioVazio: boolean;

  constructor(private pessoaService: PessoaServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(parametro => {

      if (parametro["codigo"] == undefined) {

        this.titulo = "Novo Cadastro de Pessoa";
      }
      else {
        this.titulo = "Editar Cadastro de Pessoa";
        this.pessoaService.getPessoa(Number(parametro["codigo"])).subscribe(res => {
        }, err => { throw err; })
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    this.verificarFormularioVazio();
    if (!this.formularioVazio) {
      return confirm('As informações preenchidas serão perdidas, deseja sair da página?');
    } else {
      return true;
    }
  }

  verificarFormularioVazio() {
    for (const index in this.pessoa) {
      if (this.pessoa[index] !== undefined && this.pessoa[index] !== '') {
        this.formularioVazio = false;
      } else {
        this.formularioVazio = true;
      }
    }
  }

  /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
  salvar(): void {
    /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
    if (this.pessoa.codigo == undefined) {
      console.log("entrou no metodo");
      console.log(this.pessoa)
      /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
      this.pessoaService.addPessoa(this.pessoa).subscribe(reponse => {
        
        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        //let res: Response = reponse.body;
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Cadastro realizado com sucesso' });
      }, err => { throw err; });
    }
    else {
      this.pessoaService.atualizarPessoa(this.pessoa).subscribe(reponse => {
        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res: Response = reponse.body;
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Cadastro alterado com sucesso' });
        this.limpar();
      }, err => { throw err; });
    }
  }

  limpar() {
    this.pessoa.codigo = undefined;
    this.pessoa.nome = undefined;
    this.pessoa.selecionado = undefined;
  }
}
