import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs/operators";
import { Location } from "src/app/shared/weatherservice.model";
import { WeatherService } from "src/app/shared/weather.service";

@Component({
  selector: "app-weather-search",
  templateUrl: "./weather-search.component.html",
})
export class WeatherSearchComponent {
  locationControl = new FormControl();
  locations: Location[] = [];
  filteredLocations$: Observable<Location[]>;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.filteredLocations$ = this.locationControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) => this.weatherService.searchLocation(q))
    );
  }

  displayFn(location: Location): string {
    return location && location.name ? location.name : "";
  }

  searchLocation(q: string): void {
    this.weatherService.searchLocation(q).subscribe((locations) => {
      this.locations = locations;
    });
  }

  onOptionSelectedHandler(event: MatAutocompleteSelectedEvent) {
    this.weatherService.addSelectedLocation(event.option.value);
  }
}
