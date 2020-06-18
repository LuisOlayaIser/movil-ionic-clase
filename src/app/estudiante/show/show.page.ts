import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  public estudiante:any = {
    id: null,
    nombre: null,
    apellido:null,
    telefono: null,
    email: null,
  }

  public materias:any[]=[];

  constructor(
    private api:ApiService,
    private navParam:NavParams,
    private modal:ModalController
  ) { }

  ngOnInit() {
    this.get();
  }

  get(){
    let id = this.navParam.get('id');
    this.api.getResponse("estudiante/"+id,"GET").subscribe((res:any) => {
      this.estudiante = res.data;
      this.api.getResponse("estudiante/"+id+"/materias","GET").subscribe((res1:any) => {
        this.materias = res1.data;
      });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

}
