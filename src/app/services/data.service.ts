import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private skillsUrl = 'assets/data/skills.json';
  private projectsUrl = 'assets/data/projects.json';

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.skillsUrl);
  }

  getProjects(): Observable<any> {
    return this.http.get(this.projectsUrl);
  }
}
