import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tasks } from './Tasks';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public http: HttpClient) { }

  url = 'http://localhost:3000/tasks';

  storeTask(task: any): void{
    this.http.post(this.url, task).
    subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

  getTasks(): any {
    return this.http.get<Tasks[]>(this.url);
  }

}
