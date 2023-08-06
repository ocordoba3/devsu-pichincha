import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { catchError, map, of, retry } from "rxjs";
import { Product } from "src/app/interfaces/product";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  @Input() title: string = "Title";
  @Input() initialValue: Product | undefined;
  @Input() editMode: boolean = false;

  form!: FormGroup;
  min_date = new Date().toISOString().split("T")[0];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: "", disabled: this.editMode }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]], // TODO Validar ID unico
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ["https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg", Validators.required],
      date_release: ["", Validators.required],
      date_revision: [{ value: "", disabled: true }, Validators.required],
    });

    if (this.initialValue) {
      this.form.patchValue(this.initialValue);
    }
  }

  handleDateChange(e: Event) {
    const formattedValue = (e.target as HTMLInputElement).value;
    const splittedValue = formattedValue.split("-");
    const oneYearValue = `${Number(splittedValue[0]) + 1}-${splittedValue[1]}-${splittedValue[2]}`;
    this.form.setValue({ ...this.form.value, date_revision: oneYearValue });
  }

  handleIdValidation(e: Event) {
    const id = (e.target as HTMLInputElement).value;
    this.productService.getProductById(id).subscribe((exists) => {
      if (exists) {
        alert("Este ID ya existe, por favor intente con otro");
        this.form.controls["id"].setErrors({ "id_exists": true })
      }
    });
  }

  reset() {
    this.form.reset();
  }

  save() {
    const handleResp = this.productService[this.editMode ? "editProduct" : "createProduct"](this.form.getRawValue()).pipe(
      map((resp) => {
        if (!resp) {
          alert("Algo salió mal");
          return;
        }
        return resp;
      }), retry(3),
      catchError(() => of(alert("Algo salió mal, intentalo mas tarde"))));

    handleResp.subscribe((data) => {
      if (data) {
        alert(this.editMode ? "Editado exitosamente" : "Creado exitosamente");
        this.router.navigate([""]);
      }
    })
  }
}
