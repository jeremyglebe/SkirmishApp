import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GuiService {
  constructor(private loading: LoadingController) {}

  async showPromiseLoader<T>(
    promise: Promise<T>,
    message?: string
  ): Promise<T> {
    const loader = await this.loading.create({
      message: message || 'Please wait...',
    });
    await loader.present();
    try {
      return await promise;
    } finally {
      await loader.dismiss();
    }
  }
}
