import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Folder } from '../../models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  headers = new HttpHeaders({ // TODO: Move somewhere higher
    authorization: environment.clickupToken,
  });

  options = {
    headers: this.headers,
  };

  folders$: Observable<Folder[]>;

  constructor(private http: HttpClient) {

  }

  getFolderName(folderId): Observable<string> {
    return this.folders$
      .pipe(map(folders => folders.find(folder => folder.id === folderId).name));
  }

  getFolders(): Observable<Folder[]> {
    this.folders$ = this.http.get<FoldersResponse>(`/api/v2/space/${environment.clickupSpaceId}/folder`, this.options)
      .pipe(map(response => response.folders.map(folder => new Folder(folder.id, folder.name))));

    return this.folders$;
  }
}

interface FoldersResponse {
  folders: Folder[];
}