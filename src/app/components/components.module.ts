import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ProductsComponent,
    CreateComponent,
    EditComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ComponentsModule { }
