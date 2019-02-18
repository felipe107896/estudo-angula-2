import { CadastroComponent } from './services/componentes/cadastro/cadastro.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ConfigService } from './services/config.service';
import { PessoaServiceService } from './services/PessoaService.service';
import { ConsultaComponent } from './services/Consulta/consulta/consulta.component';
import { MenuComponent } from './menu/menu.component';
import { GlobalErrorHandlerService } from './Exception/global-error-handler.service';
import { routing } from './menu/app-routing.module';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    CadastroComponent,
    ConsultaComponent,
    MenuComponent,
    PrincipalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    RouterModule
    
  ],
  providers: [ConfigService, PessoaServiceService, MessageService ,GlobalErrorHandlerService, { provide: ErrorHandler, useClass: GlobalErrorHandlerService } ],/**estamos informando quem são os nosso provedores de serviços */
  bootstrap: [PrincipalComponent]
})

export class AppModule { }
