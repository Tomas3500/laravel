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
                                <div class="d-none f-center d-lg-block">
                                    <div class="modal" id="exampleModal" tabindex="-1" role="dialog">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Удалить резюме</h5>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Хотите удалить {{ $sammary->position }} ?</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-dismiss="modal">Закрыть</button>
                                                    <form action={{ route('summary.destroy', $sammary->id) }}
                                                        method='POST'>
                                                        @csrf
                                                        <button type="submit"class="btn btn-primary">Удалить</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" data-target="#exampleModal" class="btn btn-danger"
                                        data-toggle="modal">
                                        Удалить
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
