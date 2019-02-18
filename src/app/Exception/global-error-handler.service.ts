import { ErrorHandler, Injector,Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements  ErrorHandler {

  constructor(private injector: Injector, private messageService: MessageService) { }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      // Backend returns unsuccessful response codes such as 404, 500 etc.
      console.error('Backend returned status code: ', error.status);
      console.error('Response body:', error.message);
      if (error.status === 401) {
        this.messageService.add({ severity: 'error', summary: 'Acess Denied', detail: 'Acesso negado' });
      }
      if (error.status === 403) {
        this.messageService.add({ severity: 'error', summary: 'Forbidden', detail: 'Não é possivel acessar esse diretorio' });
      }
      if (error.status === 404) {
        this.messageService.add({ severity: 'error', summary: 'Not found', detail: 'Endereço não encontrado' });
      }
      if (error.status === 500) {
        this.messageService.add({ severity: 'error', summary: 'Internal Server Error', detail: 'Houve um erro interno' });
      }
      if (error.status === 0) {
        this.messageService.add({ severity: 'error', summary: 'Internal Server Error', detail: 'Houve um erro interno. Sem resposta do servidor' });
      }
    } else {
      // A client-side or network error occurred.
      if (error.status === 204) {
        this.messageService.add({ severity: 'warn', summary: 'Not content', detail: 'Retorno vazio' });
      }
      console.error('An error occurred:', error.message);
    }   
  }

}
