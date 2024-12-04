import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  getArchivoTipoPorExtension(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase() || '';
    const tipos = {
      image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
      pdf: ['pdf'],
      document: ['doc', 'docx', 'txt', 'rtf'],
      spreadsheet: ['xls', 'xlsx', 'csv'],
      presentation: ['ppt', 'pptx'],
      video: ['mp4', 'avi', 'mov', 'wmv'],
      audio: ['mp3', 'wav', 'ogg'],
    };

    for (const [tipo, extensiones] of Object.entries(tipos)) {
      if (extensiones.includes(extension)) {
        return tipo;
      }
    }

    return 'unknown';
  }

  extraerNombreDeArchivo(url: string): string {
    return url.split('/').pop() || 'Archivo desconocido';
  }

  procesarArchivos(archivos: any[], obtenerUrlArchivo: (url: string) => string): { images: string[]; otherFiles: { nombre: string; url: string }[] } {
    const imagenes = archivos
      .filter((archivo) => this.getArchivoTipoPorExtension(archivo.archivo_url).startsWith('image'))
      .map((archivo) => obtenerUrlArchivo(archivo.archivo_url));

    const otrosArchivos = archivos
      .filter((archivo) => !this.getArchivoTipoPorExtension(archivo.archivo_url).startsWith('image'))
      .map((archivo) => ({
        nombre: archivo.nombre || this.extraerNombreDeArchivo(archivo.archivo_url),
        url: obtenerUrlArchivo(archivo.archivo_url),
      }));

    return { images: imagenes, otherFiles: otrosArchivos };
  }
}
