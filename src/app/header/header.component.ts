import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

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
export class HeaderComponent {
  searchText = "";
  isSearchOpen: boolean = false;

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
}
