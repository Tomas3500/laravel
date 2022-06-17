@extends('layout.app');
@section('title-content')
    Создать резюме
@endsection

@section('content')
    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="contact-title">Заполните форму</h2>
                </div>
                <div class="col-lg-8">

                    <form action="{{ route('summary.store') }}" method="POST">
                        @csrf
                        <input type="text" hidden name="user_id" value="{{ auth()->user()->id }}">
                        <div class="form-group">
                            <label for="formGroupExampleInput">Имя</label>
                            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="имя"
                                name="first_name" value={{ auth()->user()->first_name }}>
                            @error('first_name')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="formGroupExampleInput2">Фамилия</label>
                            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Фамилия"
                                name="last_name" value={{ auth()->user()->last_name }}>
                            @error('last_name')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput3">Должность</label>
                            <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="Должность"
                                name="position" value="{{ old('position') }}">
                            @error('position')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput4">Город</label>
                            <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="Город"
                                name="city" value="{{ old('city') }}">
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput5">Опыт работы лет</label>
                            <input type="text" class="form-control" id="formGroupExampleInput5" placeholder="Опыт работы"
                                name="experienec" value="{{ old('experienec') }}">
                            @error('experienec')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput6">Подробное орисание</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name="education">
                                                                                                                                                                             </textarea>
                        </div>
                        <button class="btn btn-primary" type="submit">Добавить резюме</button>
                    </form>
                    <div class="d-none f-left d-lg-block">
                        <a href={{ route('summary.index') }} class="btn head-btn1">Назад</a>
                    </div>
                </div>

                <div class="col-lg-4">
                    <form action="{{ route('file.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label for="file">Загрузка вакансии</label>
                            <input type="file" class="form-control-file" id="file" name="file">
                        </div>
                        @error('file')
                            <div class="alert alert-danger">{{ $message }}</div>
                        @enderror
                        <button class="btn btn-primary" type="submit">Загрузить вакансию </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
