import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getData(url: string, type): Observable<ArrayBuffer> {
    return this.http.get(url, { responseType: type });
  }

  xml2json(srcDOM): any {
    const children = [...srcDOM.children];
    const jsonResult = {};

    if (!children.length) {
      return srcDOM.innerHTML;
    }

    for (const child of children) {
      const childIsArray =
        children.filter((eachChild) => eachChild.nodeName === child.nodeName)
          .length > 1;

      if (childIsArray) {
        if (jsonResult[child.nodeName] === undefined) {
          jsonResult[child.nodeName] = [this.xml2json(child)];
        } else {
          jsonResult[child.nodeName].push(this.xml2json(child));
        }
      } else {
        jsonResult[child.nodeName] = this.xml2json(child);
      }
    }

    return jsonResult;
  }

  parsexml(res: any): any {
    const parser = new DOMParser();
    const srcDOM = parser.parseFromString(res, 'application/xml');

    return this.xml2json(srcDOM);
  }
}
