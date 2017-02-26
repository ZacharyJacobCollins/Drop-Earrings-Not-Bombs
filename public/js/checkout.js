// Remove Items From Cart
  $(function() {
      $('a.remove').on('click', function(event){
      event.preventDefault();
      console.log('hello');
      $( this ).closest('li').hide( 400 );
    });
  });

  var arr = [
        {
          title: "Earrings",
          description: "lorem ipsum",
          imageURL: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Product&w=100&h=150",
          price: 15.00,
          quantity: 3
        },
        {
          title: "Earrings",
          description: "lorem ipsum",
          imageURL: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Product&w=100&h=150",
          price: 15.00,
          quantity: 4
        },
        {
          title: "Earrings",
          description: "lorem ipsum",
          imageURL: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Product&w=100&h=150",
          price: 15.00,
          quantity: 1
        },
        {
          title: "Earrings",
          description: "lorem ipsum",
          imageURL: "https://placeholdit.imgix.net/~text?txtsize=33&txt=Product&w=100&h=150",
          price: 15.00,
          quantity: 2
        }
      ];