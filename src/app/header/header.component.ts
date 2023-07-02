import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { boundMethod } from "autobind-decorator";
import { WeatherService } from "../shared/weather.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          opacity: 1,
          left: 0,
        })
      ),
      state(
        "closed",
        style({
          opacity: 0.5,
          left: "100%",
        })
      ),
      transition("open => closed", [animate(".66s")]),
      transition("closed => open", [animate(".33s")]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSearchOpen: boolean = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownHandler);

    this.weatherService.selectedForecast.subscribe(() => {
      this.isSearchOpen = false;
    })
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;

    if (!this.isSearchOpen) {
      this.weatherService.searchValueChanged.next(false);
      this.weatherService.autoCompleteNotFound.next(false);
    }
  }

  @boundMethod
  onKeyDownHandler(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && e.code == "KeyF") {
      this.toggleSearch();
    }
  }

  ngOnDestroy(): void {
    this.weatherService.selectedForecast.unsubscribe();
  }
}
