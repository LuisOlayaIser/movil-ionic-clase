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
    apellido: "",
    telefono: "",
    email:""
  }
  public estudiante:any;

  constructor(
    private api:ApiService,
    private alert:AlertController,
    private navParam:NavParams,
    private modal:ModalController
    ) { }

  ngOnInit() {

    let id = this.navParam.get('id');
    this.api.getResponse("estudiante/"+id,"GET").subscribe((res:any) => {
      this.estudiante = res.data;
      this.data.nombre=res.data.nombre;
      this.data.apellido=res.data.apellido;
      this.data.telefono=res.data.telefono;
      this.data.email=res.data.email;
    });
  }

  send(){
    console.log(this.data)
    this.api.getResponse("estudiante/"+this.estudiante.id,"PUT",this.data).subscribe(() => {
      this.presentAlert("Actualizacion exitosa");
      this.closeModal();
    }, () => this.presentAlert("No se actualizo"));
  }

  presentAlert(msj){
    this.alert.create({
      message: msj,
      buttons: ["Ok"]
    }).then(alert => alert.present());
  }

  closeModal(){
    this.modal.dismiss();
  }

}
