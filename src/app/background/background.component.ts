import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

	observer;
	numRepeat;
	heightsMap;

	constructor() {
		this.heightsMap = new Map<string, number>();
		this.numRepeat=0;

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
			
			contentHeight = this.heightsMap.get('content') as number;
			repeatingBackgroundHeight = this.heightsMap.get('testRepeatingBg') as number;
			
			// content is definitely less than or equal to background height total, but add an ABS to be sure
			this.numRepeat = Math.abs(totalBackgroundHeights - contentHeight) / repeatingBackgroundHeight;
			console.log(this.numRepeat);

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
