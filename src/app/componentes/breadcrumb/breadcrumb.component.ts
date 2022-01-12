import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/common/breadcrumb-item.interface';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbs: BreadcrumbItem[] = []
  hasHomeRoute!: false;

  constructor() { }

  ngOnInit() {
    if(!this.breadcrumbs){
        throw new Error('Input  "breadcrumb"  must be informed');
    }
  }

}
