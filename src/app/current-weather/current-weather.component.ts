import { Component } from '@angular/core';
import { WeatherService } from "../shared/weather.service";
import { Current as CurrentWeather, ForecastResponse, Location } from "../shared/weatherservice.model";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  currentWeather: CurrentWeather;
  location: Location;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.selectedLocation$.subscribe((loc: Location) => {
      this.location = loc;
      this.weatherService.getForecastObject(loc, 2).subscribe(
        (response: ForecastResponse) => {
          this.currentWeather = response.current;
        }
      )
    })
  }
}
