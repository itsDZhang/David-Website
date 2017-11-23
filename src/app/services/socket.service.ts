import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SocketService {
  private url = 'http://www.johnsonhan.com/';
  private socket;
  private connection;
  private trial = 0;

  // Tutorial by
  // http://www.syntaxsuccess.com/viewarticle/socket.io-with-rxjs-in-angular-2.0
  constructor(private _http: Http) {

    if (window.location.href.includes("localhost")) {
      this.url = 'http://localhost:5000';
    }

    if (!this.socket || !this.socket.connected) {
      this.socket = io(this.url);
    }

    this.connection = this.getMessages().subscribe(message => {
      console.log(message);
    });

    this.getLocation();
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  getLocation(): void {
    const url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB8ZN6rdeuVJKg1Sjt3hJmNYciom9VeEK0";
    this._http.post(url, null).subscribe(res => {
      let data = res.json();
      var temp = {
        lat: data.location.lat,
        long: data.location.lng,
        accuracy: data.accuracy
      };
      console.log(temp);
      this.socket.emit("location", temp);
    }, err => {
      console.log('error fetching location');
      if (++this.trial < 3) this.getLocation();
    });
  }
}
