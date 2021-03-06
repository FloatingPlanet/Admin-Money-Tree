import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { FormGroup, FormBuilder, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons/coupons.service';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.scss']
})

export class CouponFormComponent implements OnInit {
  public loading = false;
  public couponForm: FormGroup;
  public couponName: string;
  public coupon: Coupon;
  public notEditable = false;
  public allCoupons: Coupon[];
  public editCoupon = false;
  private couponsObservable$: Subscription;
  options = [
    { value: '1', label: 'Yes', checked: true },
    { value: '0', label: 'No' },
  ];
  constructor(private formBuilder: FormBuilder, private cs: CouponsService, private route: ActivatedRoute, private router: Router) {

  }


  ngOnInit() {
    this.couponsObservable$ = this.cs.couponsObservable.subscribe((res) => {
      this.allCoupons = res;
      this.resetForm();
    });
    this.couponName = this.route.snapshot.paramMap.get('coupon');
    if (this.couponName) {
      this.fetchCoupon();
      this.editCoupon = true;

    }
  }

  public onSubmit(cf: FormGroup) {
    this.loading = true;
    this.cs.addCoupon(cf.value).then(result => {
      setTimeout(() => {
        this.loading = false;
        this.dismiss();
        this.resetForm();
      }, 500);

    }).catch(error => console.error(error));

  }

  private resetForm() {
    this.couponForm = this.formBuilder.group({
      coupon: [null, [Validators.required, this.existCoupon()]],
      discount: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      amount: [null, Validators.required],
      freeShipping: [null, Validators.required],
      minimumSpend: [null, Validators.required],
      addedAt: new Date(),
    });
  }

  private existCoupon(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const exist = this.allCoupons.some(x => x.coupon === control.value);
      if (!this.editCoupon) {
        return exist ? { existCoupon: { value: control.value } } : null;
      }
    };
  }

  private fetchCoupon() {
    this.cs.fetchCoupon(this.couponName).then(res => {
      this.notEditable = true;
      this.coupon = res as Coupon;
      this.couponForm.setValue({
        coupon: this.coupon.coupon,
        discount: this.coupon.discount,
        from: this.coupon.from,
        to: this.coupon.to,
        amount: this.coupon.amount,
        freeShipping: this.coupon.freeShipping,
        minimumSpend: this.coupon.minimumSpend,
        addedAt: this.coupon.addedAt,
      });
      console.log(this.couponForm.value);
    }).catch((error) => console.log(error));
  }

  public dismiss() {
    this.router.navigate(['promotions/coupons']).then(() => { })

  }

  ngOnDestroy(): void {
    if (this.couponsObservable$) {
      this.couponsObservable$.unsubscribe();
    }
  }
}
