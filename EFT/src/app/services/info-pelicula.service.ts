import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class InfoPeliculaService {
  constructor() { }

  getPeliculas(titulo: string, director?: string, idioma?: string) {
    if (!titulo && !director) {
      return Promise.resolve([]); 
    }

    const OMDB_API_KEY = '1f7227a2';
    let url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;
    if (titulo) {
      url += `&s=${encodeURIComponent(titulo.trim())}`;
    }
    if (idioma) {
      url += `&language=${encodeURIComponent(idioma)}`;
    }

    const options: HttpOptions = {
      url,
      params: {}
    };

    return CapacitorHttp.get(options).then((response: HttpResponse) => {
      const items = response.data.Search || [];
      const result = items.map((item: any) => ({
        title: item.Title || 'Sin título',
        director: '',
        coverImage: this.processImageUrl(item.Poster),
      }));
      return result;
    });
  }

  private processImageUrl(url: string | undefined): string {
    if (!url || url === 'N/A') {
      return 'assets/covers/default.jpg';
    }
    return url;
  }
}