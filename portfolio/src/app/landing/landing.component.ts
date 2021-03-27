import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var M: any; /* Materialize tabs */

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  techSkillsHTML = '';
  softSkillsHTML = '';
  xpHTML = '';
  refHTML = '';
  username = '';

  constructor(public router: Router) { }

  ngOnInit(): void { /* Materialize tabs */
    const elem = document.querySelector('.tabs');
    const options = {};
    M.Tabs.init(elem, options);
    this.initOverviewPage();
    this.displayWelcome();
    this.displaySkills();
    this.displayXPs();
    this.displayReferences();
  }


/* ===================== U T I L I T Y ====================================== */
checkForm(lst: any[]): boolean {
  for (let i = 0, length = lst.length; i < length; i++) {
    if (lst[i] === '' || lst[i] === 0 || lst[i] == null || lst[i] === undefined) {
      return false;
    }
  }
  return true;
}

initOverviewPage(): void {
  // Skills
  const skills: any = [
    { skillType: 'Tech Skill', skillName: 'Gum', xp: 97 },
    { skillType: 'Tech Skill', skillName: 'A++', xp: 99 },
    { skillType: 'Tech Skill', skillName: 'Dice', xp: 92 },
    { skillType: 'Tech Skill', skillName: 'Pier', xp: 97 },
    { skillType: 'Soft Skill', skillName: 'Friendship', xp: 97 },
    { skillType: 'Soft Skill', skillName: 'Dancing', xp: 91 },
    { skillType: 'Soft Skill', skillName: 'Comedy', xp: 93 },
    { skillType: 'Soft Skill', skillName: 'Speaking', xp: 99 }
  ];
  if (sessionStorage.getItem('skills') === null || sessionStorage.getItem('skills') === undefined) {
    sessionStorage.setItem('skills', JSON.stringify(skills));
  }

  // Experience
  const experience: any = [
    { company: 'Google', title: 'ML analyst', timeFrame: 'Summer 1979',
      description:
      `Used ML to identify optimal bird migration cycles!`
    },
    { company: 'Facebook', title: 'Janitor', timeFrame: 'Fall 1979',
      description:
      `Mopped those floors hard after all those birds migrated over to HQ.`
    },
    { company: 'Ali Baba', title: 'Hacker', timeFrame: 'Summer 2001',
      description:
      `Hacked into amazon web servers to figure out what items Ali Baba should sell.`
    },
    { company: 'Panda Express', title: 'Lead Chef', timeFrame: '2002 - 2005',
      description:
      `Made some delicious meals for humbled clients.`
    },
    { company: 'Apple', title: 'Assistant Designer', timeFrame: '2007 - 2015',
      description:
      `Assisted in the redesign of three generations of iphones.
      Ensured customers were happy getting exactly the same phone each new release :)`
    },
    { company: 'Allamanx', title: 'CEO', timeFrame: '2017 - Present',
    description:
    `I run a custom apparel store. Helping those willing to look fly-er than ever.`
    },
  ];
  if (sessionStorage.getItem('experience') === null || sessionStorage.getItem('experience') === undefined) {
    sessionStorage.setItem('experience', JSON.stringify(experience));
  }

  // References
  const references: any = [
    { firstName: 'Benjamin', lastName: 'Butter', company: 'Google', relationship: 'Manager', phone: '456-223-1978',
      description:
      `Butter really loves birds and my project at Google!`
    },
    { firstName: 'Brennan', lastName: 'Gunnar', company: 'Facebook', relationship: 'Boss', phone: '564-273-2431',
      description:
      `Brennan is a cool guy. He liked how much energy I had on the job!`
    },
    { firstName: 'Hung', lastName: 'Ho', company: 'Ali Baba', relationship: 'Co-worker', phone: '987-112-4665',
      description:
      `Did a hell of a job hacking for Ali baba. Hung is witness of my great work.`
    },
    { firstName: 'Gammano', lastName: 'Bolos', company: 'Panda Express', relationship: 'Supervisor', phone: '301-203-1979',
      description:
      `Under Gammano's supervision, I developed Michelin level recipes for Panda Express!`
    },
    { firstName: 'Julia', lastName: 'Flanxston', company: 'Allamanx', relationship: 'Mom', phone: '442-132-1221',
      description:
      `Mom knows best. And she knows I run my company with utmost excellence.`
    },
    { firstName: 'Lavamanata', lastName: 'Hakuna', company: 'Apple', relationship: 'co-worker', phone: '224-108-7756',
      description:
      `Lavamanata knows I got surfing skills. On the web and at the beach.`
    },
    { firstName: 'Feschter', lastName: 'Szkizstchen', company: 'Allamanx', relationship: 'Co-owner', phone: '456-223-1371',
      description:
      `My business partner has an amazing time working with me. Just ask her!`
    },
    { firstName: 'Lionel', lastName: 'Richie', company: 'Panda Express', relationship: 'Happy customer', phone: '112-2003-1138',
      description:
      `I made Lionel's day when I made the escargot farci he wanted for his birthday.`
    },
  ];
  if (sessionStorage.getItem('reference') === null || sessionStorage.getItem('reference') === undefined) {
    sessionStorage.setItem('reference', JSON.stringify(references));
  }
}

/* ===================== S K I L L ========================================== */
  addSkill(): void {
    console.log('==> addSkill()');
    let skillType = '';
    let skillName = '';
    let xp = 0;

    // radio
    const radios = document.getElementsByName('group');
    for (let i = 0, length = radios.length; i < length; i++) {
      const input = radios[i] as HTMLInputElement;
      if (input.checked) {
        skillType = input.value as string;
      }
    }

    // skill name
    const skillNameEle = document.getElementById('skill-name') as HTMLInputElement;
    skillName = skillNameEle.value as string;

    // xp
    const xpEle = document.getElementById('xp') as HTMLInputElement;
    xp = +xpEle.value;

    // check for empty input & store ins session storage
    if (this.checkForm([skillType, skillName, xp])) {
      if (sessionStorage.getItem('skills') === null || sessionStorage.getItem('skills') === undefined) {
        sessionStorage.setItem('skills', '[]');
      }
      const skills = JSON.parse(sessionStorage.getItem('skills') || '{}');
      const data = {skillType, skillName, xp};
      console.log(data);
      skills.push(data); // assume user doesn't push duplicate skills
      sessionStorage.setItem('skills', JSON.stringify(skills));
      (document.getElementById('skill-form') as HTMLFormElement).reset(); // clear form on submission.
    } else {
      alert('Please fill all fields!');
    }
    this.displaySkills();
  }

/* ===================== E X P E R I E N C E ================================ */
  addExperience(): void {
    console.log('==> addExperience()');
    let company = '';
    let title = '';
    let timeFrame = '';
    let description = '';

    // company
    const companyEle = document.getElementById('company') as HTMLInputElement;
    company = companyEle.value as string;

    // title
    const titleEle = document.getElementById('title') as HTMLInputElement;
    title = titleEle.value as string;

    // time frame
    const timeFrameEle = document.getElementById('time-frame') as HTMLInputElement;
    timeFrame = timeFrameEle.value as string;

    // description
    const descriptionEle = document.getElementById('description') as HTMLInputElement;
    description = descriptionEle.value as string;

    if (this.checkForm([company, title, timeFrame, description])) {
      if (sessionStorage.getItem('experience') === null || sessionStorage.getItem('experience') === undefined) {
        sessionStorage.setItem('experience', '[]');
      }
      const skills = JSON.parse(sessionStorage.getItem('experience') || '{}');
      const data = {company, title, timeFrame, description};
      console.log(data);
      skills.push(data); // assume user doesn't push duplicate experience items
      sessionStorage.setItem('experience', JSON.stringify(skills));
      (document.getElementById('experience-form') as HTMLFormElement).reset(); // clear form on submission.
    } else {
      alert('Please fill all fields!');
    }
    this.displayXPs();
  }

  /* ===================== R E F E R E N C E ================================ */
  addReference(): void {
    console.log('==> addReference()');
    let firstName = '';
    let lastName = '';
    let company = '';
    let relationship = '';
    let phone = '';
    let description = '';

    // first name
    const firstNameEle = document.getElementById('first-name-reference') as HTMLInputElement;
    firstName = firstNameEle.value as string;

    // last name
    const lastNameEle = document.getElementById('last-name-reference') as HTMLInputElement;
    lastName = lastNameEle.value as string;

    // company
    const companyEle = document.getElementById('company-reference') as HTMLInputElement;
    company = companyEle.value as string;

    // relationship
    const relationshipEle = document.getElementById('relationship-reference') as HTMLInputElement;
    relationship = relationshipEle.value as string;

    // relationship
    const phoneEle = document.getElementById('phone-reference') as HTMLInputElement;
    phone = phoneEle.value as string;

    // description
    const descriptionEle = document.getElementById('description-reference') as HTMLInputElement;
    description = descriptionEle.value as string;

    if (this.checkForm([firstName, lastName, company, relationship, phone, description])) {
      if (sessionStorage.getItem('reference') === null || sessionStorage.getItem('reference') === undefined) {
        sessionStorage.setItem('reference', '[]');
      }
      const skills = JSON.parse(sessionStorage.getItem('reference') || '{}');
      // assume user doesn't push duplicate reference items
      const data = {firstName, lastName, company, relationship, phone, description};
      console.log(data);
      skills.push(data);
      sessionStorage.setItem('reference', JSON.stringify(skills));
      (document.getElementById('reference-form') as HTMLFormElement).reset(); // clear form on submission.
    } else {
      alert('Please fill all fields!');
    }
    this.displayReferences();
  }

/* ======================= D I S P L A Y S ================================== */

  /* --------------------- D I S P L A Y - S K I L L ------------------------ */
  displaySkill(skill: any): string {
    const data = `
      <li class="collection-item">
      <div class="row">
        <div class="col s6 m4 l4">
          <div class="title"> ${skill.skillName} </div>
        </div>
        <div class="col s6 m8 l8">
          <i class='fas fa-star'> ${skill.xp}% </i>
        </div>
      </div>
    </li>
    `;
    return data;
  }

  displaySkills(): void {
    let techData = ``;
    let softData = ``;
    console.log(`==> displaySkills()`);
    if (sessionStorage.getItem('skills') !== null && sessionStorage.getItem('skills') !== undefined) {
      const skills = JSON.parse(sessionStorage.getItem('skills') || '{}');
      skills.forEach((skill: any) => {
        if (skill.skillType === 'Tech Skill') {
          techData = techData.concat(this.displaySkill(skill));
        } else {
          softData = softData.concat(this.displaySkill(skill));
        }
      });
    }
    this.softSkillsHTML = softData;
    this.techSkillsHTML = techData;
  }

  /* --------------------- D I S P L A Y - X P ------------------------------ */
  displayXP(experience: any): string {
    const data = `
    <div class="col s12 m12 l6">
      <ul class="collection collection-resume z-depth-1">
        <li class="collection-item avatar">
          <i class="fas fa-briefcase circle green darken-2"></i>
          <span class="ultra-small green-text darken-2 right">${experience.timeFrame}</span>
          <div class="title">${experience.company}</div>
          <span class="titular"><i>${experience.title}</i></span>
        </li>
        <li class="collection-item">
          <p>
            ${experience.description}
          </p>
        </li>
      </ul>
    </div>
    `;
    return data;
  }

  displayXPs(): void {
    let xpData = ``;
    console.log(`==> displayXPs()`);
    if (sessionStorage.getItem('experience') !== null && sessionStorage.getItem('experience') !== undefined) {
      const skills = JSON.parse(sessionStorage.getItem('experience') || '{}');
      skills.forEach((skill: any) => {
        xpData = xpData.concat(this.displayXP(skill));
      });
    }
    this.xpHTML = xpData;
  }

  /* --------------------- D I S P L A Y - R E F----------------------------- */
  displayReference(reference: any): string {
    const data = `
    <div class="col s12 m12 l4">
    <ul class="collection collection-resume z-depth-1">
      <li class="collection-item avatar">
        <i class="fas fa-phone circle blue darken-2"></i>
        <div class="title">${reference.firstName} ${reference.lastName}</div>
        <span><b>${reference.company}</b> - ${reference.relationship}</span> <br/>
        <span>${reference.phone}</span>
      </li>
      <li class="collection-item">
        <p>
          ${reference.description}
        </p>
      </li>
    </ul>
  </div>
    `;
    return data;
  }

  displayReferences(): void {
    let refData = ``;
    console.log(`==> displayReferences()`);
    if (sessionStorage.getItem('reference') !== null && sessionStorage.getItem('reference') !== undefined) {
      const references = JSON.parse(sessionStorage.getItem('reference') || '{}');
      references.forEach((ref: any) => {
        refData = refData.concat(this.displayReference(ref));
      });
    }
    this.refHTML = refData;
  }

  /* --------------------- D I S P L A Y - W E L C O M E -------------------- */
  displayWelcome(): void {
    const credentials = JSON.parse(sessionStorage.getItem('credentials') || '{}');
    this.username = credentials.username;
  }

  /* ======================= A U T H E N T I C A T I O N ==================== */

  /* --------------------- L O G O U T -------------------------------------- */
  logout(): void {
    sessionStorage.removeItem('login');
    this.router.navigate(['login']);
  }

}
