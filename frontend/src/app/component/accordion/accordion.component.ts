import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  @Input({ required: true }) softwareName!: string;

  public acordeao = document.getElementById('acordeao') as HTMLAnchorElement;

  clicado: boolean = true;

  teste(): void {
    this.clicado = !this.clicado;
  }

  public softwares: Array<Software> = [];

  constructor() {
    this.softwares.push(
      new Software('VsCode', 'ultima', 'cabrito', 'linux meu amor', 'Pablo')
    );
    this.softwares.push(
      new Software('docker', 'ultima', 'cabrito', 'linux meu amor', 'Adnir')
    );
  }
}

export class Software {
  constructor(
    public nome: string,
    version: string,
    idioma: string,
    os: string,
    solicitante: string
  ) {}
}
