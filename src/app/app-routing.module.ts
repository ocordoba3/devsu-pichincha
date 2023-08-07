import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from "./pages/products/products.component";
import { CreateComponent } from "./pages/create/create.component";
import { EditComponent } from "./pages/edit/edit.component";

const routes: Routes = [
  {
    path: "", component: ProductsComponent
  },
  {
    path: "create", component: CreateComponent
  },
  {
    path: "edit/:id", component: EditComponent
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
