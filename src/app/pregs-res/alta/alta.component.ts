import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../../shared/rest.service';
import { AlertService } from '../../shared/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-preg-res',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaPregResComponent implements OnInit {
  formData;
  personalities: any;
  submitted = false;

  constructor( public restService: RestService, private alertService: AlertService, public router: Router ) {
  }

  ngOnInit() {
    this.formData = new FormGroup({
      id_pregunta: new FormControl(),
      definition: new FormControl(),
      id_personalidad: new FormControl(),
      value: new FormControl()
    });
    this.restService.getPersonalidades().subscribe(value => this.personalities = value);
  }

  addPregRes(data) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    const respuesta: object = { value: data.value, definition: data.definition };
    const pregRes: object = { id_pregunta: data.id_pregunta, id_personalidad: Number(data.id_personalidad) };
    this.restService.createPregRes(respuesta, pregRes);
  }
}
