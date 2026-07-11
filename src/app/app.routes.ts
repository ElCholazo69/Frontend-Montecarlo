import { Routes } from '@angular/router';

import { Inicio } from './features/pages/inicio/inicio';

import { Login } from './features/auth/login/login';

import { CrearConsulta } from './features/consultas/crear-consulta/crear-consulta';
import { Registro } from './features/auth/registro/registro';
import { ListaCanchas } from './features/canchas/lista-canchas/lista-canchas';
import { DetalleCancha } from './features/canchas/detalle-cancha/detalle-cancha';

import { Canchas } from './features/admin/canchas/canchas';
import { Reservas } from './features/admin/reservas/reservas';
import { Pagos } from './features/admin/pagos/pagos';
import { Usuarios } from './features/admin/usuarios/usuarios';
import { Consultas } from './features/admin/consultas/consultas';
import { FormularioPago } from './features/pagos/formulario-pago/formulario-pago';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { MisReservas } from './features/reservas/mis-reservas/mis-reservas';
import { MisConsultas } from './features/consultas/mis-consultas/mis-consultas';
import { MisPagos } from './features/pagos/mis-pagos/mis-pagos';
import { DashboardAdmin } from './features/admin/dashboard-admin/dashboard-admin';
import { ConfiguracionAdmin } from './features/admin/configuracion-admin/configuracion-admin';

export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'registro',
    component: Registro
  },

  {
    path: 'canchas',
    component: ListaCanchas
  },

  {
    path: 'Dcanchas',
    canActivate: [authGuard],
    component: DetalleCancha
  },

  {
    path: 'consultas',
    canActivate: [authGuard],
    component: CrearConsulta
  },

  {
    path: 'mis-consultas',
    canActivate: [authGuard],
    component: MisConsultas
  },

  {
    path: 'mis-pagos',
    canActivate: [authGuard],
    component: MisPagos
  },

  {
    path: 'pago',
    canActivate: [authGuard],
    component: FormularioPago
  },

  {
    path: 'reservas',
    canActivate: [authGuard],
    component: MisReservas
  },

  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: DashboardAdmin
      },

      {
        path: 'canchas',
        component: Canchas
      },

      {
        path: 'reservas',
        component: Reservas
      },

      {
        path: 'pagos',
        component: Pagos
      },

      {
        path: 'usuarios',
        component: Usuarios
      },

      {
        path: 'consultas',
        component: Consultas
      },

      {
        path: 'configuracion',
        component: ConfiguracionAdmin
      }

    ]
  },

  {
    path: '**',
    redirectTo: ''
  } 
];