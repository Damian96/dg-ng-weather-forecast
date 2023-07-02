import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
} from "rxjs/operators";
import { City, suggestedCities } from "src/app/shared/models/greek-cities.model";
import { ForecastResponse } from "src/app/shared/models/weatherservice.model";
import { WeatherService } from "src/app/shared/weather.service";

@Component({
  selector: "app-weather-search",
  templateUrl: "./weather-search.component.html",
})
export class WeatherSearchComponent implements OnInit, OnDestroy {
  locationControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/[A-Z][a-z]/i),
    Validators.minLength(3)
  ]);
  filteredLocations$: Observable<City[]>;
  searchLocSub: Subscription;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.filteredLocations$ = this.locationControl.valueChanges.pipe(
      tap((value) => {
        if (value && value.length > 3) {
          this.weatherService.searchValueChanged.next(true);
        }
      }),
      debounceTime(500),
      distinctUntilChanged(),
      map((value) => {
        return this.filterGreekCities(value)
      })
    );
  }

  filterGreekCities(value: any): City[] {
    if (typeof value === 'object' && value.hasOwnProperty('name')) {
      // Guard: city has been found and selected
      this.weatherService.autoCompleteNotFound.next(false);
      return [];
    }

    let filteredCities = suggestedCities.filter((city: City) => {
      if (value && typeof value === 'string') {
        return city.name.toLowerCase().includes(value.trim().toLowerCase());
      } else {
        return false;
      }
    });
    this.weatherService.autoCompleteNotFound.next(filteredCities.length == 0);
    return filteredCities;
  }

  displayFn(location: City): string {
    return location && location.name ? location.name : "";
  }

  onOptionSelectedHandler(event: MatAutocompleteSelectedEvent) {
    let selectedCity: City = event.option.value;
    this.searchLocSub = this.weatherService.getForecastObject(1, undefined, selectedCity)
      .subscribe((fResponse: ForecastResponse) => {
        this.weatherService.addSelectedLocation(fResponse.location);
        this.weatherService.selectedForecast.next(fResponse);
        this.weatherService.searchValueChanged.next(false);
      });
  }

  ngOnDestroy() {
    this.searchLocSub.unsubscribe();
  }
}
