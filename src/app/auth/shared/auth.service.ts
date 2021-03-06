import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/car/shared/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken() {
    let token = localStorage.getItem("User-token");
    return token == null ? '' : 'Bearer ' + token;
  }

  login(login: any) {
    return this.http.post<any>('http://localhost:8080/login', login);
    // return this.http.post<any>(environment.api + '/security/login', login);
  }

  register(user: any) {
    return this.http.post<any>('http://localhost:8080/register', user);
    // return this.http.post<any>(environment.api + '/security/register', user);
  }

  getUsers() {
    return this.http.get<any>('http://localhost:8080/users');
    // return this.http.get<any>(environment.api + '/security/users');
  }

  disableUser(id: number) {
    return this.http.get<any>('http://localhost:8080/disable/' + id);
    // return this.http.get<any>(environment.api + '/security/disable/' + id);
  }

  enableUser(id: number) {
    return this.http.get<any>('http://localhost:8080/enable/' + id);
    // return this.http.get<any>(environment.api + '/security/enable/' + id);
  }

  deleteUser(id: number) {
    return this.http.delete('http://localhost:8080/' + id);
    // return this.http.delete<any>(environment.api + '/security/' + id);
  }

  getUser(username: string) {
    return this.http.get<any>('http://localhost:8080/' + username);
    // return this.http.get<any>(environment.api + '/security/' + username);
  }

  disableEnableRent(id: number, privilege: boolean) {
    return this.http.get<any>('http://localhost:8080/rentPrivilege/' + privilege + "/" + id);
    // return this.http.get<any>(environment.api + '/security/rentPrivilege/' + privilege + "/" + id);
  }

  editUser(user: User) {
    /*return this.http.patch(environment.api + '/security/', {
      id: user.id,
      companyName: user.companyName,
      businessID: user.businessID,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address
    });
    */return this.http.patch('http://localhost:8080', {
                                                      id: user.id,
                                                      companyName: user.companyName,
                                                      businessID: user.businessID,
                                                      email: user.email,
                                                      firstName: user.firstName,
                                                      lastName: user.lastName,
                                                      address: user.address
                                                    });
  }

  getRegistrationRequests() {
    return this.http.get('http://localhost:8080/registration-requests' );
    // return this.http.get(environment.api + '/security/registration-requests');
  }

  approveRequest(id: number) {
    return this.http.post('http://localhost:8080/approve/' + id, {} );
    // return this.http.post(environment.api + '/security/approve/' + id, {});
  }

  refuseRequest(id: number) {
    return this.http.post('http://localhost:8080/refuse/' + id, {} );
    // return this.http.post(environment.api + '/security/refuse/' + id, {});
  }

}
