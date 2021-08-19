import { IfStmt } from '@angular/compiler';
import { Component, ElementRef, NgZone, OnInit } from '@angular/core';

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

	constructor(private zone: NgZone) {
		this.heightsMap = new Map<string, number>();
		this.ratio=0;
		this.numRepeat=0;
		this.finalImagesArray = new Array<string>();
	}

	ngOnInit(): void {

		// THE FUNCTION BELOW WILL RUN WHENEVER CHANGE IS DETECTED
		const observer = new ResizeObserver(entries => {
			
			this.zone.run(() => {
				entries.forEach(entry => {
					// getting background heights + content height and updating in map
					this.heightsMap.set(entry.target.id, entry.contentRect.height);
				});

				let totalBackgroundHeights:number = 0;
				let contentHeight:number = 0;
				let repeatingBackgroundHeight:number = 0;
							
				for(let background of this.heightsMap){
					totalBackgroundHeights += background[1];
				}
				
				contentHeight = this.heightsMap.get('content') as number + 800; // adding on 800 because ResizeObserver might *not be recording down margins
				repeatingBackgroundHeight = this.heightsMap.get('testRepeatingBg') as number;
				// content is definitely less than or equal to background height total, but add an ABS to be sure
				this.ratio = Math.abs(totalBackgroundHeights - contentHeight) / repeatingBackgroundHeight; // hence why its named "ratio"
				
				// ratio = 15.5 and up, you're safe to not add any sections in
				if(this.ratio < 15.5){ // otherwise, start adding them in
					console.log(this.ratio);
					let ratioTrimmed:number = 15.5 - this.ratio; // trimming it down for convenience sake
					
					if(this.ratio < 13.0){
						if(this.ratio < 11.7){
							this.numRepeat = Math.ceil(ratioTrimmed / 0.108);
						}else{
							this.numRepeat = Math.ceil(ratioTrimmed / 0.12);
						}
					}else{
						// every 0.2, add a new section in
						this.numRepeat = Math.ceil(ratioTrimmed / 0.15);
					}

				}
				
				// numRepeat will be the amount of repeating Sections we need

				// populating an imageArray with url to repeating sections 
				let imageArray = ['/assets/repeating/rpv1.png', '/assets/repeating/rpv2.png',
								'/assets/repeating/rpv3.png', '/assets/repeating/rpv4.png',
								'/assets/repeating/rpv5.png'];

				this.finalImagesArray = [];
				for(let i=0; i<this.numRepeat; ++i){
					this.finalImagesArray.push(imageArray[i % 6]); // modulo 6 since we want to go(INDEX IN ARRAY, NOT Image NAME): 0->1->2->3->4->0->...
				}
				
				
				console.log("Is changing: " + this.finalImagesArray.length);
				
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

	}



}
