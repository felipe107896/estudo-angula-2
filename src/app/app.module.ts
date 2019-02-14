import { CadastroComponent } from './services/componentes/cadastro/cadastro.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './services/config.service';
import { PessoaServiceService } from './services/pessoaService.service';
import { ConsultaComponent } from './services/Consulta/consulta/consulta.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    CadastroComponent,
    ConsultaComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClient,
    AppRoutingModule
  ],
  providers: [ConfigService, PessoaServiceService],/**estamos informando quem são os nosso provedores de serviços */
  bootstrap: [CadastroComponent]
})
export class AppModule { }
