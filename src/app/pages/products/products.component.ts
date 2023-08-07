import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  text_value: string = "";
  loading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  // Navigate to Create form
  goToCreate() {
    this.router.navigate(["/create"]);
  }

  // Pass the Search value as Input
  setSearchValue(e: Event) {
    this.text_value = (e.target as HTMLInputElement).value;
  }

}
