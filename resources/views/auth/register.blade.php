@extends('layout.app')
@section('title-content')
    Регистрация
@endsection
@section('content')
    <div class="header-area header-transparrent">
        <div class="headder-top">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-9 col-md-9">
                        <div class="menu-wrapper about">
                            <!-- Main-menu -->
                            <div class="main-menu about">
                                <!--form-regist-->
                                <form action="{{ route('register') }}" method="POST">

                                    @csrf
                                    {{-- @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach --}}
                                    <h2 class="text-center mt-4">Регистрация</h2>
                                    <div class="form-group">
                                        <label for="first-name">Имя</label>
                                        <input type="text" class="form-control @error('first_name') is-invalid @enderror"
                                            id="first-name" placeholder="Имя" name="first_name"
                                            value="{{ old('first_name') }}" @error('first_name') is-invalid @enderror>
                                        @error('first_name')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                    <div class="form-group">
                                        <label for="last-name">Фамилия</label>
                                        <input type="text" class="form-control @error('last_name') is-invalid @enderror"
                                            id="last-name" placeholder="Фамилия" name="last_name"
                                            value="{{ old('last_name') }}">
                                        @error('last_name')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                    <div class="form-group">
                                        <label for="email-adress">Email</label>
                                        <input type="email" class="form-control @error('email') is-invalid @enderror "
                                            id="email-adress" placeholder="Email" name="email" value="{{ old('email') }}">
                                        @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                    <div class="form-group">
                                        <label for="phone-number">Номер телефона</label>
                                        <input type="text" class="form-control @error('phone') is-invalid @enderror "
                                            id="phone-number" placeholder="Телефон" name="phone"
                                            value="{{ old('phone') }}">
                                        @error('phone')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Пароль</label>
                                        <input type="password" class="form-control @error('password') is-invalid @enderror"
                                            id="password" placeholder="Пароль" name="password"
                                            value="{{ old('password') }}">
                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                    <div class="row justify-content-center align-items-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio" id="flexRadioDefault1"
                                                name="radio" for="radio">
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Соискатель
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio" id="flexRadioDefault2"
                                                checked for="radio" value="">
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                Работодатель
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">
                                        Зарегистрироваться
                                    </button>
                                </form>
                                </nav>
                            </div>
                            <!-- Header-btn -->
                        </div>
                    </div>
                    <!-- Mobile Menu -->
                    <div class="col-12">
                        <div class="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
