import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: {
    id: String;
    name: String;
    role: String;
    pokemon: String;
  }[] = [];
  ec = 0;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.all().subscribe((res) => {
      this.users = res;
    });
  }

  myFunc(newEmpCount: string) {
    this.ec = parseInt(newEmpCount);
    if (isNaN(this.ec)) {
      console.log(
        'No numerical value for EmpCount found, "' +
          newEmpCount +
          `" was passed instead.`
      );
    } else {
      console.log(`Generating ${this.ec} new employees!`);
      this.usersService.generateEmployees(this.ec);
    }
  }
}
