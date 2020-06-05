import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  public data = {
    nombre: "",
    creditos: null,
    horas: null,
    descripcion: "",
    docente_id: null
  }
  public materia: any;
  public docentes: any[] = [];

  constructor(
    private api: ApiService,
    private alert: AlertController,
    private navParam: NavParams,
    private modal: ModalController
  ) { }

  ngOnInit() {
    let id = this.navParam.get('id');
    this.api.getResponse("docente", "GET").subscribe((data: any) => {
      this.docentes = data.data; 
      this.api.getResponse("materia/" + id, "GET").subscribe((res: any) => {
        this.materia = res.data;
        this.data.nombre = res.data.nombre;
        this.data.creditos = res.data.creditos;
        this.data.horas = res.data.horas;
        this.data.descripcion = res.data.descripcion;
        this.data.docente_id = res.data.docente_id;
      });
    });

  }

  send() {
    console.log(this.data)
    this.api.getResponse("materia/" + this.materia.id, "PUT", this.data).subscribe(() => {
      this.presentAlert("Actualizacion exitosa");
      this.closeModal();
    }, () => this.presentAlert("No se actualizo"));
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
