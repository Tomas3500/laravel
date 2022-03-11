@extends('layout.app')
@section('title-content')
    Создать
@endsection

@section('content')
    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="contact-title">Добро пожаловать, {{ auth()->user()->first_name }}
                        {{ auth()->user()->last_name }}</h2>
                </div>
                <div class="col-lg-8">
                    <p style="font-size: 25px">Мои резюме</p>
                </div>

                <div class="col-lg-8">
                    <div class="main-menu">
                        @foreach ($summaries as $item)
                            <div class="item">
                                <a href={{ route('summary.show', $item->id) }} class="summaries"
                                    style="color: black; font-size: 40px">{{ $item->id }}.
                                    {{ $item->position }}</a>
                                <p class="title"></p>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="col-lg-3 offset-lg-1">
                    <div class="media contact-info">
                        <div class="d-none f-right d-lg-block">
                            <a href={{ route('summary.create') }} class="btn head-btn1">Создать резюме</a>
                        </div>
                    </div>
                    <div class="media contact-info">
                        <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                        <div class="media-body">
                            <h3>+1 253 565 2365</h3>
                            <p>Mon to Fri 9am to 6pm</p>
                        </div>
                    </div>
                    <div class="media contact-info">
                        <span class="contact-info__icon"><i class="ti-email"></i></span>
                        <div class="media-body">
                            <h3>support@colorlib.com</h3>
                            <p>Send us your query anytime!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
