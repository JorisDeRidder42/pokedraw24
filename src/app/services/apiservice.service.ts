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
  data:any;


  constructor(private http: HttpClient) { }

  //Generates a random number between 1 and 151 to get a random Pokémon
  CreateRandomIndex(){
    const indexPokemon = Math.floor(Math.random() * this.maxGen1) + this.minGen1
    return indexPokemon;
  }
  //Gets the random pokémon
  getPokemonFromGen1(indexPokemon:number){
    return this.http.get(`${this.baseUrl}${indexPokemon}`)
 }
  //Gets the image from the pokémon
  getPokeImage(index: number){
    return `${this.imageUrl}${index}.png`;
  }
  //Get all Pokemon
  getPokedex(offset = 0):any{
    return this.http
    .get(
      `${this.baseUrl}?offset=${offset}&limit=26`,{
      params: {
        offset: 26,
      }
    })
  }
  getPokeDetails(indexPokemon: string | null){
    return this.http.get(`${this.baseUrl}${indexPokemon}`).pipe(
      map(pokemon =>{
        return pokemon
      })
    );
  }
}
