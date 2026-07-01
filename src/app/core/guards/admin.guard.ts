import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const payloadBase64 = token.split('.')[1];
    const datosDescifrados = JSON.parse(atob(payloadBase64));
    const rolUsuario = datosDescifrados.role || datosDescifrados.rol;

    if (rolUsuario === 'ADMIN') {
      return true;
    }

    router.navigate(['/']);
    return false;

  } catch (error) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};