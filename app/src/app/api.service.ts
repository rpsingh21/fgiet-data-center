import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment'

@Injectable({providedIn: 'root'})
export class ApiService {
    apiUrl = environment.apiUrl;

    constructor(private client: HttpClient) {}

    get(end_point) {
        return this.client.get(this.apiUrl + end_point);
    }

    post(end_point, data) {
        return this.client.post(this.apiUrl + end_point, data);
    }

    put(end_point, data) {
        return this.client.put(this.apiUrl + end_point, data);
    }
}
