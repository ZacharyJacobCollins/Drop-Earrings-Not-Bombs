<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});
Route::get('/home', 'HomeController@index');


//Shop routes
Route::get('/shop', 'ShopController@shop');
Route::get('/shop/creator', 'ShopController@earringCreator');
Route::get('/shop/products', 'ShopController@products');

//Involve
Route::get('/involvement', 'InvolvementController@involvement');
Route::get('/crew', 'CrewController@crew');

//Checkout
Route::get('/checkout', 'CheckoutController@sendInvoice');

Auth::routes();
