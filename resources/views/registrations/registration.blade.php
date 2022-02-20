@extends('layout.app')
@section('title-content')
    Регистрация
@endsection
@section('content')
    <div class="header-area header-transparrent">
        <div class="headder-top header-sticky">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-9 col-md-9">
                        <div class="menu-wrapper about">
                            <!-- Main-menu -->
                            <div class="main-menu about">
                                <!--form-regist-->
                                <form action="#" method="post" name="regist">
                                    <h2 class="text-center mt-4">Регистрация</h2>
                                    <div class="form-group">
                                        <label for="first-name">Имя</label>
                                        <input type="text" class="form-control" id="first-name" placeholder="Имя">
                                    </div>
                                    <div class="form-group">
                                        <label for="last-name">Фамилия</label>
                                        <input type="text" class="form-control" id="last-name" placeholder="Фамилия">
                                    </div>
                                    <div class="form-group">
                                        <label for="email-adress">Email adress</label>
                                        <input type="email" class="form-control" id="email-adress" placeholder="Email">
                                    </div>
                                    <div class="form-group">
                                        <label for="phone-number">Номер телефона</label>
                                        <input type="text" class="form-control" id="phone-number" placeholder="Телефон">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Пароль</label>
                                        <input type="password" class="form-control" id="password" placeholder="Пароль">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
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
