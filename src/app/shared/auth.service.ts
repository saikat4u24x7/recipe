import {Injectable} from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  //  api_url: string = 'http://localhost/rest_api/recipe/auth.php';
  api_url: string = 'http://cloud-server.site11.com/rest_api/recipe/auth.php';
  token: string;

  constructor(private http: Http) {
  }

  onSignup(formdata: FormData) {
    return this.http.post(this.api_url + "?action=signup", formdata).map(
      (resp: Response) => resp.json()
    )
  }

  onSignin(formdata: FormData) {
    return this.http.post(this.api_url + "?action=signin", formdata).map(
      (resp: Response) => {
        const response = resp.json();
        if (response.type == "success") {
          this.token = response.token;
          localStorage.setItem('token', response.token);
        }
        return response;
      }
    )
  }

  isAuthenticate() {
    return localStorage.getItem('token') != null;
  }

}
