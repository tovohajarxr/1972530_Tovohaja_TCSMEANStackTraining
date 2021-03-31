import { Component, OnInit } from '@angular/core';
import { CheckerService } from '../checker.service';
import { Question } from '../Question';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor(public checker: CheckerService) { }

  questions: Question[] = [];
  answers = new Array(10);
  correct = 0;

  ngOnInit(): void {
    this.checker.getQuestions().subscribe(
      (response: Question[]) => { this.questions = response; },
      (error: any) => console.log(error)
    );
  }

  // type = 'correct' or 'wrong'
  color(id: number, sol: string, type: string): void {
    const questionHTML = document.getElementById(`${id}`) as HTMLElement;
    const options = questionHTML.getElementsByTagName('mat-radio-button');
    const idx = sol.charCodeAt(0) - 'a'.charCodeAt(0);
    options[idx].classList.add(type);
  }

  displayResults(): void {
    (document.getElementById('results') as HTMLElement).classList.remove('hidden');
  }

  checkAnswers(): void {
    console.log('==> checkAnswers() ~ questionnaire.component.ts');

    if (sessionStorage.getItem('submitted') === undefined
    ||  sessionStorage.getItem('submitted') === null) {

      sessionStorage.setItem('submitted', 'true');
      let count = 0;
      for (let i = 0; i < 10; i++) {
        const expected = this.questions[i].solution;
        const answered = this.answers[i];
        if (expected === answered) {
          count++;
          this.color(i + 1, expected, 'correct');
        } else {
          this.color(i + 1, expected, 'correct');
          if (answered !== undefined && answered !== expected) {
            this.color(i + 1, answered, 'wrong');
          }
        }
      }
      this.correct = count;
      this.displayResults();
    } else {
      alert(`Already Submitted! \nLast attempt: ${this.correct}/10`);
    }
  }

  // update answers
  updateAnswer(event: any): void {
    const qId = event.source._elementRef.nativeElement.parentElement.id;
    const ans = event.value;
    this.answers[qId - 1] = ans;
  }
}
