@extends('layout.app')
@section('title-content')
    Детали вакансии
@endsection

@section('content')
    <div class="job-post-company pt-120 pb-120">
        <div class="container">
            <div class="row justify-content-between">
                <!-- Left Content -->
                <div class="col-xl-7 col-lg-8">
                    <div class="job-post-details">
                        <div class="post-details1 mb-50">
                            <!-- Small Section Tittle -->
                            <div class="small-section-tittle">
                                <h4> {{ $job->position }}</h4>
                            </div>
                            <div class="post-details2">
                                <!-- Small Section Tittle -->
                                <div class="small-section-tittle">
                                    <h4>Номер телефона</h4>
                                    <p>{{ $job->phone }}</p>
                                </div>

                            </div>
                            <div class="post-details2">
                                <!-- Small Section Tittle -->
                                <div class="small-section-tittle">
                                    <h4>Город</h4>
                                    <p>{{ $job->city->name }}</p>
                                </div>

                            </div>
                            <div class="post-details2">
                                <!-- Small Section Tittle -->
                                <div class="small-section-tittle">
                                    <h4>Категория</h4>
                                    <p>{{ $job->category->title }}</p>
                                </div>

                            </div>
                            <div class="small-section-tittle">
                                <h4>Подробное описание</h4>
                                <p>{{ $job->description }}.</p>
                            </div>
                        </div>
                        <div class="post-details2">
                            <!-- Small Section Tittle -->
                            <div class="small-section-tittle">
                                <h4>Зарплата</h4>
                                <p>{{ $job->price }}</p>
                            </div>

                        </div>
                        <div class="d-flex justify-content-around">
                            @guest
                                <a href={{ route('index') }} class="btn head-btn1">Назад</a>
                            @endguest
                            @auth
                                <a href={{ route('job.index') }} class="btn head-btn1">Назад</a>
                                <a href={{ route('job.edit', $job->id) }} class="btn head-btn1">Редактировать</a>
                                <div class="d-none f-center d-lg-block">
                                    <form action={{ route('job.destroy', $job->id) }} method="POST">
                                        @csrf
                                        <button type="submit" class="btn btn-danger">Удалить</button>
                                    </form>
                                </div>
                            @endauth
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
