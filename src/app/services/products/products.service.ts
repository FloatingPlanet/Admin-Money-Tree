import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public Products: AngularFirestoreCollection<Product>; // db ref

  // local observable, save reads when user switch tabs instead readsing docs from firebase(server)
  public allProducts$ = new BehaviorSubject<Product[]>([]);

  constructor(private db: AngularFirestore) {
    this.Products = db.collection('Products', ref => ref.orderBy('productAddedAt'));
    this.Products.valueChanges().subscribe((docs) => {
      this.allProducts$.next(docs);
    })
  }


  /*
return products observable
 */
  get productsObservable() {
    return this.allProducts$.asObservable();
  }

  /*
  delete @sku from firebase
   */
  public deleteProducts(sku: string) {
    return new Promise((resolve, reject) => {
      this.Products.doc(sku).delete().then(() => {
        resolve(`remove SKU ${sku} succeed`);
      }).catch((error) => {
        console.error(error);
        reject(`remove SKU ${sku} failed`);
      });
    });
  }

  /*
retrieve @sku product from firebase
 */
  public fetchProduct(sku: string) {
    return new Promise((resolve, reject) => {
      this.Products.doc(sku).ref.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(`${sku} does not exist`);
        }
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${sku} failed`);
      });
    });
  }
}
