import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CurrentWeatherComponent } from "./current-weather/current-weather.component";
import { ForecastWeatherComponent } from "./forecast-weather/forecast-weather.component";
import { hmrModule } from "@angularclass/hmr";
import { WeatherSearchComponent } from './header/weather-search/weather-search.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CurrentWeatherComponent, ForecastWeatherComponent, WeatherSearchComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
