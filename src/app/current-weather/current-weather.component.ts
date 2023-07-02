import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from "../shared/weather.service";
import { Current as CurrentWeather, ForecastResponse, LocationForecast, WeatherLocation } from "../shared/models/weatherservice.model";
import { faTemperatureThreeQuarters, faDroplet, faWind, faArrowUp, faMapPin, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  currentWeather: CurrentWeather;
  location: LocationForecast;
  localTimeTooltip: string;
  inputNotFound: boolean;

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
    this.weatherService.selectedForecast.subscribe((response: ForecastResponse) => {
      this.currentWeather = response.current;
      this.location = response.location;
      this.localTimeTooltip = 'Current time is: ' + this.location.localtime;
      this.inputNotFound = false;
    });

    this.weatherService.searchValueChanged.subscribe((searching: boolean) => {
      this.loading = searching;
    });

    this.weatherService.autoCompleteNotFound.subscribe((notFound: boolean) => {
      this.inputNotFound = notFound;
    });
  }

  ngOnDestroy(): void {
    this.weatherService.selectedForecast.unsubscribe();
    this.weatherService.searchValueChanged.unsubscribe();
    this.weatherService.autoCompleteNotFound.unsubscribe();
  }
}
