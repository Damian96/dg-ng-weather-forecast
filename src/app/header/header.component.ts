import { Component } from "@angular/core";
import { gsap } from "gsap";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  searchText = "";
  timeline: gsap.core.Timeline;

  ngOnInit() {
    this.timeline = gsap.timeline({ paused: true });
    this.timeline.from(".search-block", {
      left: "100%",
      opacity: 0.5,
    });
    this.timeline.to(".search-block", {
      left: 0,
      opacity: 1,
      duration: 0.33,
    });
    this.timeline.set(".search-block", {
      borderBottom: "1px solid black",
    });
    // preload animation
    this.timeline.progress(1).progress(0);
  }

  openSearch() {
    this.timeline.play().then(() => {
      document.getElementById("search-autocomplete")!.focus();
    });
  }

  closeSearch() {
    this.timeline.reverse().then(() => {
      this.searchText = "";
    });
  }
}
