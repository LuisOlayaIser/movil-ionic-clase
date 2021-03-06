import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UpdatePage } from '../estudiante/update/update.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public estudiantes:any[] =[];

  constructor(
    private api:ApiService, 
    private alert:AlertController,
    private router: Router,
    private modal:ModalController
    ) {}

  ngOnInit(){
    this.api.getResponse("estudiante","GET").subscribe((data:any) => {
      this.estudiantes = data.data;
    })
  }

  eliminar(id){
    this.alert.create({
      message: "¿Está seguro de eliminar?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.api.getResponse("estudiante/"+id, "DELETE").subscribe(() => {
              this.presentAlert("Eliminacion exitosa");
            },() => this.presentAlert("No se dio la eliminacion"));
          }
        },
        {
          text:"No",
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());
  }

  presentAlert(msj:string){
    this.alert.create({
      message: msj,
      buttons: ["Ok"]
    }).then(alert => alert.present());
  }

  create(){
    this.router.navigate(["create"]);
  }

  update(id){
    this.modal.create({
      component: UpdatePage,
      componentProps: {
        'id': id
      }
    }).then(modal => modal.present());
  }

}
