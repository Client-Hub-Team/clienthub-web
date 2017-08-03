import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';


/**
Class used to extend the CanActivate method. It's used to run a piece of code
before a route to check if it can be activated or not
*/
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private localStorage: LocalStorageService) {}


    /**
     * Checks if user has access_token in localStorage.
     */
    canActivate() {
        if (this.localStorage.get('access_token') !== undefined && this.localStorage.get('access_token') != null) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
