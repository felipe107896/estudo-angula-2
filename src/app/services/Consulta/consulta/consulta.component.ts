import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaServiceService } from '../../PessoaService.service';
import { Pessoa } from '../../pessoa';
import { Response } from '../../response';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
    private pessoas: any;
    private titulo:string;

  constructor(private pessoaService: PessoaServiceService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    /*SETA O TÍTULO */
    this.titulo = "Registros Cadastrados";
 
    /*CHAMA O SERVIÇO E RETORNA TODAS AS PESSOAS CADASTRADAS */
    this.pessoaService.getPessoas().subscribe(res => this.pessoas = res);
  }

  /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
     * LINHA DA TABELA*/
    excluir(codigo:number, index:number) {
 
      if(confirm("Deseja realmente excluir esse registro?")){
 
        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.pessoaService.excluirPessoa(codigo).subscribe(res => {
 
          let response: Response = res.body;
          if(response != null){
            this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Cadastro excluido com sucesso' });
          }
          }, err => { throw err; });      
      }
 
    }
 
    editar(codigo:number):void{
      this.router.navigate(['/cadastro-pessoa',codigo]);
    }
}
