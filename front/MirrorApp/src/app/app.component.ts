import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  position: Coordinates;
  url: string = 'http://localhost:3000/api/weather/';
  weather: string;
  constructor(private http: HttpClient, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
      // Make the HTTP request:
      this.getLocation();

      if(this.position.latitude && this.position.longitude){
        this.url = 'http://localhost:3000/api/weather/' + this.position.latitude + '/' + this.position.longitude;
      }
      this.http.get(this.url).subscribe(data => {
        // Read the result field from the JSON response.
        if(!data["error"]) {
          //this.rates = data['rates'];
          this.weather = data["body"];
        }else{
          this.openSnackBar(data["Message"], "dissmiss")
        }
      }, err => {
        this.openSnackBar(err["message"], "dissmiss");
      });
    }

    tryToConvert = function() {
      console.log("entered : ");
      console.log("currency1 = " + this.currency1 + " currency2 = " + this.currency2 + " value = " + this.value + " isInterger : " + Number(this.value))
      if(this.currency1 !== "" && this.currency2 && Number(this.value)){
        this.http.get('http://localhost:3000/api/convert/' + this.currency1 + '/' + this.value + '/' + this.currency2).subscribe(data => {
          if(!data["Error"]) {
            this.result = data['Value'];
          }else{
            this.openSnackBar(data["Message"], "dissmiss");
          }
        }, err => {
          this.openSnackBar(err["message"], "dissmiss");
        });
      }
    }

    openSnackBar = function(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

  getLocation = function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.setPosition);
      } else {
           this.openSnackBar("Geolocation is not supported by this browser.", "dissmiss");
      }
  }

  setPosition = function(pos) {
    if(pos){
      this.position = pos.coords;
    }
  }
}
