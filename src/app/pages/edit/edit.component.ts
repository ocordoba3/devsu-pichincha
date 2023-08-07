import { DatePipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from "rxjs";
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  product = new Product();
  loading: boolean = true;

  constructor(
    private producService: ProductsService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private datePipe: DatePipe
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getById(params["id"]);
      }
    });
  }

  ngOnInit(): void { }

  // Search the Product by ID and pass the values to the form
  getById(id: string) {
    this.loading = true;
    const handleResp = this.producService.getProducts().pipe(
      catchError(() => of(alert("Algo salió mal, intentalo mas tarde"))));

    handleResp.subscribe((resp) => {
      if (resp) {
        const exists = resp.find((el) => el.id === id);
        if (exists) {
          this.product = {
            ...exists,
            date_release: this.datePipe.transform(new Date(exists?.date_release || "").toISOString().split("T")[0], 'yyyy-MM-dd') || "",
            date_revision: this.datePipe.transform(new Date(exists?.date_revision || "").toISOString().split("T")[0], 'yyyy-MM-dd') || "",
          };
        }
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        alert("No se encontró el Producto por el ID");
        this.router.navigate([""]);
      }
    });
  }
}
