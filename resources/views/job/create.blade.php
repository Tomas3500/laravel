@extends('layout.app');
@section('title-content')
    Создать вакансию
@endsection

@section('content')
    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="contact-title">Создать вакансию</h2>
                </div>
                <div class="col-lg-8">

                    <form action="{{ route('job.store') }}" method="POST">
                        @csrf
                        <input type="text" hidden name="user_id" value="{{ auth()->user()->id }}">
                        <div class="form-group">
                            <label for="position">На должность</label>
                            <input type="text" class="form-control" id="position" placeholder="Должность" name="position">
                            @error('position')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="description">Описание вакансии</label>
                            <input type="text" class="form-control" id="description" placeholder="Описание"
                                name="description">
                        </div>
                        <div class="form-group">
                            <label for="city">Город</label>
                            <input type="text" class="form-control" id="city" placeholder="Город" name="city">
                        </div>

                        <div class="form-group">
                            <label for="formGroupExampleInput4">Телефон для связи</label>
                            <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="Телефон"
                                name="phone">
                            @error('phone')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="price">Заробтная плата</label>
                            <input type="text" class="form-control" id="price" placeholder="Заробтная плата" name="price">
                            @error('price')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <button class="btn btn-primary" type="submit">Добавить вакансию</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection