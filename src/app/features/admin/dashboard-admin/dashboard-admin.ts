import { Component } from '@angular/core';
import { Dashboard } from '../../../models/dashboard';
import { DashboardService } from '../../../services/dashboard.service';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  imports: [RouterModule,DecimalPipe],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss',
})
export class DashboardAdmin {
  dashboard!: Dashboard

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void{
    this.obtenerDashboard()
  }

  obtenerDashboard(): void{
    this.dashboardService.obtenerDashboard().subscribe({
      next: (data) =>{
        this.dashboard = data
      },
      error: (err) =>{
        console.error(err)
      }
    });
  }
}
