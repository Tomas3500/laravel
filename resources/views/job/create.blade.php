@extends('layout.app')

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
                            <label for="category">Категория</label>
                            <select class="form-select" id="category" aria-label="Default select example"
                                name="category_id">
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->title }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="city">Город</label>
                            <select class="form-select" id="city" aria-label="Default select example" name="city_id">
                                @foreach ($cities as $city)
                                    <option value="{{ $city->id }}">{{ $city->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="position">На должность</label>
                            <input type="text" class="form-control" id="position" placeholder="Должность" name="position"
                                value="{{ old('position') }}">

                            @error('position')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="description">Описание вакансии</label>
                            <input type="text" class="form-control" id="description" placeholder="Описание"
                                name="description" value="{{ old('description') }}">
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput4">Телефон для связи</label>
                            <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="Телефон"
                                name="phone" value="{{ old('phone') }}">
                            @error('phone')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="price">Заробтная плата</label>
                            <input type="text" class="form-control" id="price" placeholder="Заробтная плата" name="price"
                                value="{{ old('price') }}">
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
