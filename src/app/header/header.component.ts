import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { boundMethod } from "autobind-decorator";

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
  isSearchOpen: boolean = false;

  ngOnInit() {
    window.addEventListener("keydown", this.onKeyDownHandler);
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  @boundMethod
  onKeyDownHandler(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && e.code == "KeyF") {
      this.toggleSearch();
    }
  }
}
