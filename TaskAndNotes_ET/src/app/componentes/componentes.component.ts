import { Component, input, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss'],
})
export class ComponentesComponent  implements OnInit {

  constructor() { }
  @Input() titulo:String = "";

  ngOnInit() {}

}
