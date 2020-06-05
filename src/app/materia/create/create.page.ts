import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public data = {
    nombre: "",
    creditos: null,
    horas: null,
    descripcion: "",
    docente_id: null
  }

  public docentes: any[] = [];

  constructor(
    private api: ApiService,
    private alert: AlertController,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.getDocentes();
  }

  getDocentes() {
    this.api.getResponse("docente", "GET").subscribe((data: any) => {
      this.docentes = data.data;
    });
  }

  send() {
    this.api.getResponse("materia", "POST", this.data).subscribe(() => {
      this.presentAlert("Insercion exitosa");
      this.closeModal();
    }, () => this.presentAlert("No se inserto"));
  }

  presentAlert(msj) {
    this.alert.create({
      message: msj,
      buttons: ["Ok"]
    }).then(alert => alert.present());
  }

  closeModal() {
    this.modal.dismiss();
  }
}
