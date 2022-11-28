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

  pokemonList = [
    { name: 'Arceus', url: 'https://pokeapi.co/api/v2/pokemon/493/' },
  ];

  users: {
    id: String;
    name: String;
    role: String;
    pokemon: String;
    pokemonUrl: String;
  }[] = [
    // Add employee object
    {
      id: '1',
      name: 'Jane',
      role: 'Designer',
      pokemon: 'Blastoise',
      pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/9/',
    },
    {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      pokemon: 'Charizard',
      pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/6/',
    },
    {
      id: '3',
      name: 'Jim',
      role: 'Developer',
      pokemon: 'Venusaur',
      pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
    {
      id: '4',
      name: 'Adam',
      role: 'Designer',
      pokemon: 'Butterfree',
      pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/12/',
    },
  ];

  constructor() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=386')
      .then((response) => response.json())
      .then((allpokemon) => {
        allpokemon.results.forEach((pokemon: { name: string; url: string }) => {
          this.pokemonList.push(pokemon);
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
      pokemonUrl: String;
    }>
  > {
    return of(this.users);
  }

  findOne(id: string): Observable<{
    id: String;
    name: String;
    role: String;
    pokemon: String;
    pokemonUrl: String;
  }> {
    const user = this.users.find((u: any) => {
      return u.id === id;
    }) ?? {
      id: '5',
      name: 'Karen',
      role: 'Disruption',
      pokemon: 'Zubat',
      pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/41/',
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

  fetchRandomPokemon(): { name: string; url: string } {
    var randomPokemon =
      this.pokemonList[this.getRandomIndex(this.pokemonList.length)];
    randomPokemon.name =
      randomPokemon.name.charAt(0).toUpperCase() +
      randomPokemon.name.substring(1);
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

    for (var i = min + 1; i <= max; i += 1) {
      var randomPokemon = this.fetchRandomPokemon();
      this.users.push({
        id: i.toString(),
        name: this.randomName(),
        role: this.roleList[this.getRandomIndex(this.roleList.length)],
        pokemon: randomPokemon.name,
        pokemonUrl: randomPokemon.url,
      });
    }
    console.log(
      `Completed the generation of ${newCount} employees with ids from ${min} till ${max}`
    );
  }
}
