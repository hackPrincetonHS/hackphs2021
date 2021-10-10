import { IfStmt } from '@angular/compiler';
import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { isElementAccessExpression } from 'typescript';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

	ratio;
	heightsMap;
	numRepeat;

	finalImagesArray: Array<string> // will contain the actual number of repeating sections we need
	
	totalImageHeight;
	
	sponsorsHeight;

	constructor(private zone: NgZone) {
		this.heightsMap = new Map<string, number>();
		this.ratio=1;
		this.numRepeat=0;
		this.finalImagesArray = new Array<string>();
		this.totalImageHeight = 0;
		this.sponsorsHeight=0;
	}

	ngOnInit(): void {

		// THE FUNCTION BELOW WILL RUN WHENEVER CHANGE IS DETECTED
		const observer = new ResizeObserver(entries => {
			
			this.zone.run(() => {
				entries.forEach(entry => {
					// getting background heights + content height and updating in map
					if(entry.target.id === "for-sponsors"){
						this.sponsorsHeight = entry.contentRect.height;
					}else{
						this.heightsMap.set(entry.target.id, entry.contentRect.height);
					}
				});

				let totalBackgroundHeights:number = 0;
				let contentHeight:number = 0;
				let repeatingBackgroundHeight:number = 1;
							
				for(let background of this.heightsMap){
					totalBackgroundHeights += background[1];
				}
				
				contentHeight = this.heightsMap.get('content') as number + 800; // adding on 800 because ResizeObserver might *not be recording down margins
				repeatingBackgroundHeight = this.heightsMap.get('testRepeatingBg') as number;
				
				
				// content is definitely less than or equal to background height total, but add an ABS to be sure
				this.ratio = Math.abs(totalBackgroundHeights - contentHeight) / repeatingBackgroundHeight; // hence why its named "ratio"
				
				let ratioTrimmed:number = 16 - this.ratio;
				this.numRepeat = Math.ceil(ratioTrimmed / 0.2);

				let rate:number = 0.7;
				if(this.ratio < 14){ // need to ramp up add in rate when ratio < 14
					if(this.ratio < 12.5){
						rate -= 0.2;
						if(this.ratio < 11.47){
							rate -= 0.1;
							if(this.ratio < 11){
								rate -= 0.1;
								if(this.ratio < 9.6){
									rate -= 0.05;
								}
							}
						}
					}
					this.numRepeat += Math.ceil(ratioTrimmed / rate);
				}
				
				console.log("Number reapeating: " + this.numRepeat);


				console.log("Number reapeating after 12.5: " + this.numRepeat);

				console.log(this.ratio);				
				
				// numRepeat will be the amount of repeating Sections we need

				// populating an imageArray with url to repeating sections 
				let imageArray = ['/assets/repeating/rpv1.png', '/assets/repeating/rpv2.png',
								'/assets/repeating/rpv3.png', '/assets/repeating/rpv4.png',
								'/assets/repeating/rpv5.png'];

				this.finalImagesArray = [];
				for(let i=0; i<this.numRepeat; ++i){
					this.finalImagesArray.push(imageArray[i % 6]); // modulo 6 since we want to go(INDEX IN ARRAY, NOT Image NAME): 0->1->2->3->4->0->...
				}
				
				// setting main content height:
				
				this.totalImageHeight = totalBackgroundHeights - 1000;
				if(this.ratio < 11){
					let subtractRate:number = 700;
					if(this.ratio < 10.6){
						subtractRate -= 300;
						if(this.ratio < 9.6){
							subtractRate -= 400;
						}
					}
					this.totalImageHeight = totalBackgroundHeights - subtractRate;
				}
				

				
				
			});
		});
		// THE FUNCTION ABOVE WILL RUN WHENEVER CHANGE IS DETECTED
		
		// non-repeating backgrounds: measure heights 
		observer.observe(document.querySelector("#topBg") as Element);
		observer.observe(document.querySelector("#repeatingBegin") as Element);
		observer.observe(document.querySelector("#repeatingEnd") as Element);
		observer.observe(document.querySelector("#bottomBg") as Element);
		
		observer.observe(document.querySelector("#content") as Element);
		
		observer.observe(document.querySelector("#testRepeatingBg") as Element);
		
		observer.observe(document.querySelector("#for-sponsors") as Element);

	}



}
