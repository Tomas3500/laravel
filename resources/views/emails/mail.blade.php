<h1>Рассылка вакансий</h1>
@foreach ($jobs as $job)
    <div class="single-job-items mb-30">
        <div class="job-items">
            <div class="job-tittle job-tittle2">
                <h4>{{ $job->position }}</h4>
                {{-- <a href={{ route('job.show', $job->id) }}>

                </a> --}}
                <ul>
                    <li>Дата <br> добавления: {{ $job->created_at->format('d-m-Y') }}</li>
                    <li>
                        <i class="fas fa-map-marker-alt"></i>Город: {{ $job->city->name }}
                    </li>
                    <li>Зарплата: {{ $job->price }}</li>
                </ul>
            </div>
        </div>
    </div>
@endforeach
