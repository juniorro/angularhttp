import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  users: any = [];
  posts: any = [];
  smallIcon = new L.Icon({
    // iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3603/3603850.svg',
    iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3603/3603850.svg',
    iconSize:    [32, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.getUsers();
    //this.getPosts();
  }

  ngAfterViewInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe(
      response => {
        console.log(response);
        //this.getCurrentLocation(response);
      },
      error => console.log(error),
      () => console.log('Finished fetching all users')
    );
  }

  getPosts() {
    this.apiService.getPosts().subscribe(
      response => this.posts = response,
      error => console.log(error),
      () => console.log('Finished fetching all users')
    );
  }

  private plotMap(users: any[]): void {
    const user = users[0];
    const lat: number = +user.address.geo.lat;
    const long: number = +user.address.geo.lng;
    console.log(lat, long);
    const map = L.map('map', {
    center: [lat, long],
    zoom: 8
  });
    const mainLayer = L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=WMiJY3C1dO1Vn1Eot8nF', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 100,
      maxZoom: 100,
      crossOrigin: true,
      attribution: '\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e'
    });
    mainLayer.addTo(map);

    const marker = L.marker([lat, long], { icon: this.smallIcon });
    marker.addTo(map).bindPopup(user.name).openPopup();
    // users.forEach(user => {
    //   console.log('added user to map ', user)
    //   const marker = L.marker([user.address.geo.lat, user.address.geo.lat], { icon: this.smallIcon });
    //   marker.addTo(map).bindPopup(user.name).openPopup();
    // });
  }

  private getCurrentLocation(users: any[]): void {
      const map = L.map('map', {
        center: [0.0000, 0.0000],
        zoom: 8,
      });
      const mainLayer = L.tileLayer('https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=WMiJY3C1dO1Vn1Eot8nF', {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 35,
        crossOrigin: true,
        noWrap: true,
        attribution: '\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e'
      });
      mainLayer.addTo(map);
      // const marker = L.marker([lat, long], { icon: this.smallIcon });
      // marker.addTo(map).bindPopup(user.name).openPopup();
      users.forEach(user => {
      const marker = L.marker([+user.address.geo.lat, +user.address.geo.lat], { icon: this.smallIcon });
      marker.addTo(map).bindPopup(user.name).openPopup();
    });
  }

}
