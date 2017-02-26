$(function() {
		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-top-right",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut" };

		$(".add-to-cart").on('click', function(e) {
			$.ajax({
				type: 'post',
				url: 'http://45.79.70.166/cart/products/add',
				data: {"productId": $(this).data('productid')},
				success: function(e) {
					toast["success"]("Item added to Cart");
				},
			});
		});
		
	});
