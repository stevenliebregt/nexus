import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Folder } from '../models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  headers = new HttpHeaders({
    authorization: environment.clickupToken,
    'access-control-allow-origin': '*'
  });

  options = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {

  }

  getFolders(): Observable<Folder[]> {
    return this.http.get<FoldersResponse>(`/api/v2/space/${environment.clickupSpaceId}/folder`, this.options)
      .pipe(map(response => response.folders.map(folder => new Folder(folder.id, folder.name))));
  }
}

interface FoldersResponse {
  folders: Folder[];
}
