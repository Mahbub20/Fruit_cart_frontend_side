import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { OrderRequestDto } from 'src/app/models/orderReqestdto';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;

  cardValid: boolean = false; // Track card validation state

  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontWeight: '500', // Slightly bolder font for better readability
        fontFamily: 'Arial, sans-serif', // A more common and professional font
        fontSize: '16px', // Matches Bootstrap form input font size
        iconColor: '#4CAF50', // Green for a more vibrant icon
        color: '#212529', // Darker color for text (Bootstrap text color)
        backgroundColor: '#ffffff', // White background for better contrast
        '::placeholder': {
          color: '#6c757d', // Bootstrap placeholder text color
        },
      },
      invalid: {
        color: '#dc3545', // Red for invalid input
        iconColor: '#dc3545',
      },
    },
  };


  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paymentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    amount: ['', [Validators.required, this.amountValidator.bind(this)]],
  });

  orderRequest = {} as OrderRequestDto;
  cartItems = JSON.parse(localStorage.getItem('cart') || "[]");
  subTotal: number = 0;
  totalAmount = 0;

  constructor(private checkOutService: CheckoutService,
    private router: Router,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private stripeService: StripeService) { }

  ngOnInit(): void {
    this.getSubTotal();
  }

  onCardChange(event: any): void {
    this.cardValid = event.complete; // Check card field validity
  }

  handlePayment() {
    debugger;
    if (this.paymentForm.invalid || !this.cardValid) {
      return;
    }
    this.orderRequest.userName = this.paymentForm.get('name')?.value;
    this.orderRequest.userEmail = this.paymentForm.get('email')?.value;
    this.orderRequest.subTotal = this.getSubTotal();
    this.orderRequest.totalAmount = this.getTotalAmount();
    this.orderRequest.paymentAmount = this.paymentForm.get('amount')?.value;
    if (this.cartItems.length > 0) {
      this.orderRequest.orderItems = this.cartItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: (item.quantity * item.price),
        productId: item.id
      }));
      this.checkOutService.checkout(this.orderRequest)
        .pipe(
          switchMap((pi: any) =>
            this.stripeService.confirmCardPayment(pi.clientSecret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.paymentForm.get('name')?.value,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
            this.toastr.error(result.error.message, 'Error');
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              console.log("Payment successful");
              this.toastr.success('Payment for order is successful!', 'Success');
              localStorage.removeItem('cart');
              this.sharedService.loadCartFromStorage();
              this.router.navigateByUrl("/product-list");
            }
          }
        });
    }
    else {
      this.toastr.warning('Your cart is empty!', 'Warning');
    }
  }

  getSubTotal() {
    this.subTotal = this.cartItems.reduce((sum: any, item: any) => sum + (item.quantity * item.price), 0);
    return this.subTotal;
  }

  getTotalAmount() {
    this.totalAmount = (this.subTotal + 5 + this.subTotal * 0.1);
    return this.totalAmount;
  }

    // Custom Validator
    amountValidator(control: AbstractControl): ValidationErrors | null {
      const totalAmount = this.getTotalAmount();
      if (control.value < totalAmount) {
        return { amountTooLow: true }; // Validation error key
      }
      return null; // No error
    }

}
