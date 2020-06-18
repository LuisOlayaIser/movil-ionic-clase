import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CreatePage } from '../create/create.page';
import { UpdatePage } from '../update/update.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public docentes:any[] =[];

  constructor(
    public api:ApiService, 
    private alert:AlertController,
    private modal:ModalController
    ) {}

  ngOnInit(){
    this.get();
  }

  get(){
    this.api.getResponse("docente","GET").subscribe((data:any) => {
      this.docentes = data.data.reverse();
    })
  }

  eliminar(id){
    this.alert.create({
      message: "¿Está seguro de eliminar?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.api.getResponse("docente/"+id, "DELETE").subscribe(() => {
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
    this.modal.create({
      component: CreatePage,
    }).then(modal => modal.present());
  }

  update(id){
    this.modal.create({
      component: UpdatePage,
      componentProps: {
        'id': id
      }
    }).then(modal => modal.present());
  }

  doRefresh(event) {

    setTimeout(() => {
      this.get();
      event.target.complete();
    }, 2000);
  }

}
