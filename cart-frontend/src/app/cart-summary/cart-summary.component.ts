import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

interface Cart {
  userId: string;
  items: CartItem[];
}

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cart: Cart = { userId: 'test@example.com', items: [] };
  total: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.http.get<Cart>('http://localhost:3003/api/cart/test@example.com')
      .subscribe({
        next: (data) => {
          this.cart = data;
          this.calculateTotal();
        },
        error: (err) => console.error('Cart fetch error:', err)
      });
  }

  calculateTotal() {
    this.total = this.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }
}
