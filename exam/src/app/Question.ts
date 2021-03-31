class Option {
  constructor(public op: string, public description: string) {}
}

export class Question {
  constructor(public id: string,
              public description: string,
              public options: Option[],
              public solution: string) { }
}
