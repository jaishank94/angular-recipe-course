import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticate: boolean = false;
  constructor(private router:Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authenticate = this.authService.isAuthenticated();
  }

  onNewRecipe(){
    this.router.navigate(['recipes','new']);
  }

  onSave(){
    this.dataStorageService.storeRecipe()
      .subscribe(
        (response: Response)=>{
          console.log(response);
        }
      );
  }

  onFetch(){
    this.dataStorageService.getRecipes();
  }

  onLogOut(){
    this.authService.logOut();
  }
}
