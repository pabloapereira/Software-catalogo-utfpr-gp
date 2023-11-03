import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input({ required: true }) requester!: string;
  @Input({ required: true }) os!: string;
  @Input({ required: true }) version!: string;
  @Input({ required: true }) license!: string;
  @Input({ required: true }) language?: string;
  @Input({ required: true }) date!: Date;
  
  convertedDate : Date = new Date();
  
  ngOnInit(): void {
    this.convertedDate = new Date(this.date!);
    };
}
