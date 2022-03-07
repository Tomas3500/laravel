@extends('layout.app');
@section('title-content')
    редактировать
@endsection

@section('content')
    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="contact-title">Изменить резюме</h2>
                </div>
                <div class="col-lg-8">
                    <form action={{ route('summary.update', $sammary->id) }} method="POST">
                        @csrf
                        @method('patch')
                        <div class="form-group">
                            <input type="text" hidden name="user_id" value="{{ auth()->user()->id }}">
                            <label for="first_name">Имя</label>
                            <input type="text" class="form-control" id="first_name" placeholder="имя" name="first_name"
                                value="{{ $sammary->first_name }}">
                            @error('first_name')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="last_name">Фамилия</label>
                            <input type="text" class="form-control" id="last_name" placeholder="Фамилия" name="last_name"
                                value="{{ $sammary->last_name }}">
                            @error('last_name')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="position">Должность</label>
                            <input type="text" class="form-control" id="position" placeholder="Должность" name="position"
                                value="{{ $sammary->position }}">
                            @error('position')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="city">Город</label>
                            <input type="text" class="form-control" id="city" placeholder="Город" name="city"
                                value="{{ $sammary->city }}">
                        </div>
                        <div class="form-group">
                            <label for="experienec">Опыт работы</label>
                            <input type="text" class="form-control" id="experienec" placeholder="Опыт работы"
                                name="experienec" value="{{ $sammary->experienec }}">
                            @error('experienec')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="education">Подробное орисание</label>
                            <textarea class="form-control" id="education" rows="5" name="education">
                                                                    {{ $sammary->education }}                                                                                               </textarea>
                        </div>
                        <button class="btn btn-primary" type="submit">Обновить</button>
                    </form>
                    <div class="d-none f-left d-lg-block">
                        <a href={{ route('summary.index') }} class="btn head-btn1">Назад</a>
                    </div>
                </div>

            </div>
        </div>
    </section>
@endsection
