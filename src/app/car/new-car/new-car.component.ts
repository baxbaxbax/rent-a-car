import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/car/shared/car.service';
import { Model } from 'src/app/car/shared/model';
import { Mark } from 'src/app/car/shared/mark';
import { Fuel } from 'src/app/car/shared/fuel';
import { Gearbox } from 'src/app/car/shared/gearbox';
import { CarClass } from 'src/app/car/shared/carclass';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {
  newCarForm;
  models: Model[];
  marks: Model[];
  fuels: Fuel[];
  gearboxes: Gearbox[];
  carClasses: CarClass[];

  constructor(private formBuilder: FormBuilder, private carService: CarService) {
    this.newCarForm = this.formBuilder.group({
      markId: -1,
      modelId: -1,
      fuelId: -1,
      gearboxId: -1,
      carClassId: -1,
      kilometrage: 0,
      numberOfChildSeats: 0,
      pickUpPlace: '',
      fromDate: '',
      toDate: '',
      allowedKilometrage: 0,
      priceListId: -1
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(userData) {
    this.newCarForm.reset();
  }

  getData() {
    this.carService.getModels()
      .subscribe((data: Model[]) => this.models = data);
    this.carService.getMarks()
      .subscribe((data: Mark[]) => this.marks = data);
    this.carService.getGearboxes()
      .subscribe((data: Gearbox[]) => this.gearboxes = data);
    this.carService.getFuels()
      .subscribe((data: Fuel[]) => this.fuels = data);
    this.carService.getCarClasses()
      .subscribe((data: CarClass[]) => this.carClasses = data);

    // pricelist
  }

}