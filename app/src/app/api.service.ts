import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../environments/environment";

@Injectable({ providedIn: "root" })
export class ApiService {
    apiUrl = environment.apiUrl;

    constructor(private client: HttpClient) {}

    getAuthHeader() {
        return new HttpHeaders({
            Authorization: "Bearer " + localStorage.getItem("access"),
        });
    }

    get(end_point: string) {
        return this.client.get(this.apiUrl + end_point);
    }

    post(end_point: string, data: any) {
        console.log(end_point, this.apiUrl);
        return this.client.post(this.apiUrl + end_point, data);
    }

    put(end_point: string, data: any) {
        return this.client.put(this.apiUrl + end_point, data);
    }

    getx(end_point: string) {
        return this.client.get(this.apiUrl + end_point, {
            headers: this.getAuthHeader(),
        });
    }
}
