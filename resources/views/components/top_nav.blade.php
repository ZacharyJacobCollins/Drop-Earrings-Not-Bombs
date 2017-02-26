<!--   <div class="row justify-content-around  navbar-toggleable-md navbar-row">
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="col-4 inwards-left">
      <div class="nav-item">
        <a class="nav-link" href="/">Home</a>
      </div>
      <div class="nav-item">
        <a class="nav-link" href="/crew">Crew</a>
      </div>
      <div class="nav-item">
        <a class="nav-link" href="/involvement">Get Involved</a>
      </div>
    </div>
    <div class="col-2">
      <img src="{{ asset('img/logo/logoColor.png') }}" height="70px" width="190px" style="margin-left: 17%">
    </div>
    <div class="col-4 inwards-right">
      <div class="nav-item">
        <a class="nav-link" href="#">Spacer</a>
      </div>
      <div class="nav-item">
        <a class="nav-link" href="/contribute">Contribute</a>
      </div>
      <div class="nav-item button">
        <a class="nav-link" href="/shop">Shop</a>
      </div>
    </div>
  </div>
 -->
<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse row" id="navbarNavAltMarkup">
    <div class="navbar-nav col-12">
      <a class="nav-item nav-link col-1" href="/">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link col-2" href="/crew">Crew</a>
      <a class="nav-item nav-link col-2" href="/involvement">Get Involved</a>

      <img class="col-2" src="{{ asset('img/logo/logoColor.png') }}" height="100%">

      <a class="nav-item nav-link col-2" href="#">Spacer</a>
      <a class="nav-item nav-link col-2" href="/contribute">Contribute</a>
      <a class="nav-item nav-link col-1 shop" href="/shop">Shop</a>
    </div>
  </div>
</nav>