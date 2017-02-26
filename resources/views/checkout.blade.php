@extends('layouts.app')

@section('content')
  <div class="wrap cf">
    <h1 class="projTitle">Shopping Cart</h1>
    <div class="heading cf">
      <h1>My Cart</h1>
      <a href="#" class="continue">Continue Shopping</a>
    </div>
    <div class="cart">
     <ul class="cartWrap" v-for="product in items">
      <li class="items odd">

        <div class="infoWrap"> 
          <div class="cartSection">
            <img :src="product.imageURL" alt="" class="itemImg" />
            <p class="itemNumber">@{{ product.title }}</p>
            <h3>@{{ product.description }}</h3>

            <p> <input type="text"  class="qty" v-model="product.quantity">@{{ product.quantity }}</input> x $@{{ product.price }}</p>

            <p class="stockStatus"> In Stock</p>
          </div>  


          <div class="prodTotal cartSection">
            <p>$@{{ product.price * product.quantity }}</p>
          </div>
          <div class="cartSection removeWrap">
           <a href="#" class="remove">x</a>
         </div>
       </div>
     </li>

   </ul>

    <div class="subtotal cf">
      <ul>
      <li class="totalRow"><span class="label">Subtotal</span><span class="value">$@{{ subTotal }}</span></li>

        <li class="totalRow"><span class="label">Shipping</span><span class="value">$@{{ shipping }}</span></li>

        <li class="totalRow"><span class="label">Tax</span><span class="value">$@{{ tax }}</span></li>
        <li class="totalRow final"><span class="label">Total</span><span class="value">@{{ total }}</span></li>
        <li class="totalRow"><a href="#" class="btn continue">Checkout</a></li>
      </ul>
    </div>
  </div>
</div>

@endsection