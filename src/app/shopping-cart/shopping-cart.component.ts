import { Component, OnInit } from '@angular/core';
import { IRequest } from '../requests/shared/irequest.request';
import { IRentRequest } from './shared/irequest.rent';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { IBundle } from './shared/ibundle.rent';
import { ShoppingService } from './shared/shopping.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICartUsers } from './shared/icarusers.cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  requests: IRequest[] = [];
  map: Map<number, IRequest[]> = new Map();
  keys: number[] = [];
  bundles: number[] = [];

  bundleForm: FormGroup;
  usersMap: Map<number, number>;

  constructor(private shoppingService: ShoppingService, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    let cars = { ads: [] };
    this.requests = JSON.parse(localStorage.getItem("Cart"));
    this.requests.forEach(element => {
      cars.ads.push(element.adId);
    });
    this.shoppingService.getUsers(cars).subscribe(data => {
      for (let r of this.requests) {
        if (this.keys.indexOf(data.adUserMap[r.adId]) == -1)
          this.keys.push(data.adUserMap[r.adId]);
        r.userId = data.adUserMap[r.adId];
        if (!this.map.has(r.userId)) {
          this.map.set(r.userId, []);
        }

        this.map.get(r.userId).push(r);
      }
    });
    console.log(this.map);
  }

  onSubmit() {
    let cart = {
      requests: [],
      bundles: []
    }

    for (let key of this.map.keys()) {
      if (this.bundles.indexOf(key) != -1) {
        cart.bundles.push(this.bundleIt(this.map.get(key)));
      } else {
        this.map.get(key).forEach(element => {
          cart.requests.push(this.createRentRequest(element));
        });
      }
    }
    console.log(cart);
    this.shoppingService.rentCars(cart).subscribe(() => {
      alert("success");
    })
    localStorage.removeItem("Cart");
    this.router.navigate(["bill"], { relativeTo: this.route.parent });
  }

  bundleIt(reqs: IRequest[]) {
    let bundle: IBundle = {
      requests: []
    };
    reqs.forEach(element => {
      bundle.requests.push(this.createRentRequest(element));
    });
    return bundle;
  }

  createRentRequest(request: IRequest) {
    let rentRequest: IRentRequest = {
      adId: request.adId,
      pickUpDate: request.pickUpDate,
      pickUpPlace: request.pickUpPlace,
      returnDate: request.returnDate
    };
    return rentRequest;
  }

  changeBundle(userId: number) {
    if (this.bundles.indexOf(userId) == -1) {
      this.bundles.push(userId);
    } else {
      this.bundles.splice(this.bundles.indexOf(userId));
    }
    console.log(this.bundles);
  }

  removeRequest(userId: number, req: IRequest) {
    let toRemove = this.map.get(userId).indexOf(req);
    this.map.get(userId).splice(toRemove, 1);
    toRemove = this.requests.indexOf(req);
    this.requests.splice(toRemove, 1);
    localStorage.setItem("Cart", JSON.stringify(this.requests));
  }

  customTB(index, item) {
    return index;
  }
}
