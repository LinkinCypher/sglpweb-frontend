import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.page.html',
  styleUrls: ['./tasks-edit.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TasksEditPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
