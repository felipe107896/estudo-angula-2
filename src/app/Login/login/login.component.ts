import { Component, OnInit } from '@angular/core';
import { PessoaServiceService } from 'src/app/services/PessoaService.service';

import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { userInfo } from 'os';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  msg: any;

  constructor(private service: PessoaServiceService) { }

  ngOnInit() {
  }

  login(){
    this.msg = this.service.login(this.usuario);
  }

  limpar(){
    this.usuario.login = "";
    this.usuario.senha= "";
  }

}
