import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit{

  text_value: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void { }

  goToCreate() {
    this.router.navigate(["/create"]);
  }

  setSearchValue(e: Event) {
    this.text_value = (e.target as HTMLInputElement).value;
  }
    // create() {
  //   const body = {date_release: new Date(), date_revision: new Date(), description: "Una breve descripcion 2", id: new Date().getTime().toString(), logo: "", name: "producto 2"};
  //   this.productService.createProduct(body).subscribe((resp) => console.log(resp))
  // }


}
