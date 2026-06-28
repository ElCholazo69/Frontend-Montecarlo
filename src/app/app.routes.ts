import { Routes } from '@angular/router';

import { Inicio } from './features/pages/inicio/inicio';
import { SobreNosotros } from './features/pages/sobre-nosotros/sobre-nosotros';

import { Login } from './features/auth/login/login';

import { CrearConsulta } from './features/consultas/crear-consulta/crear-consulta';
import { Registro } from './features/auth/registro/registro';
import { ListaCanchas } from './features/canchas/lista-canchas/lista-canchas';
import { DetalleCancha } from './features/canchas/detalle-cancha/detalle-cancha';
export const routes: Routes = [
    {
        path: '',
        component: Inicio
    },

    {
        path: 'sobre-nosotros',
        component: SobreNosotros
    },

    {
        path: 'login',
        component: Login
    },

    {
        path: 'consultas',
        component: CrearConsulta
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
        component: DetalleCancha
    },

    {
        path: '**',
        redirectTo: ''
    } 
];