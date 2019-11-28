import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// HttpClient module, for RESTful API
import { HttpClientModule } from '@angular/common/http';
// Forms module
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Components
import { TestComponent } from './test/test.component';
import { PregsResComponent } from './pregs-res/pregs-res.component';
import { AltaPregResComponent } from './pregs-res/alta/alta.component';
import { AlertComponent } from './shared/alert/alert.component';
// Productos
import { AltaProductoComponent } from './productos/alta-producto/alta-producto.component';
import { ListaProductosComponent } from './productos/lista-productos/lista-productos.component';
// Kits
import { KitsListComponent } from './kits/kits-list/kits-list.component';
import { KitsUpdateComponent } from './kits/kits-update/kits-update.component';
import { KitsCreateComponent } from './kits/kits-create/kits-create.component';

// Chart
import { ChartsModule } from 'ng2-charts';
import { Context } from 'chartjs-plugin-datalabels';
// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriasCreateComponent } from './categorias/categorias-create/categorias-create.component';
import { CategoriasUpdateComponent } from './categorias/categorias-update/categorias-update.component';
import { CategoriasListComponent } from './categorias/categorias-list/categorias-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PregsResComponent,
    AltaPregResComponent,
    AlertComponent,
    AltaProductoComponent,
    ListaProductosComponent,
    CategoriasCreateComponent,
    CategoriasUpdateComponent,
    CategoriasListComponent,
    KitsCreateComponent,
    KitsUpdateComponent,
    KitsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
