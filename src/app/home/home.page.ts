import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonIndex:number = 0;
  pokeImage: string = "";
  pokemonGen1:any;
  buttonDisabled: boolean = false;
  loaded:boolean = false;

  constructor(private service :ApiserviceService) {}
  
  
  ngOnInit(){
    console.log('ngOnit')
    this.loadRandomPokemonGen1();
  }
  // So you can not keep calling the API
  disableButtonFor5Seconds() {
    this.buttonDisabled = true;
    setTimeout(() => {
        this.buttonDisabled = false;
    },5000);
  }

  async loadRandomPokemonGen1(){
    try {
      this.disableButtonFor5Seconds();
      // Get the the Id from the pokémon from gen 1
      this.pokemonIndex = this.service.CreateRandomIndex();
      // Show the the image with the specific Id from the pokémon from gen 1
      this.pokeImage = this.service.getPokeImage(this.pokemonIndex);
      // Shows the name from the Id from pokémon gen 1
      this.service.getPokemonFromGen1(this.pokemonIndex).subscribe((res) => this.pokemonGen1 = res)
      this.loaded = true;
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  
}