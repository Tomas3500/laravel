@extends('layout.app')
@section('title-content')
    Найти работу
@endsection
@section('content')
    <div class="job-listing-area pt-120 pb-120">
        <div class="container">
            <div class="row">
                <!-- Left content -->
                <div class="col-xl-3 col-lg-3 col-md-4">
                    <div class="row">
                        <div class="col-12">
                            <div class="small-section-tittle2 mb-45">
                                <div class="ion"> <svg xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="12px">
                                        <path fill-rule="evenodd" fill="rgb(27, 207, 107)"
                                            d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z" />
                                    </svg>
                                </div>
                                <h4>Фильтр</h4>
                            </div>
                        </div>
                    </div>


                    <form action="{{ route('filter.index') }}" method="GET">
                        @csrf
                        <button class="btn btn-primary" type="submit">Фильтр</button>
                        <div class="job-category-listing mb-50 mt-2">
                            <!-- single one -->
                            <div class="single-listing">
                                <div class="small-section-tittle2">
                                    <h4>Категория</h4>
                                </div>
                                <!-- Select job items start -->
                                <div class="select-job-items2">
                                    <select id="category" name="category_id" multiple aria-label="multiple select example">
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->title }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="single-listing">
                                <div class="small-section-tittle2">
                                    <h4>Город</h4>
                                </div>
                                <!-- Select job items start -->
                                <div class="select-job-items2">
                                    <select id="city" name="city_id" multiple aria-label="multiple select example">
                                        @foreach ($cities as $city)
                                            <option value="{{ $city->id }}">{{ $city->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <!--  Select job items End-->
                            </div>
                            <div class="single-listing">
                                <!-- Range Slider Start -->
                                <aside class="left_widgets p_filter_widgets price_rangs_aside sidebar_box_shadow">
                                    <div class="small-section-tittle2">
                                        <h4>Заработная плата</h4>
                                    </div>
                                    <div class="widgets_inner">
                                        <div class="range_item">
                                            <!-- <div id="slider-range"></div> -->
                                            <div class="d-flex align-items-center">
                                                <input class="form-control" type="text" placeholder="Заработная плата"
                                                    name="price">
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                <!-- Range Slider End -->
                            </div>
                        </div>

                    </form>

                    <!-- Job Category Listing start -->

                    <!-- Job Category Listing End -->
                </div>
                <!-- Right content -->
                <div class="col-xl-9 col-lg-9 col-md-8">
                    <!-- Featured_job_start -->
                    <section class="featured-job-area">
                        <div class="container">
                            <!-- Count of Job list Start -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="count-job mb-35">
                                        <span> Jobs found {{ $jobs->count() }}</span>
                                        <!-- Select job items start -->
                                        <div class="select-job-items">
                                            <span>Sort by</span>
                                            <a href="/job/all?sort[created_at]=desc" class="text-black-50">По дате</a>
                                        </div>
                                        <!--  Select job items End-->
                                    </div>
                                </div>
                            </div>
                            <!-- Count of Job list End -->
                            <!-- single-job-content -->
                            @foreach ($jobs as $job)
                                <div class="single-job-items mb-30">
                                    <div class="job-items">
                                        <div class="company-img">
                                            <a href="#"><img src="assets/img/icon/job-list1.png" alt=""></a>
                                        </div>
                                        <div class="job-tittle job-tittle2">
                                            <a href="{{ route('job.show', $job->id) }}">
                                                <h4>{{ $job->position }}</h4>
                                            </a>
                                            <ul>
                                                <li>Дата <br> добавления: {{ $job->created_at->format('d-m-Y') }}</li>
                                                <li><i class="fas fa-map-marker-alt"></i>Город: {{ $job->city->name }}
                                                </li>
                                                <li>Зарплата: {{ $job->price }} {{ $job->currency->name }}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </section>
                    <!-- Featured_job_end -->
                </div>
            </div>
        </div>
    </div>
@endsection
