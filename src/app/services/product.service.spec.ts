import { TestBed } from '@angular/core/testing';
import { ProductsService } from "./products.service";
import { HttpClientModule } from "@angular/common/http";


describe('ProductService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service.getValue()).toBe("Service is working");
  });
});
