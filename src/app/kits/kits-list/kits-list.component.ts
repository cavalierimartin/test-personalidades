import {Component, OnInit} from '@angular/core';
import { KitsService } from '../../shared/kits.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {switchMap} from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-kits-list',
  templateUrl: './kits-list.component.html',
  styleUrls: ['./kits-list.component.scss']
})
export class KitsListComponent implements OnInit {

  idCategoria = this.actRoute.snapshot.params['id'];
  data: any = [];
  allCategorias: any = [];
  allKits: any = [];
  filteredKits: any = [];
  allCategoriasKits: any = [];
  siteLoaded = false;
  categoriaActual: any;

  constructor(
    private actRoute: ActivatedRoute,
    private route: ActivatedRoute,
    public kitsService: KitsService
  ) {
    this.route.params.subscribe( value => {
      this.idCategoria = value['id'];
      this.siteLoaded = false;
      this.filteredKits = [];
      this.prepareInfo();
      if (this.idCategoria) {
        this.getCategoriaActual(this.idCategoria);
      }
    });
  }

  ngOnInit() {
    this.data = this.kitsService.getAllInfo().subscribe(responseList => {
      this.allCategoriasKits = responseList[0];
      this.allCategorias = responseList[2];
      this.allKits = responseList[1];
      this.prepareInfo();
      if (this.idCategoria) {
        this.getCategoriaActual(this.idCategoria);
      }
    });
  }

  prepareInfo() {
    // Si se pasó un id, hay que filtrar los kits
    const categorias = this.allCategorias;
    const categoriasKits = this.allCategoriasKits;
    const filteredKits = this.filteredKits;
    if (this.idCategoria) {
      const tempKits = this.allKits;
      const idCategoria = Number(this.idCategoria);

      const tempCategoriasKits = categoriasKits.filter( (ck) => ck.id_categoria === idCategoria );
      tempCategoriasKits.forEach(function (ck) {
        // Obtengo el kit según el id de la CategoriaKit(ck)
        if (!filteredKits.some( fk => fk.id === ck.id_kit)) {
          const tempKit = tempKits.find( kit => kit.id ===  ck.id_kit);
          // Obtengo la categoria del Kit, según el ck
          tempKit.categoria = categorias.find( c => c.id === ck.id_categoria);
          // Seteo el link que corresponde
          if (tempKit.link === '') {
            tempKit.link = tempKit.categoria.link_amway;
          }
          filteredKits.push(tempKit);
        }
      });
    } else { // Si no hay id, mostraremos todos los kits
      this.allKits.forEach(function (kit) {
        const tempCK = categoriasKits.find( ck => ck.id_kit ===  kit.id);
        // Obtengo la categoria del Kit, según el ck
        kit.categoria = categorias.find( c => c.id === tempCK.id_categoria);
        if (kit.link === '') {
          kit.link = kit.categoria.link_amway;
        }
        filteredKits.push(kit);
      });
    }
    this.siteLoaded = true;
  }

  toggleCard(event: any) {
    const text = $(event.target).text();
    if (text === '▲' || text === '▼') {
      $(event.target).text(text === '▼' ? '▲' : '▼');
      $(event.target).closest('.card-container').find('div.toggle').slideToggle();
    }
  }

  getCategoriaActual(idCategoria) {
    this.kitsService.getCategoriaById(idCategoria).subscribe(data => {
      this.categoriaActual = data;
    });
  }
}
