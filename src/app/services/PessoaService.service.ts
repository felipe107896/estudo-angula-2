import { ConfigService } from './config.service';
import { Pessoa } from './pessoa';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { MessageService } from 'primeng/api';
import { Response } from './response';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';



@Injectable()
export class PessoaServiceService {

  private baseUrlService: string = '';
  private headers: Headers;
  private options: RequestOptions;


  constructor(private http: HttpClient,
    private configService: ConfigService, private messageService: MessageService) {
    /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
    this.baseUrlService = configService.getUrlService() + '/pessoa/';

    /*ADICIONANDO O JSON NO HEADER */
    this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
  getPessoas() {
    return this.http.get(this.baseUrlService, { observe: 'response' });
  }

  /**ADICIONA UMA NOVA PESSOA */
  addPessoa(pessoa: Pessoa): Observable<HttpResponse<Response>> {
    return this.http.post<Response>(this.baseUrlService, JSON.stringify(pessoa), { observe: 'response' });
  }
  /**EXCLUI UMA PESSOA */
  excluirPessoa(codigo: number): Observable<HttpResponse<Response>> {
    return this.http.delete<Response>(this.baseUrlService + codigo, { observe: 'response' });
  }

  /**CONSULTA UMA PESSOA PELO CÓDIGO */
  getPessoa(codigo: number): Observable<HttpResponse<Response>> {
    return this.http.get<Response>(this.baseUrlService + codigo, { observe: 'response' });
  }

  /**ATUALIZA INFORMAÇÕES DA PESSOA */
  atualizarPessoa(pessoa: Pessoa): Observable<HttpResponse<Response>> {
    return this.http.put<Response>(this.baseUrlService, JSON.stringify(pessoa), { observe: 'response' });
  }
}
