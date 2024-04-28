import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  maxGen1: number = 151;
  minGen1: number = 1;
  baseUrl = environment.baseUrl;
  imageUrl = environment.imageUrl;
  pokemons:any;


  constructor(private http: HttpClient) { }

  //Generates a random number between 1 and 151 to get a random Pokémon
  CreateRandomIndex(){
    const indexPokemon = Math.floor(Math.random() * this.maxGen1) + this.minGen1
    localStorage.setItem("indexPokemon", indexPokemon.toString());
    return indexPokemon;
  }
  //Gets the random pokémon
  getPokemonFromGen1(indexPokemon:number){
    return this.http.get(`${this.baseUrl}pokemon/${indexPokemon}`)
 }
  //Gets the image from the pokémon
  getPokeImage(index: number){
    return `${this.imageUrl}${index}.png`;
  }
  //Get all Pokemons
  getPokedex(offset = 0) {
    return this.http
      .get(`${this.baseUrl}pokemon?offset=${offset}&limit=26`).pipe(
        map((res: any) => {
          console.log('offset',offset)
          return res.results;
        })
      )
  }
  
  getPokeDetails(indexPokemon: string | null){
    return this.http.get(`${this.baseUrl}pokemon/${indexPokemon}`)
    .pipe(
      map(pokemon => {
        console.log('id', indexPokemon)
        return pokemon
      })
    );
  }
  findPokemon(search: any) {
    return this.http.get(`${this.baseUrl}${search}`).subscribe((res => {
      this.pokemons = res;
    }
    ));
  }
  filterPokemon(type: string | null){
    return this.http.get(`${this.baseUrl}type/${type}`).pipe(
          map((res: any) => this.pokemons = res)
        );
  }
  getPokemonEvelutions(id: string | null){
    return this.http.get(`${this.baseUrl}evolution-chain/${id}`)
  }
}
