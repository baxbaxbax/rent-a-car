import { Component, OnInit } from '@angular/core';
import { IRequest } from './shared/irequest.request';
import { RequestService } from './shared/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: IRequest[];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.requestService.getRequests()
      .subscribe((data: IRequest[]) => this.requests = data);
  }

  accept(req: IRequest) {
    if (req.bundleId == -1)
      this.requestService.acceptRequest(req.id)
        .subscribe();
    else
      this.requestService.acceptBundle(req.bundleId)
        .subscribe();
  }
}