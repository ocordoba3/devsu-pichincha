import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './products/products.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    EditComponent,
    CreateComponent,
    ProductsComponent,
  ],
  providers: [
    DatePipe
  ]
})
export class PagesModule { }
