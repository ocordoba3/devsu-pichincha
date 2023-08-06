import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FormComponent,
    TableComponent
  ]
})
export class SharedModule { }
