import { Component, OnInit, ViewChild } from '@angular/core';
import Typewriter from 't-writer.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('tw', { static: false }) typewriterElement;

  ngOnInit() {

  }
  ngAfterViewInit() {

    const target = this.typewriterElement.nativeElement

    const writer = new Typewriter(target, {
      loop: true,
      typeColor: 'black'
    })

    writer
      .type("Are you worried of charging your electric vehicle?")
      .rest(500)
      .clear()
      .type("Don't worry, now you can charge your vehicle at Capgemini")
      .clear()
      .type("You can book your charging slot")
      .rest(500)
      .remove()
      .type("customise your experience")
      .rest(500)
      .remove()
      .type("check your monthly reports")
      .rest(500)
      .remove()
      .start()


  }
}
