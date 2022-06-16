@extends('layout.app');
@section('title-content')
    редактировать
@endsection

@section('content')
    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="contact-title">Изменить вакансию</h2>
                </div>
                <div class="col-lg-8">
                    <form action={{ route('job.update', $job->id) }} method="POST">
                        @csrf
                        @method('patch')

                        <div class="form-group">
                            <input type="text" hidden name="user_id" value="{{ auth()->user()->id }}">
                            <label for="position">На должность</label>
                            <input type="text" class="form-control" id="position" placeholder="должность" name="position"
                                value="{{ $job->position }}">
                            @error('position')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
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
                            <label for="category">Категория</label>
                            <select class="form-select" id="category" aria-label="Default select example"
                                name="category_id">
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->title }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="description">Описание вакансии</label>
                            <input type="text" class="form-control" id="description" placeholder="description"
                                name="description" value="{{ $job->description }}">
                        </div>

                        <div class="form-group">
                            <label for="phone">Телефон для связи</label>
                            <input type="text" class="form-control" id="phone" placeholder="Телефон" name="phone"
                                value="{{ $job->phone }}">
                            @error('phone')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label for="price">Заробтная плата</label>
                            <input type="text" class="form-control" id="phone" placeholder="Заробтная плата" name="price"
                                value="{{ $job->price }}">
                            @error('price')
                                <span class="error" style="color: red">{{ $message }}</span>
                            @enderror
                        </div>

                        <button class="btn btn-primary" type="submit">Обновить</button>
                    </form>
                    <div class="d-none f-left d-lg-block">
                        <a href={{ route('job.index') }} class="btn head-btn1">Назад</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
