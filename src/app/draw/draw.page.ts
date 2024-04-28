import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.page.html',
  styleUrls: ['./draw.page.scss'],
})
export class DrawPage implements AfterViewInit {
  @ViewChild('myCanvas', {static: false}) canvas: any;
  canvasElement: any;
  PositionX: number = 0;
  PositionY: number = 0;
  drawing = false;
  selectedColor: string = '#459cde';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3', '#ffffff' ];
  lineWidth: number = 10;
  restoreArray = [];
  indexArray :number = -1;
  dataUrl:string = "";

  constructor(private plt: Platform, private toastCtrl: ToastController) {}
  

  ngAfterViewInit() {
    // this.canvasElement = this.canvas.nativeElement;
    // this.canvasElement.width = this.plt.width() + '';
    // this.canvasElement.height = 200;
  }

}
