import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-carousel-dialog',
  templateUrl: './image-carousel-dialog.component.html',
  styleUrl: './image-carousel-dialog.component.scss'
})
export class ImageCarouselDialogComponent {
  images: string[];
  otherFiles: { nombre: string; url: string }[];
  currentIndex: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: string[]; otherFiles: any[] }) {
    this.images = data.images || [];
    this.otherFiles = data.otherFiles || [];
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}