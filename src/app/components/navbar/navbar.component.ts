import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount: number = 0;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.cartCount$.subscribe(data=>{
      this.cartCount = data;
    })
  }

  toggleCart(){

  }

}
