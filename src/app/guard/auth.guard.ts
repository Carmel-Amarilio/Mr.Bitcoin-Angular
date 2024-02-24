import { CanActivateFn, Router } from '@angular/router';
import { UserSericeService } from '../services/user-serice.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserSericeService);
  const router = inject(Router);
  return userService.loggedInUser$.pipe(
    map((user) => !!user || router.createUrlTree(['/']))
  );
};
