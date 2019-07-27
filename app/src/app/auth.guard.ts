import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(): boolean {
        const is_active = localStorage.getItem("access") ? true : false;
        if (!is_active) {
            this.router.navigate(["admin", "login"]);
            return is_active;
        }
        return is_active;
    }
}
