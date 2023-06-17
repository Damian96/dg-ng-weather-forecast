import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { CurrentWeatherComponent } from "./current-weather/current-weather.component";
import { ForecastWeatherComponent } from "./forecast-weather/forecast-weather.component";
import { WeatherSearchComponent } from './header/weather-search/weather-search.component';
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";

/* MODULES */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CurrentWeatherComponent, ForecastWeatherComponent, WeatherSearchComponent, LoadingSpinnerComponent, FooterComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FontAwesomeModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
