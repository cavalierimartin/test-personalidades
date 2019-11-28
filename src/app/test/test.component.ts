import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../shared/rest.service';
declare var $: any;

import {ChartOptions, ChartType, ChartDataSets, PointStyle} from 'chart.js';
import { Label } from 'ng2-charts';

/* Commands:
  json-server -H 0.0.0.0 -p 3000 -w db.json
  ng serve --host 0.0.0.0
*/

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  developing = true;
  answers: any = [];
  personalities: any = [];
  instructions: any = [];
  qstas: any = [];
  info: any = [];
  fullForm: any = [];
  totalPreguntas = 40;
  pregsByStack = 20;
  formLoaded = false;
  // Icons
  faQuestionCircle = faQuestionCircle;

  public today = this.getCurrentDate();
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          // get the concerned dataset
          const dataset = data.datasets[tooltipItem.datasetIndex];
          // calculate the total of this data set
          // const total = 40;
          // get the current items value
          // const currentValue = Number(dataset.data[tooltipItem.index]);
          // calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          // const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
          // const percentage = currentValue !== 0 ? Math.floor((currentValue * 100) / total) : 0;
          // const percentage = currentValue;
          return data.labels[tooltipItem.index];
        }
      }
    },
    animation: {
      duration: 2000
    },
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartFortalezasData: ChartDataSets[] = [{ data: [] }];
  public pieChartDebilidadesData: ChartDataSets[] = [{ data: [] }];
  public pieChartLabelsFortalezas: Label;
  public pieChartLabelsDebilidades: Label;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)']
    }
  ];

  personalityForm = new FormGroup({
    q1: new FormControl(),
    q2: new FormControl(),
    q3: new FormControl(),
    q4: new FormControl(),
    q5: new FormControl(),
    q6: new FormControl(),
    q7: new FormControl(),
    q8: new FormControl(),
    q9: new FormControl(),
    q10: new FormControl(),
    q11: new FormControl(),
    q13: new FormControl(),
    q12: new FormControl(),
    q14: new FormControl(),
    q15: new FormControl(),
    q16: new FormControl(),
    q17: new FormControl(),
    q18: new FormControl(),
    q19: new FormControl(),
    q20: new FormControl(),
    q21: new FormControl(),
    q22: new FormControl(),
    q23: new FormControl(),
    q24: new FormControl(),
    q25: new FormControl(),
    q26: new FormControl(),
    q27: new FormControl(),
    q28: new FormControl(),
    q29: new FormControl(),
    q30: new FormControl(),
    q31: new FormControl(),
    q32: new FormControl(),
    q33: new FormControl(),
    q34: new FormControl(),
    q35: new FormControl(),
    q36: new FormControl(),
    q37: new FormControl(),
    q38: new FormControl(),
    q39: new FormControl(),
    q40: new FormControl()
  });

  constructor( public restService: RestService ) { }

  ngOnInit() {
    this.info = this.restService.getAllToCreateForm().subscribe(responseList => {
      this.instructions = responseList[0];
      this.answers = responseList[1];
      this.personalities = responseList[2];
      this.qstas = responseList[3];
      this.qstas.sort(function (a, b) {
        if (a.id_pregunta > b.id_pregunta) {
          return 1;
        }
        if (a.id_pregunta < b.id_pregunta) {
          return -1;
        }
        return 0;
      });
      this.prepareFormData();
    });
    $('#testResultsModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus');
    });
    $('#share').jsSocials({
      shares: ['facebook', 'whatsapp']
    });
  }

  prepareCake(cantColerico, cantFlematico, cantMelancolico, cantSanguineo) {
    const percentColerico = cantColerico !== 0 ? Math.floor((cantColerico * 100) / this.pregsByStack) : 0;
    const percentFlematico = cantFlematico !== 0 ? Math.floor((cantFlematico * 100) / this.pregsByStack) : 0;
    const percentMelancolico = cantMelancolico !== 0 ? Math.floor((cantMelancolico * 100) / this.pregsByStack) : 0;
    const percentSanguineo = cantSanguineo !== 0 ? Math.floor((cantSanguineo * 100) / this.pregsByStack) : 0;
    // const percentColerico = cantColerico;
    // const percentFlematico = cantFlematico;
    // const percentMelancolico = cantMelancolico;
    // const percentSanguineo = cantSanguineo;
    const resultPercents = {
      'percentColerico': percentColerico,
      'percentFlematico': percentFlematico,
      'percentMelancolico': percentMelancolico,
      'percentSanguineo': percentSanguineo
    };
    return resultPercents;
  }

  getCurrentDate() {
    const date = new Date();
    const year = '' + date.getFullYear();
    let month = '' + date.getMonth();
    let day = '' + date.getDay();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [day, month, year].join('/');
  }

  prepareFormData() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
      // $('[data-toggle="tooltip"]').click(function () {
      //   this.tooltip();
      // });
    });
    const answers: any = this.answers;
    const fullForm: any = this.fullForm;
    let respuesta: any;
    let i = 0;
    this.qstas.forEach( function(data) {
      if (data.id_pregunta !== i) {
        const ff = {id_pregunta: data.id_pregunta, respuestas: []};
        ff.id_pregunta = data.id_pregunta;
        respuesta = Object.assign( {}, answers.find( x => x.id === data.id_respuesta));
        respuesta.id_personalidad = data.id_personalidad;
        ff.respuestas = [respuesta];
        fullForm.push(ff);
      }
      if (data.id_pregunta === i) {
        respuesta = Object.assign( {} , answers.find( x => x.id === data.id_respuesta ));
        respuesta.id_personalidad = data.id_personalidad;
        fullForm.find(x => x.id_pregunta === data.id_pregunta).respuestas
          .push(respuesta);
      }
      i = data.id_pregunta;
    });
    this.formLoaded = true;
  }

  onSubmit() {
    // Variables
    let fortsColerico = 0;
    let debsColerico = 0;
    let fortsFlematico = 0;
    let debsFlematico = 0;
    let fortsMelancolico = 0;
    let debsMelancolico = 0;
    let fortsSanguineo = 0;
    let debsSanguineo = 0;
    // Tomo todos los valores del form, y los guardo en un array
    const answersArray = Object.values(this.personalityForm.value);
    // !Variables
    answersArray.forEach( function (value, index) {
      switch (Number(value)) {
        case 1: { // Id de la personalidad "Colérico"
          if (index < 20) {
            fortsColerico++;
          } else {
            debsColerico++;
          }
          break;
        }
        case 2: {  // Id de la personalidad "Flemático"
          if (index < 20) {
            fortsFlematico++;
          } else {
            debsFlematico++;
          }
          break;
        }
        case 3: {  // Id de la personalidad "Melancólico"
          if (index < 20) {
            fortsMelancolico++;
          } else {
            debsMelancolico++;
          }
          break;
        }
        case 4: {  // Id de la personalidad "Sanguíneo"
          if (index < 20) {
            fortsSanguineo++;
          } else {
            debsSanguineo++;
          }
          break;
        }
        default: {
          break;
        }
      }
    });
    setTimeout(() => {
      const percentForts = this.prepareCake(fortsColerico, fortsFlematico, fortsMelancolico, fortsSanguineo);
      this.pieChartFortalezasData = [
        {data: [
            percentForts.percentColerico,
            percentForts.percentFlematico,
            percentForts.percentMelancolico,
            percentForts.percentSanguineo
          ]
        }
      ];
      const percentDebs = this.prepareCake(debsColerico, debsFlematico, debsMelancolico, debsSanguineo);
      this.pieChartDebilidadesData = [
        {data: [
            percentDebs.percentColerico,
            percentDebs.percentFlematico,
            percentDebs.percentMelancolico,
            percentDebs.percentSanguineo
          ]
        }
      ];
      this.pieChartLabelsFortalezas = [
        'Colérico: ' + percentForts.percentColerico + '%',
        'Flemático: ' + percentForts.percentFlematico + '%',
        'Melancólico: ' + percentForts.percentMelancolico + '%',
        'Sanguíneo: ' + percentForts.percentSanguineo + '%',
      ];
      this.pieChartLabelsDebilidades = [
        'Colérico: ' + percentDebs.percentColerico + '%',
        'Flemático: ' + percentDebs.percentFlematico + '%',
        'Melancólico: ' + percentDebs.percentMelancolico + '%',
        'Sanguíneo: ' + percentDebs.percentSanguineo + '%',
      ];
    }, 200);
  }
  shareResults() {
    // Genero una imagen del canvas de fortalezas
    // Busco info con los datos del test + nombre de la persona + fecha del test
    // Genero el link para compartir en whatsapp
  }
}
