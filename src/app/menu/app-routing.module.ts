import { ConsultaComponent } from './../services/Consulta/consulta/consulta.component';
import { CadastroComponent } from './../services/componentes/cadastro/cadastro.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../Login/login/login.component';
 
const appRoutes: Routes = [
    { path: 'home',                    component: CadastroComponent },
    { path: 'consulta-pessoa',         component: ConsultaComponent },
    { path: 'cadastro-pessoa',         component: CadastroComponent },
    { path: 'cadastro-pessoa/:codigo', component: CadastroComponent },
    { path: 'login', component: LoginComponent}
 
]; 

export class AppRoutingModule { } 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);