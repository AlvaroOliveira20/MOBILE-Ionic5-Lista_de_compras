import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading: any;
  produto: string;

  constructor(
    private loadingCtrl: LoadingController,
    private afs: AngularFirestore
  ) {}

  async button() {
    let produtos = [];
    await this.presentLoading();
    try {
      const usuario = (
        await this.afs.firestore
          .collection('Usuarios')
          .doc('listaDeCompras')
          .get()
      ).data();
      for (let i in usuario.NomeProduto) {
        produtos.push(usuario.NomeProduto[i]);
      }
      produtos.push(this.produto);
      await this.afs
        .collection('Usuarios')
        .doc('listaDeCompras')
        .update({ NomeProduto: produtos });
      alert('Cadastrado!');
    } catch (e) {
      alert('erro: ' + e);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });

    return this.loading.present();
  }
}
