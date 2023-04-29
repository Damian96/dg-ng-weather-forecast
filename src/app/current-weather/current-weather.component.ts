import { Component } from '@angular/core';
import { WeatherService } from "../shared/weather.service";
import { Current as CurrentWeather, ForecastResponse, LocationForecast } from "../shared/weatherservice.model";
import { faTemperatureThreeQuarters, faDroplet, faWind, faArrowUp, faMapPin, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent {
  currentWeather: CurrentWeather;
  location: LocationForecast;
  localTimeTooltip: string;

  /* FontAwesome */
  faTemperatureThreeQuarters = faTemperatureThreeQuarters;
  faDroplet = faDroplet;
  faWind = faWind;
  faArrowUp = faArrowUp;
  faMapPin = faMapPin;
  faInfoCircle = faInfoCircle;

  /* AngularMaterial */
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  positionAbove = new FormControl(this.positionOptions[2]);

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.selectedLocation$.subscribe((loc: LocationForecast) => {
      this.weatherService.getForecastObject(loc, 2).subscribe(
        (response: ForecastResponse) => {
          this.currentWeather = response.current;
          this.location = response.location;
          this.localTimeTooltip = 'Current time is: ' + this.location.localtime;
        }
      )
    })
  }

  ngAfterViewInit() {
  }
}
