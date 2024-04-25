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
  // getPokedex(offset = 0) {
  //   return this.http
  //     .get(`${this.baseUrl}?offset=${offset}&limit=25`).pipe(
  //       map((res: any) => {
  //         // Convert the object into an array of its values
  //         return res.results;
  //       })
  //     )
  // }
    getPokedex(offset = 0, type?: string, height?: string, weight?: string): any {
      let url = `${this.baseUrl}?offset=${offset}&limit=25`;
      // Apply filters
      if (type) {
        url += `?type=${type}`;
      }
      if (height) {
        url += `&height=${height}`;
      }
      if (weight) {
        url += `&weight=${weight}`;
      }
      return this.http.get(url).pipe(
        map((res:any) => {
          console.log(url)
          return res.results
        })
      );
    }
  
  getPokeDetails(indexPokemon: string | null){
    return this.http.get(`${this.baseUrl}${indexPokemon}`)
    .pipe(
      map(pokemon => {
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
    return this.http.get(`${this.baseUrl}/type/${type}`).pipe(
          map((res: any) => this.pokemons = res)
        );
  }
}
