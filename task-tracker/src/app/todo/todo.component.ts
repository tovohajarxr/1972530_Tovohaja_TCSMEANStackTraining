import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Tasks } from '../Tasks';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  col = ['Id', 'Name', 'Task', 'Deadline'];
  index = ['id', 'name', 'task', 'deadline'];
  tasks: Tasks[] = [];

  ngOnInit(): void {
    this.todoService.getTasks().subscribe(
      (response: Tasks[]) => { this.tasks = response; },
      (error: any) => console.log(error)
    );
  }

}
