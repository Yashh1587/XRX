
/**
 *  This directive is used to chnage the entered string into printer local language
 */
import { Directive,Input,ElementRef,Renderer2,OnChanges,OnInit  } from '@angular/core';
import { ResourcestringService} from '../services/resourcestring.service';
import { resourceString} from '../model/global';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[xasString]'
})
export class XasStringDirective {

  @Input('xasString') xasString : string;
  @Input('formatValues') formatValues: string;
  resourceString : resourceString[];

  constructor(
    private el : ElementRef, 
    private renderer : Renderer2,
    private sanitizer: DomSanitizer,
    private resourceStringService : ResourcestringService
    ) { 

  }

  ngOnInit() {
    // Load resource strings asynchronously
    this.resourceStringService.loadResources().then(() => {
      // Now that resource strings are loaded, replace the string
      this.replaceString();
    });
  }

  ngOnChanges() {
    this.replaceString();
  }


  private replaceString(): void {
    const string = this.resourceStringService.getValueByKey(this.xasString) || this.xasString;
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', string);
  }
  
}
