import { Component, AfterViewInit, EventEmitter, Input, Output, ChangeDetectorRef, ElementRef } from '@angular/core';
import * as anime from 'animejs';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  host: { '(window:resize)': 'resize()'}
})
export class LoadingComponent implements AfterViewInit {

    @Output() loadingDone = new EventEmitter<boolean>();
    @Input() hide;

    private height = 0;
    private width = 0;
    visible = true;
    private firstColor = "#5E89FB";
    private secondColor = "#18F38C";
    private thirdColor = "#FF1554";
    private scalingFactor = 0;
    private basicTimeline: any;

    constructor(private detectorRef:ChangeDetectorRef, public el: ElementRef) {}

    ngAfterViewInit() {
      this.basicTimeline = anime.timeline();
      this.load();
    }

    resize() {
      if (this.visible) {
        window.location.reload();
      }
      this.visible = false;
    }

    load() {
      this.height = this.el.nativeElement.firstElementChild.clientHeight;
      this.width = this.el.nativeElement.firstElementChild.clientWidth;
      this.scalingFactor = 200 / this.width;

      this.basicTimeline
        .add({
          targets: ".move-circle",
          cx: [
            { value: '10' },
          ],
          cy: [
            { value: '90' },
          ],
          fill: [
            { value: '#FFFFFF' },
            { value: this.firstColor },
          ],
          easing: 'easeInOutSine',
          duration: 2000,
        })
        .add({
          targets: ".circle-h-2",
          fill: [
            { value: this.firstColor },
          ],
          easing: 'easeInOutSine',
          duration: 1,
        })
        .add({
          targets: ".circle-a-1",
          cx: [
            { value: '90' }
          ],
          cy: [
            { value: '45' }
          ],
          fill: [
            { value: this.secondColor }
          ],
          duration: 2000,
          offset: '-= 1000'
        })
        .add({
          targets: ".circle-n-1",
          cx: [
            { value: '120' }
          ],
          fill: [
            { value: this.thirdColor }
          ],
          duration: 1200,
          offset: '-= 2000'
        })
        .add({
          targets: ".circle-n-2",
          cx: [
            { value: '155' }
          ],
          fill: [
            { value: this.thirdColor }
          ],
          duration: 1200,
          offset: '-= 2000'
        })
        .add({
          targets: ".circle-h-1",
          cy: [
            { value: '10' },
          ],
          fill: [
            { value: this.firstColor },
          ],
          easing: 'easeInOutSine',
          duration: 1000,
          offset: '-= 1000'
        })
        .add({
          targets: ".letter-h-1",
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1000,
          offset: '-= 1000'
        })
        .add({
          targets: ".move-circle",
          fill: [
            { value: this.firstColor }
          ],
          easing: 'easeInOutSine',
          duration: 10,
          offset: "-= 1010"
        })
        .add({
          targets: ".letter-h-2",
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1000,
          offset: "-= 1000"
        })
        .add({
          targets: ".move-circle",
          cx: [
            { value: '45' }
          ],
          duration: 1200,
          offset: "-= 1010"
        })
        .add({
          targets: ".letter-a-1",
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration: 1000,
          offset: "-= 1000"
        })
        .add({
          targets: ".circle-a-1",
          easing: 'easeInOutSine',
          scale: 0,
          duration: 1,
          offset: "-= 1000"
        })
        .add({
          targets: ".letter-n-0",
          translateX: 110,
          duration: 1000,
          stroke: [
            { value: this.thirdColor }
          ],
          offset: "-= 1000"
        })
        .add({
          targets: ".letter-a-2",
          easing: 'easeInOutSine',
          duration: 1000,
          strokeDashoffset: [anime.setDashoffset, 0],
          offset: '-= 1000'
        })
        .add({
          targets: ".letter-n-2",
          duration: 1000,
          offset: '-= 1000',
          d: [
            { value: 'M 120 90 V 30' }
          ]
        })
        .add({
          targets: ".letter-n-1",
          duration: 1000,
          d: [
            { value: 'M 120 90 V 40' }
          ],
          offset: '-= 1000'
        })
        .add({
          targets: ".letter-n",
          translateX: 30,
          duration: 1000,
          offset: '-= 1000'
        })
        .add({
          targets: ".letter-n-0",
          translateX: 140, // 110 default
          duration: 1000,
          offset: '-= 1000'
        })
        .add({
          targets: ".letter-a-1",
          translateX: -5,
          duration: 500,
          stroke: [{value: this.secondColor}],
          offset: '-= 500'
        })
        .add({
          targets: ".letter-a-1",
          translateX: -5,
          d: [
            { value: 'M 120 90 V 25 M 120 30 a 10 10 0 0 0 -30 0' }
          ],
          duration: 1000,
          offset: '-= 1000'
        })
        .add({
          targets: ".letter-a-2",
          translateX: 5, // -30 default
          duration: 200,
          offset: '-= 1000'
        })
        .add({
          targets: ".letter-a",
          translateY: 30,
          scaleY: 0.7,
          offset: '-= 500',
          duration: 1000
        })
        .add({
          targets: "#loading-svg",
          scale: this.scalingFactor,
          duration: 1000,
          offset: '-= 500',
          easing: 'easeInOutSine',
        })
        .add({
          targets: ".rim",
          duration: 1000,
          strokeDashoffset: [anime.setDashoffset, 0],
        })
      ;

      if (!this.basicTimeline.complete) {
        this.basicTimeline.complete = () => {
          this.loadingDone.emit(true);
          this.visible = false;
        }
      }
    }
  }
