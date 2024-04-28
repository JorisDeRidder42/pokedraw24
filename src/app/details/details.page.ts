import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: any;
  isShinies: boolean = false;
  evolutions: any = [];


  constructor(private route: ActivatedRoute, private service: ApiserviceService) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.service.getPokeDetails(index).subscribe(details => {
      this.details = details;
      this.isShinies = false;
      this.service.getPokemonEvelutions(index).subscribe((data) => {
        console.log('data',data)
        this.evolutions = [data];
      })
    })
  }

}
