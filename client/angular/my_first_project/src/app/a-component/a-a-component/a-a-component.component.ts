import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-a-a-component',
  imports: [],
  templateUrl: './a-a-component.component.html',
  styleUrl: './a-a-component.component.scss'
})
export class AAComponentComponent implements OnChanges, OnInit{
  @Input() testInput?: string;
  @Output() testOutput = new EventEmitter<string>();

  constructor(){
    console.log(this.testInput);
  }

  ngOnChanges(){
    console.log(this.testInput);
  }

  ngOnInit() {
    console.log(this.testInput);
    this.testOutput.emit('testOutput string');
  }

}
