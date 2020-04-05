import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from 'src/app/models/product';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from '../category/category.service';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public Products: AngularFirestoreCollection<Product>; // db ref

  // local observable, save reads when user switch tabs instead readsing docs from firebase(server)
  public allProducts$ = new BehaviorSubject<Product[]>([]);

  constructor(private db: AngularFirestore, private cs: CategoryService) {
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
  * add product to server
  */
  public addProduct(product: Product) {
    return new Promise((resolve, reject) => {
      product.productSummary = product.productCategory.join(' ');
      product.productAddedAt = firebase.firestore.Timestamp.now();
      this.Products.doc(product.SKU).ref.get().then(() => {
        this.Products.doc(product.SKU)
          .set(product)
          .catch(error => {
            console.error(error);
            reject('Add product failed');
          });
        resolve(`doc ${product.SKU} added`);
        // product.productCategory.forEach(c => this.cs.addProductToCategory(c, product));
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${product.SKU} failed`);
      });
    });
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
