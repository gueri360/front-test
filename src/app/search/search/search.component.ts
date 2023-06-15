import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {SearchService} from "../../services/search.service";
import {ErrorComponent} from "../../error/error/error.component";
import {UserModel} from "../../models/user.model";
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent  {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chart: Chart;
  username: string = '';
  users: any[] = [];
  showError = false;
  errorMessage = "";

  constructor(
    public router: Router,
    private searchService: SearchService) {}

  search(): void {
    if (this.username.length >= 3 ) {
      if(this.username.toLowerCase() !== 'doublevpartners') {
        this.searchService.searchUsers(this.username).subscribe(
          {
            next: (users: UserModel[]) => {
              this.updateUser(users);
            },
            error: (error) => {
              // Manejar el error en caso de que ocurra
              console.error('Error al buscar usuarios:', error);
              this.showError = true;
            }
          }
        );

      }
      else {
        this.errorMessage = "palabra prohibida"
        this.showError = true;
      }
    }
    else {
      this.errorMessage = "Deben ser 3 o mas caracteres"
      this.showError = true;
    }
  }

  updateUser(user:any) {
    this.users = user.items.slice(0, 10);
    this.showError = false;
    this.users.forEach(user => {
      this.searchService.getUserFollowers(user.login).subscribe(
        (followers: any[]) => {
          // Actualizar los seguidores del usuario
          this.updateFollowers(user, followers);
        },
        (error) => {
          // Manejar el error en caso de que ocurra
          console.error('Error al obtener los seguidores:', error);
        }
      );
    });
  }

  updateFollowers(user: any, follower: any[]) {
    const index = this.users.findIndex(u => u.login === user.login);

    if (index !== -1) {
      this.users[index].followers = follower.length;
      this.renderChart();
    }
  }

  error() {
    this.showError = true;
  }

  navigateToProfile(username: string): void {
    this.router.navigate(['/profile', username]);
  }

  renderChart() {
    const followersData = this.users.slice(0, 10).map(user => user.followers);
    const labels = this.users.slice(0, 10).map(user => user.login);

    if (this.chart) {
      this.chart.destroy(); // Destruye el gráfico existente si ya está presente
    }

    const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if(ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Seguidores',
              data: followersData,
              backgroundColor: 'rgba(75, 192, 192, 0.8)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    }


  }

}
