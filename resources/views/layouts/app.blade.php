<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Main App Style -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- Bootstrap v4 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

    <!-- Custom CSS -->
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
</head>
<body>
    <div id="app">
        <!-- <na<!-- v class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div  class="navbar-header"> -->

                    <!-- Collapsed Hamburger -->
                    <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
 -->
                    <!-- Branding Image -->
                    <!-- <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse"> -->
                    <!-- Left Side Of Navbar -->
<!--                     <ul class="nav navbar-nav">
                        <li><a href="/crew">The Crew</a></li>
                        <li><a href="/involvement">Get Involved</a></li>
                        <li><a href="/shop">Shop</a></li>
                    </ul> -->

                    <!-- Right Side Of Navbar -->
                    <!-- <ul class="nav navbar-nav navbar-right"> -->
                        <!-- Authentication Links -->
                        <!-- @if (Auth::guest()) -->
                            <!-- <li><a href="{{ route('login') }}">Login</a></li> -->
                            <!-- <li><a href="{{ route('register') }}">Register</a></li> -->
                       <!--  @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>
 -->
        <nav class="navbar navbar-toggleable-md navbar-light">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <img src="{{ asset('images/logo.png') }}" height="30"; width="33"> <a class="navbar-brand" href="/">Drop Earrings Not Bombs </a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/shop">Shop</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/crew">The Crew</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/involvement">Be Involved</a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="line"></div>

        @yield('content')
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>

    <!-- Bootstrap V4 -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

</body>
</html>
