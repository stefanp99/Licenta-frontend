import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpHeadersService {

    constructor() { }

    getHttpHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
            .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
            .set('Content-Type', 'application/json');
    }
}
