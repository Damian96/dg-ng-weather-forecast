import { Component, ViewChild, ElementRef } from "@angular/core";
import { gsap } from "gsap";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  searchText = "";
  @ViewChild("searchbar") searchbar: ElementRef;
  timeline: TimelineMax;

  ngOnInit() {
    this.timeline = gsap.timeline({ paused: true });
    this.timeline.to(".search-block", {
      scaleX: "100%",
      opacity: 1,
    });
    this.timeline.set(".search-block", {
      borderBottom: "1px solid black",
    });
    // preload animation
    this.timeline.progress(1).progress(0);
  }

  openSearch() {
    this.timeline.play().then(() => {
      this.searchbar.nativeElement.focus();
    });
  }

  closeSearch() {
    this.timeline.reverse().then(() => {
      this.searchText = "";
    });
  }
}
