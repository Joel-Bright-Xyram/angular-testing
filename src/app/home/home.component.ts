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
    pokemonUrl: String;
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
    if (isNaN(this.ec) || this.ec < 0) {
      console.log(
        'Invalid value for EmpCount found, "' +
          newEmpCount +
          `" was passed instead.`
      );
    } else {
      console.log(`Generating ${this.ec} new employees!`);
      this.usersService.generateEmployees(this.ec);
    }
  }

  fetchPokemonData(url: string, divId: string) {
    let allPokemonContainer = document.getElementById(divId);
    url = url.includes('https://pokeapi.co/api/v2/pokemon/')
      ? url
      : 'https://pokeapi.co/api/v2/pokemon/1/';
    var thisComponent = this;
    fetch(url)
      .then((response) => response.json())
      .then(function (pokeData) {
        console.log(pokeData);
        if (allPokemonContainer != null)
          thisComponent.renderPokemon(pokeData, allPokemonContainer);
        else console.log(divId + ' not found');
      });
  }

  renderPokemon(pokeData: any, allPokemonContainer: HTMLElement) {
    console.log(pokeData.name + ' details being fetched');
    let pokeContainer = document.createElement('div'); //div will be used to hold the data/details for indiviual pokemon.{}
    // let pokeName = document.createElement('h4');
    // pokeName.innerText = pokeData.name;
    let pokeNumber = document.createElement('h4');
    pokeNumber.innerText = `#${pokeData.id}`;
    let pokeTypes = document.createElement('ul');
    //ul list will hold the pokemon types
    this.createTypes(pokeData.types, pokeTypes);
    //adds the image of the pokemon to the required tag
    this.createPokeImage(pokeData.sprites.front_default.toString(), pokeNumber);
    // helper function to go through the types array and create li tags for each one
    pokeContainer.append(pokeNumber, pokeTypes);
    //appending all details to the pokeContainer div
    allPokemonContainer.appendChild(pokeContainer);
    //appending that pokeContainer div to the main div which will hold all the pokemon cards
  }

  createPokeImage(pokeSpriteURL: string, containerDiv: HTMLParagraphElement) {
    let pokeImage = document.createElement('img');
    pokeImage.srcset = pokeSpriteURL;
    containerDiv.append(pokeImage);
  }

  createTypes(
    types: Array<{ slot: string; type: { name: string; url: string } }>,
    ul: HTMLUListElement
  ) {
    types.forEach(function (typeInstance) {
      let typeLi = document.createElement('li');
      typeLi.innerText = typeInstance.type.name;
      ul.append(typeLi);
    });
  }
}
