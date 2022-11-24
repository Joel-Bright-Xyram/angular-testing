import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: {
    id: String;
    name: String;
    role: String;
    pokemon: String;
  }[] = [
    // Add employee object
    {
      id: '1',
      name: 'Jane',
      role: 'Designer',
      pokemon: 'Blastoise',
    },
    {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      pokemon: 'Charizard',
    },
    {
      id: '3',
      name: 'Jim',
      role: 'Developer',
      pokemon: 'Venusaur',
    },
    {
      id: '4',
      name: 'Adam',
      role: 'Designer',
      pokemon: 'Butterfree',
    },
  ];

  constructor() {}

  all(): Observable<
    Array<{
      id: String;
      name: String;
      role: String;
      pokemon: String;
    }>
  > {
    return of(this.users);
  }

  findOne(id: string): Observable<{
    id: String;
    name: String;
    role: String;
    pokemon: String;
  }> {
    const user = this.users.find((u: any) => {
      return u.id === id;
    }) ?? {
      id: '5',
      name: 'Karen',
      role: 'Disruption',
      pokemon: 'Zubat',
    };

    return of(user);
  }
}
