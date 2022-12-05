import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: string;
  constructor(private activateRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoutes.paramMap.subscribe((url) => {
      this.id = url.get('id');
    });
  }

}
