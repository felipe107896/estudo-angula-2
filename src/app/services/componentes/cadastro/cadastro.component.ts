import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from '../../pessoa';
import { Response } from '../../response';
import { PessoaServiceService } from '../../PessoaService.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  private titulo: string;
  private pessoa: Pessoa = new Pessoa();
  res: Response;
  formularioVazio: boolean;
  sexos: any = [];
  locale = 'pt-br';

  campoCpfCnpjValidoParceiro = true;

  ngCpfProprietario: any;
  ngTelefone: any;
  ngCpfCnpjParceiro: any;
  ngCpfCnpjParceiroNoMask: any;
  ngNumeroFilialCnpj: any;
  tipoPessoa: String;


  constructor(private pessoaService: PessoaServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private localeService: BsLocaleService) {
    localeService.use(this.locale);
  }

  ngOnInit() {

    defineLocale('pt-br', ptBrLocale);

    this.sexos = [
      { value: 'Masculino' },
      { value: 'Feminino' }
    ];

    this.activatedRoute.params.subscribe(parametro => {

      if (parametro["codigo"] == undefined) {

        this.titulo = "Novo Cadastro de Pessoa";
      }
      else {
        this.titulo = "Editar Cadastro de Pessoa";
        this.pessoaService.getPessoa(Number(parametro["codigo"])).subscribe(res => {
          this.pessoa = res;
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
    this.pessoa.cpf = undefined;
    this.pessoa.data = undefined;
    this.pessoa.telefone = undefined;
  }

  executaMascara(objeto) {

    const valorObjeto = objeto;
    const campo = document.getElementsByName(valorObjeto.name)[0];

    if (valorObjeto.name === 'cpfCnpjParceiro') {
      this.mascaraCpfCnpj(valorObjeto.value, campo);
    } else if (valorObjeto.name === 'telefoneParceiro' || valorObjeto.name === 'telefoneProp') {
      this.mascaraTelefone(valorObjeto.value, campo);
    } else if (valorObjeto.name === 'telefoneProprietario') {
      this.mascaraTelefone(valorObjeto.value, campo);
    } else if (valorObjeto.name === 'numeroCep') {
      this.mascaraCep(valorObjeto.value, campo);
    }
  }

  validarCpfCnpj(campo) {
    const valorCampo = campo.value.replace(/\D/g, '');
    if (valorCampo.length === 11) {
      if (campo.name === 'cpfCnpjParceiro') {
        this.campoCpfCnpjValidoParceiro = this.testarCPF(valorCampo.replace(/\D/g, ''));
      }
      if (!this.campoCpfCnpjValidoParceiro) { this.ngCpfProprietario = undefined; }
    }
    else if (valorCampo.length === 14) {
      if (campo.name === 'cpfCnpjParceiro') {
        this.campoCpfCnpjValidoParceiro = this.testarCNPJ(valorCampo.replace(/\D/g, ''));

        if (!this.campoCpfCnpjValidoParceiro) {
          this.ngCpfCnpjParceiro = undefined;
        }

        return this.campoCpfCnpjValidoParceiro;
      }
    }

    return this.campoCpfCnpjValidoParceiro;
  }

  verificarTelefoneValido() {

    if (this.ngTelefone !== undefined && this.ngTelefone !== null) {
      let telefone = this.ngTelefone.replace(/\D/g, '');

      if ((telefone.length >= 10 && telefone.length <= 12)) {
        return true;
      } else
        return false;
    } else
      return false;
  }

  mascaraCpfCnpj(valorInput, campo) {

    //Remove tudo o que não é dígito
    valorInput = valorInput.replace(/\D/g, "");

    if (valorInput.length <= 11) { //CPF
      this.tipoPessoa = 'F';

      //Coloca um ponto entre o terceiro e o quarto dígitos
      valorInput = valorInput.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novalorInputo (para o segundo bloco de números)
      valorInput = valorInput.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um hífen entre o terceiro e o quarto dígitos
      valorInput = valorInput.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      campo.value = valorInput;

    } else { //CNPJ
      this.tipoPessoa = 'J';

      //Coloca ponto entre o segundo e o terceiro dígitos
      valorInput = valorInput.replace(/^(\d{2})(\d)/, "$1.$2");

      //Coloca ponto entre o quinto e o sexto dígitos
      valorInput = valorInput.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

      //Coloca uma barra entre o oitavalorInputo e o nono dígitos
      valorInput = valorInput.replace(/\.(\d{3})(\d)/, ".$1/$2");

      //Coloca um hífen depois do bloco de quatro dígitos
      valorInput = valorInput.replace(/(\d{4})(\d)/, "$1-$2");

      campo.value = valorInput;
    }

  }

  retirarMascara() {
    let numeroRaiz = this.ngCpfCnpjParceiro;
    this.ngCpfCnpjParceiroNoMask = numeroRaiz.replace(/\D/g, '');
  }

  setarSemMascara() {

    if (this.ngCpfCnpjParceiroNoMask.length === 14) { // para pegar os 8 primeiros números do cnpj

      this.ngCpfCnpjParceiroNoMask = this.ngCpfCnpjParceiroNoMask.toString().substring(0, this.ngCpfCnpjParceiroNoMask.length - 2);

      this.ngNumeroFilialCnpj = this.ngCpfCnpjParceiroNoMask.substring(this.ngCpfCnpjParceiroNoMask.length - 4, this.ngCpfCnpjParceiroNoMask.length);
      this.ngCpfCnpjParceiroNoMask = this.ngCpfCnpjParceiroNoMask.toString().substring(0, this.ngCpfCnpjParceiroNoMask.length - 4);
    }
    else if (this.ngCpfCnpjParceiroNoMask.length === 11) { // para pegar os 9 primeiros números do cpf
      this.ngNumeroFilialCnpj = null;
      this.ngCpfCnpjParceiroNoMask = this.ngCpfCnpjParceiroNoMask.toString().substring(0, this.ngCpfCnpjParceiroNoMask.length - 2);
    }

  }

  testarCPF(strCPF) {
    let Soma;
    let Resto;
    let quantidade;
    Soma = 0;

    if (strCPF === '00000000000' ||
      strCPF === '11111111111' ||
      strCPF === '22222222222' ||
      strCPF === '33333333333' ||
      strCPF === '44444444444' ||
      strCPF === '55555555555' ||
      strCPF === '66666666666' ||
      strCPF === '77777777777' ||
      strCPF === '88888888888' ||
      strCPF === '99999999999') {
      return false;
    }

    if (strCPF.length < 14) {
      return false;

    }

    for (let index = 1; index <= 9; index++) { Soma = Soma + parseInt(strCPF.substring(index - 1, index)) * (11 - index); }
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let index = 1; index <= 10; index++) Soma = Soma + parseInt(strCPF.substring(index - 1, index)) * (12 - index);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  testarCNPJ(cnpj) {
    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "7777.7777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999")
      return false;

    if (cnpj.length < 14)
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let index = tamanho; index >= 1; index--) {
      soma += numeros.charAt(tamanho - index) * pos--;
      if (pos < 2)
        pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0))
      return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let index = tamanho; index >= 1; index--) {
      soma += numeros.charAt(tamanho - index) * pos--;
      if (pos < 2)
        pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1))
      return false;

    return true;
  }

  mascaraCep(valorInput, campo) {
    // Remove tudo o que não é dígito
    valorInput = valorInput.replace(/\D/g, '');
    // os 5 primeiros digitos do CEP e a barra
    valorInput = valorInput.replace(/(\d{5})(\d)/, '$1-$2');
    campo.value = valorInput;
  }

  mascaraTelefone(valorInput, campo) {
    //Remove tudo o que não é dígito
    valorInput = valorInput.replace(/\D/g, "");
    if (valorInput.length <= 10) {
      // os dois digitos do DDD e a barra
      valorInput = valorInput.replace(/(\d{2})(\d)/, "$1-$2");
      // os 4 primeiros digitos do telefone e a barra
      valorInput.replace(/(\d{4})(\d)/, "$1-$2");

      campo.value = valorInput;
    } else {
      // os dois digitos do DDD e a barra
      valorInput = valorInput.replace(/(\d{2})(\d)/, "$1-$2");
      // os 5 primeiros digitos do numero do celular e a barra
      valorInput = valorInput.replace(/(\d{5})(\d)/, "$1-$2");

      campo.value = valorInput;
    }
  }

  mascaraCpf(valorInput, campo) {

    //Remove tudo o que não é dígito
    valorInput = valorInput.replace(/\D/g, "");

    if (valorInput.length <= 11) { //CPF

      //Coloca um ponto entre o terceiro e o quarto dígitos
      valorInput = valorInput.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novalorInputo (para o segundo bloco de números)
      valorInput = valorInput.replace(/(\d{3})(\d)/, "$1.$2");

      //Coloca um hífen entre o terceiro e o quarto dígitos
      valorInput = valorInput.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      campo.value = valorInput;
    }
  }
}

