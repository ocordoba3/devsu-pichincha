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
  default_logo: string = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
  page: number = 1;
  productsPerPage: number = 5;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text_value']) {
      this.handleSearch();
    }
  }

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

  handleSearch() {
    if (this.text_value) {
      this.filteredProducts = this.products.filter((el) => el.name?.toLocaleLowerCase().includes(this.text_value) || el.description?.toLocaleLowerCase().includes(this.text_value));
    } else {
      this.filteredProducts = this.products;
    }
  }

  handleDelete(id: string) {
    const allow_delete = confirm("¿Estás seguro de eliminar este producto?");
    if (allow_delete) {
      const handleResp = this.productService.deleteProduct(id).pipe(
        map((resp) => {
          if (!resp) {
            alert("Eliminado correctamente");
            return;
          }
          return resp;
        }), retry(3),
        catchError(() => of(alert("Algo salió mal, intentalo mas tarde"))));

      handleResp.subscribe((data) => {
        if (data) {
          alert("Eliminado correctamente");
        }
      })
    }
  }

  handleChangePage(page: number) {
    this.page = page;
    this.getActualPage();
  }

  handleViewQuantity(e: Event) {
    this.productsPerPage = +(e.target as HTMLInputElement).value;
    this.getActualPage();
  }

  getActualPage() {
    const start = (this.page - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    this.filteredProducts = this.products.slice(start, end);
  }
}
