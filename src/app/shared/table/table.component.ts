import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { catchError, map, of, retry } from "rxjs";
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() text_value: string = "";

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchedProducts: Product[] = [];
  default_logo: string = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
  page: number = 1;
  productsPerPage: number = 5;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // Trigger the search when text_value has changed
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text_value']) {
      this.handleSearch();
    }
  }

  // Get all Products to show in the Table
  getProducts() {
    const handleResp = this.productService.getProducts().pipe(
      map((resp) => {
        if (!resp) {
          alert("No hay datos para mostrar");
          return;
        }
        return resp;
      }), retry(3),
      catchError(() => of(alert("Algo salió mal, intentalo mas tarde"))));

    handleResp.subscribe((data) => {
      if (data) {
        this.products = data;
        this.getActualPage();
      }
    });
  }

  // Method to handle the search by name and description
  handleSearch() {
    if (this.text_value) {
      this.searchedProducts = this.products.filter(
        (el) => el.name?.toLowerCase().includes(this.text_value.toLowerCase()) ||
          el.description?.toLowerCase().includes(this.text_value.toLowerCase())
      );
    }
    this.getActualPage();
  }

  // Handle the Delete for a Product
  handleDelete(id: string) {
    const allow_delete = confirm("¿Estás seguro de eliminar este producto?");
    if (allow_delete) {
      const handleResp = this.productService.deleteProduct(id).pipe(
        catchError(() => of(alert("Algo salió mal, intentalo mas tarde"))));

      handleResp.subscribe((data) => {
        if (data) {
          alert("Eliminado correctamente");
        }
      })
    }
  }

  // Pagination handler
  handleChangePage(page: number) {
    this.page = page;
    this.getActualPage();
  }

  // Amount of elements handler
  handleViewQuantity(e: Event) {
    this.productsPerPage = +(e.target as HTMLInputElement).value;
    this.getActualPage();
  }

  // This method allows us to know how many elements should we show
  getActualPage() {
    const start = (this.page - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    if (this.text_value) {
      this.filteredProducts = this.searchedProducts.slice(start, end);
    } else {
      this.filteredProducts = this.products.slice(start, end);
    }
  }
}
