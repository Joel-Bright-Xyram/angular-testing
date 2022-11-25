import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  roleList = [
    'Designer',
    'Developer',
    'DevOps',
    'Tester',
    'Marketing',
    'Sales',
    'Documentaion',
  ];

  pokemonList = ['Arceus'];

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

  constructor() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=386')
      .then((response) => response.json())
      .then((allpokemon) => {
        allpokemon.results.forEach((pokemon: { name: string; url: string }) => {
          this.pokemonList.push(pokemon.name);
        });
      });
  }

  getRandomIndex = function (max: number, min?: number) {
    if (typeof min == 'undefined') min = 0;
    return Math.floor(Math.random() * (max - min)) + min;
  };

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

  greatestId(): number {
    var greatest = parseInt(this.users[0].id.toString());
    this.users.forEach((user) => {
      greatest =
        greatest < parseInt(user.id.toString())
          ? parseInt(user.id.toString())
          : greatest;
    });
    return greatest;
  }

  fetchRandomPokemon(): string {
    var randomPokemon =
      this.pokemonList[this.getRandomIndex(this.pokemonList.length)];
    randomPokemon =
      randomPokemon.charAt(0).toUpperCase() + randomPokemon.substring(1);
    return randomPokemon;
  }

  randomName(): string {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var nameLength = this.getRandomIndex(12, 4);
    var name = '';
    name += possible.charAt(Math.floor(Math.random() * possible.length));
    possible = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 1; i < nameLength; i++) {
      name += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return name;
  }

  generateEmployees(newCount: number) {
    var min = this.greatestId();
    var max = newCount + min;

    for (var i = min; i <= max; i += 1) {
      this.users.push({
        id: i.toString(),
        name: this.randomName(),
        role: this.roleList[this.getRandomIndex(this.roleList.length)],
        pokemon: this.fetchRandomPokemon(),
      });
    }
    console.log(
      `Completed the generation of ${newCount} employees with ids from ${min} till ${max}`
    );
  }
}
