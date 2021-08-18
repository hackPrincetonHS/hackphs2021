import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

	observer;
	ratio;
	heightsMap;
	numRepeat;
	
	finalImagesArray; // will contain the actual number of repeating sections we need

	constructor() {
		this.heightsMap = new Map<string, number>();
		this.ratio=0;
		this.numRepeat=0;
		this.finalImagesArray = new Array<string>();


		// THE FUNCTION BELOW WILL RUN WHENEVER CHANGE IS DETECTED
		this.observer = new ResizeObserver(entries => {
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
				let ratioTrimmed:number = 15.5 - this.ratio; // trimming it down for convenience sake

				// every 0.2, add a new section in
				this.numRepeat = Math.ceil(ratioTrimmed / 0.2);

			}
			
			// numRepeat will be the amount of repeating Sections we need

			// populating an imageArray with url to repeating sections 
			let imageArray = ['./../../assets/repeating/rpv1.png', './../../assets/repeating/rpv2.png',
							'./../../assets/repeating/rpv3.png', './../../assets/repeating/rpv4.png',
							'./../../assets/repeating/rpv5.png'];

			for(let i=0; i<this.numRepeat; ++i){
				this.finalImagesArray.push(imageArray[i % 6]); // modulo 6 since we want to go(INDEX IN ARRAY, NOT Image NAME): 0->1->2->3->4->0->...
			}
			
			console.log(this.finalImagesArray);
			
		});

		// THE FUNCTION ABOVE WILL RUN WHENEVER CHANGE IS DETECTED
	}

	ngOnInit(): void {

		// non-repeating backgrounds: measure heights 
		this.observer.observe(document.querySelector("#topBg") as Element);
		this.observer.observe(document.querySelector("#repeatingBegin") as Element);
		this.observer.observe(document.querySelector("#repeatingEnd") as Element);
		this.observer.observe(document.querySelector("#bottomBg") as Element);
		
		this.observer.observe(document.querySelector("#content") as Element);
		
		this.observer.observe(document.querySelector("#testRepeatingBg") as Element);
	}



}
