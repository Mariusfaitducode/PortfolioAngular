import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  experiences: any[] = [
    {
      title: 'Rentrée UTBM',
      description: "Après un bac S mention bien, j'ai intégré l'Université Technologique de Belfort-Montbéliard.",
      type : 'formation',
      startDate: '2020-09-01',
      // endDate: '2021-12-31'
    },
    {
      title: 'Rentrée bloc info',
      description: "Après 2 années de tronc commun généraliste, j'ai intégré la branche informatique de l'UTBM.",
      type : 'formation',
      startDate: '2022-09-01',
      // endDate: '2019-12-31'
    },
    {
      title: 'Service civique au Crous',
      description: "J'ai réalisé pendant 6 mois un service civique en parallèle de mes études."+ 
                  " Mes missions consistait à organiser des événements et animer la vie étudiante au sein du Crous.",
      type : 'experience',
      startDate: '2022-09-02',
      endDate: '2023-03-31'
    },
    {
      title: 'Stage assistant ingénieur Sonceboz',
      description: "J'ai réalisé mon stage de quatrième année dans l'entreprise Sonceboz SA. J'y ai découvert le vaste monde de l'informatique industrielle et j'ai pu perfectionner mes compétences, notamment en développement web. ",
      type : 'experience',
      startDate: '2023-08-15',
      endDate: '2024-02-15'
    },
    {
      title: 'Auto-entrepreneur : MarsCode',
      description: "Je suis devenu auto-entrepreneur en vente de services informatique. L'occasion pour moi d'appliquer ma passion pour la programmation dans des projets concrets",
      type : 'experience',
      startDate: '2024-03-01',
    },
    {
      title: 'Semestre bloc Monde Virtuel',
      description: "J'ai choisi comme premier bloc métier la spécialisation Monde Virtuel. L'occasion de découvrir le monde de la réalité virtuelle et augmentée ainsi que de la 3d.",
      type : 'formation',
      startDate: '2024-03-01',
      endDate: '2024-06-31'
    },
    {
      title: 'Semestre bloc IA à ULiège',
      description: "Je partirai en Erasmus à l'Université de Liège pour suivre un semestre de spécialisation en Intelligence Artificielle.",
      type : 'formation',
      startDate: '2024-09-01',
      endDate: '2025-01-31'

    },
    {
      title: "Stage de fin d'études",
      description: "Ce stage sera l'aboutissement de 5 années d'études en école d'ingénieurs à l'UTBM. Il me permettra encore une fois de mettre mes compétences au service d'une entreprise et d'une équipe.",
      type : 'experience',
      startDate: '2025-02-01',
    },
    {
      title: "Diplôme d'ingénieur",
      description: "Je devrais si tout se passe bien obtenir mon diplôme d'ingénieur en informatique à l'UTBM.",
      type : 'formation',
      startDate: '2025-06-30',
    }
    // Ajoutez d'autres expériences ici
  ];


  ngOnInit(){
    this.experiences.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    this.experiences.forEach((experience) => {
      experience.startDate = new Date(experience.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
      if (experience.endDate) {
        experience.endDate = new Date(experience.endDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
      } else {
        experience.endDate = 'Aujourd\'hui';
      }
    });
  }
}