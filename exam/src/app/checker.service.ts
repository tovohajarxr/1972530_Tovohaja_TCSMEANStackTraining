import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './Question';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {
  url = 'http://localhost:3000/questions';

  constructor(public http: HttpClient) { }

  getQuestions(): any {
    return this.http.get<Question[]>(this.url);
  }
}
