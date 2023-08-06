import { DatePipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    route.params.subscribe((params) => {
      if (params["id"]) {
        this.getById(params["id"]);
      }
    });
  }

  ngOnInit(): void {
  }

  getById(id: string) {
    this.loading = true;
    this.producService.getProducts().subscribe((resp) => {
      const exists = resp.find((el) => el.id === id);
      if (exists) {
        this.product = {
          ...exists,
          date_release: this.datePipe.transform(new Date(exists?.date_release || "").toISOString().split("T")[0], 'yyyy-MM-dd') || "",
          date_revision: this.datePipe.transform(new Date(exists?.date_revision || "").toISOString().split("T")[0], 'yyyy-MM-dd') || "",
        };
      }
      this.loading = false;
    });
  }
}
