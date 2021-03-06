import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Coupon } from 'src/app/models/coupon';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private Coupons: AngularFirestoreCollection<Coupon>;
  // local observable, save reads when user switch tabs instead readsing docs from firebase(server)
  public allCoupons$ = new BehaviorSubject<Coupon[]>([]);

  constructor(private db: AngularFirestore) {
    this.Coupons = this.db.collection('Coupons', ref => ref.orderBy('addedAt'));
    this.Coupons.valueChanges().subscribe((docs) => {
      this.allCoupons$.next(docs);
    })

  }

  /*
  return coupons observable
   */
  get couponsObservable() {
    return this.allCoupons$.asObservable();
  }

  /*
  validate coupon @c with coupons in firebase
   */
  public validateCoupon(c: string) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(c).ref.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(`${c} does not exist`);
        }
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${c} failed`);
      });
    });
  }

  /*
  delete @coupon from firebase
   */
  public deleteCoupons(coupon: string) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(coupon).delete().then(() => {
        resolve(`remove Coupon ${coupon} succeed`);

      }).catch((error) => {
        console.log(error);
        reject(`fetch doc ${coupon} failed`);
      });
    });
  }

  /*
  add new @coupon in firebase
   */
  public addCoupon(coupon: Coupon) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(coupon.coupon).ref.get().then((doc) => {
        this.Coupons.doc(coupon.coupon)
          .set(coupon)
          .catch(error => {
            console.error(error);
            reject('Add coupon failed');
          });
        resolve(`doc ${coupon.coupon} added`);
      }).catch((error) => {
        console.error(error);
        reject(`fetch doc ${coupon.coupon} failed`);
      });
    });

  }

  /*
  retrieve a coupon using @couponName
   */
  public fetchCoupon(couponName: string) {
    return new Promise((resolve, reject) => {
      this.Coupons.doc(couponName).ref.get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject(`${couponName} does not exist`);
        }
      }).catch((error) => {
        console.log(error);
        reject(`fetch coupon ${couponName} failed`);
      });
    });
  }
}
