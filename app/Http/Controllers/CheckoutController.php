<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class CheckoutController extends Controller
{
   	//Send invoice to customer after payment 
	public function sendInvoice() {
		$data = ['name' => "Learning Laravel"];

		Mail::send('crew', $data, function($message)
		{

        	$message->from('yourEmail@domain.com', 'Learning Laravel');
			$message->to('zacharyjacobcollins@gmail.com', 'Jane Doe')->subject('This is a demo!');
		});

		return 'success';
	
	}
}
