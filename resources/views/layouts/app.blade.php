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

    <!-- Font Awesome -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Tether -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/css/tether.min.css">

    <!-- Bootstrap v4 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

    <!-- Custom CSS -->
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/components/top_nav.css') }}" rel="stylesheet">
    <link href="{{ asset('css/earring_creator.css') }}" rel="stylesheet">
    <link href="{{ asset('css/crew.css') }}" rel="stylesheet">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">

    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
</head>
<body>
    <div id="app">


        @include('components.top_nav')

        @yield('content')


    </div>

    <!-- Dummy Data for earrings -->
    <script src="{{ asset('js/data/colors.js') }}"></script>
    <script src="{{ asset('js/data/styles.js') }}"></script>
    <script src="{{ asset('js/data/frames.js') }}"></script>
    <script src="{{ asset('js/data/sizes.js') }}"></script>
    <script src="{{ asset('js/data/beads.js') }}"></script>

    <!-- JQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    <!-- Scripts -->
    <!-- <script src="{{ asset('js/app.js') }}"></script> -->

    <!-- Tether -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>

    <!-- Bootstrap V4 -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

    <!-- Vue.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js"></script>

    <!-- Vue files -->
    <script src="{{ asset('js/vue_components.js') }}"></script>
    <script src="{{ asset('js/vue.js') }}"></script>

    <!-- View js files -->
    <script src="{{ asset('js/crew.js') }}"></script>

</body>
</html>
