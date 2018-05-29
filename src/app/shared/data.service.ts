import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class DataSercice {
  api_url: string = 'http://localhost/rest_api/recipe/api.php';



  constructor(private http: Http) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'

    };

    return new Headers(headersConfig);
  }

  addRecipe(formdata: FormData) {
    return this.http.post(
      this.api_url + '?action=add',
      formdata,

    )
      .map((res: Response) => res.json());

  }
  getAllRecipe() {
    return this.http.get(this.api_url + '?action=getall').map(
      (res: Response) => res.json()
    );

  }

  getRecipeById(id: number) {
    return this.http.get(this.api_url + '?action=getrecipe&id=' + id).map(
      (res: Response) => res.json()
    );
  }

  onUpdateRecipe(id:number, formData:FormData){
    return this.http.post(
      this.api_url + '?action=update&id='+id,
      formData,
    )
      .map((res: Response) => res.json());
  }

}
