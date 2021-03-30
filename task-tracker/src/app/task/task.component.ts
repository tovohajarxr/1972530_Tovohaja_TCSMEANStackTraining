import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  ngOnInit(): void { }

  storeTask(taskRef: any): void{
    console.log(taskRef);
    this.todoService.storeTask(taskRef);
  }

}
