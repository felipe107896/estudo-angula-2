import { ConfigService } from './config.service';
import { Pessoa } from './pessoa';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Rx'



@Injectable()
export class PessoaServiceService {

    private baseUrlService:string = '';
    private headers:Headers;
    private options:RequestOptions;
    

  constructor(private http: Http,
    private configService: ConfigService) { 
      /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
      this.baseUrlService = configService.getUrlService() + '/pessoa/';
 
      /*ADICIONANDO O JSON NO HEADER */
      this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
      this.options = new RequestOptions({ headers: this.headers });
    }

     /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
     getPessoas(){        
      return this.http.get(this.baseUrlService).map(res => res.json());
  }

  /**ADICIONA UMA NOVA PESSOA */
  addPessoa(pessoa: Pessoa){

      return this.http.post(this.baseUrlService, JSON.stringify(pessoa),this.options)
      .map(res => res.json());
  }
  /**EXCLUI UMA PESSOA */
  excluirPessoa(codigo:number){

      return this.http.delete(this.baseUrlService + codigo).map(res => res.json());
  }

  /**CONSULTA UMA PESSOA PELO CÓDIGO */
  getPessoa(codigo:number){

      return this.http.get(this.baseUrlService + codigo).map(res => res.json());
  }

  /**ATUALIZA INFORMAÇÕES DA PESSOA */
  atualizarPessoa(pessoa:Pessoa){

      return this.http.put(this.baseUrlService, JSON.stringify(pessoa),this.options)
      .map(res => res.json());
  }
}
