import { Directive, ElementRef, Renderer, OnInit, Input } from '@angular/core';
import { GeneralUtil } from './general';

// Directive decorator
@Directive({ selector: '[initials]' })
// Directive class
export class InitialsDirective implements OnInit {

    generalUtil = new GeneralUtil();
    @Input() name: string;

    constructor(public el: ElementRef, public renderer: Renderer) {
        console.log('Initials Directive');
    }

    ngOnInit(): void {
       console.log('Initials Directive');
       console.log(this.el);
       this.el.nativeElement.innerHTML = this.generalUtil.getNameInitials(this.name);
    //    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }
}