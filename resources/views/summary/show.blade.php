@extends('layout.app');
@section('title-content')
    Детали резюмме
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
                                <h4> {{ $sammary->first_name }} {{ $sammary->last_name }} </h4>
                            </div>
                        </div>
                        <div class="post-details2  mb-50">
                            <!-- Small Section Tittle -->
                            <div class="small-section-tittle">
                                <p>{{ $sammary->position }}</p>
                            </div>
                        </div>
                        <div class="post-details2  mb-50">
                            <!-- Small Section Tittle -->
                            <div class="small-section-tittle">
                                <h4>Город</h4>
                                <p>{{ $sammary->city }}</p>
                            </div>

                        </div>

                        <div class="post-details2  mb-50">
                            <!-- Small Section Tittle -->
                            <div class="small-section-tittle">
                                <h4>Образование</h4>
                                <p>{{ $sammary->education }}</p>
                            </div>

                        </div>
                        <div class="post-details2  mb-50">
                            <!-- Small Section Tittle -->
                            <div class="small-section-tittle">
                                <h4>Опыт работы</h4>
                                <p>{{ $sammary->experienec }}</p>
                            </div>

                        </div>
                        <div class="d-flex justify-content-around">
                            @guest
                                <a href={{ route('summary.index') }} class="btn head-btn1">Назад</a>
                            @endguest
                            <a href={{ route('summary.index') }} class="btn head-btn1">Назад</a>
                            <a href={{ route('summary.edit', $sammary->id) }} class="btn head-btn1">Редактировать</a>
                            <div class="d-none f-center d-lg-block">
                                <form action={{ route('summary.destroy', $sammary->id) }} method="POST">
                                    @csrf
                                    {{-- @method('DELETE') --}}
                                    <button type="submit" class="btn btn-danger">Удалить</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
