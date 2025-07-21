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
  
    let query = '';
    
    if (titulo) {
      query = `q=${encodeURIComponent(titulo.trim())}`;
    }
    
    if (director) {
      query = query ? 
        `${query}+indirector:${encodeURIComponent(director)}` : 
        `q=indirector:${encodeURIComponent(director)}`;
    }
    
    if (idioma) {
      query += `&langRestrict=${encodeURIComponent(idioma)}`;
    }
  
    const options: HttpOptions = {
      url: `https://www.googleapis.com/movies/v1/volumes?${query}`,
      params: {}
    };

    console.log('URL con la solicitud:', options.url);
  
    return CapacitorHttp.get(options).then((response: HttpResponse) => {
      console.log('Respuesta a la solicitud:', response);
      const items = response.data.items || [];
      const result = items.map((item: any) => ({
        title: item.volumeInfo.title || 'Sin título',
        director: item.volumeInfo.directores ? item.volumeInfo.directores.join(', ') : 'Director desconocido',
        coverImage: this.processImageUrl(item.volumeInfo.imageLinks?.thumbnail),
      }));
      console.log('Resultado procesado:', result);
      return result;
    });
  }

  private processImageUrl(url: string | undefined): string {
    if (!url) {
      return 'assets/covers/default.jpg';
    }
    return url.replace('http://', 'https://');
  }
}