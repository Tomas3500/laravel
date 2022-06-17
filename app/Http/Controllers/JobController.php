<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchJobOnCityRequest;
use App\Http\Requests\StoreJobRequest;
use App\Jobs\SendNewJobsJob;
use App\Models\Category;
use App\Models\City;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Mail;

class JobController extends Controller
{

    public function index()

    {

        $jobs = Job::all();

        return view('job.index', ['jobs' => $jobs]);
    }

    public function all(Request $request)

    {
        $cities = City::all();
        $categories = Category::all();
        $jobsQuery = Job::query();

        $sorts = $request->query('sort') ?? [];

        foreach ($sorts as $field => $direction) {
            $jobsQuery->orderBy($field, $direction);
        }


        $jobs = $jobsQuery->get();

        return view('job.list', [
            'jobs' => $jobs,
            'categories' => $categories,
            'cities' => $cities
        ]);
    }


    //!!!dublicate code ------ !!!!!

    public function search(SearchJobOnCityRequest $request)

    {

        $categories = Category::all();
        $cities = City::all();

        if ($request->filled('search_jobs')) {
            $jobsQuery = Job::where('position', 'like', "%$request->search_jobs%");
        }

        // $jobsQuery = Job::whereHas('city', function ($queryCity) use ($request) {
        //     $queryCity->where('name', 'like', "%$request->search_jobs%");
        // });

        $jobs =  $jobsQuery->get();

        return view('job.list', [
            'jobs' => $jobs,
            'categories' => $categories,
            'cities' => $cities
        ]);
    }




    //show
    public function show($id)

    {
        $job = Job::findOrfail($id);

        return view('job.show',  ['job' => $job]);
    }

    //creatre
    public function create()

    {
        $categories = Category::all();
        $cities = City::all();

        return view('job.create', [
            'categories' => $categories,
            'cities' => $cities
        ]);
    }


    //store
    public function store(StoreJobRequest $request)

    {
        $data = $request->except('_token');
        Job::create($data);

        // $userInfo = [
        //     'email' => auth()->user()->email,
        //     'first_name' => auth()->user()->first_name
        // ];

        // SendNewJobsJob::dispatch($newJob, $userInfo);

        return redirect()->route('job.index');
    }

    //edit
    public function edit($id)
    {

        $job = Job::findOrfail($id);
        $cities = City::all();
        $categories = Category::all();

        return view('job.edit', [
            'job' => $job,
            'cities' => $cities,
            'categories' => $categories
        ]);
    }


    //update

    public function update(StoreJobRequest $request, $id)

    {

        $data = $request->except('_token', '_method');

        $job = Job::findOrfail($id);
        $job->update($data);

        return redirect()->route('job.show', $job->id);
    }


    public function destroy($id)

    {

        Job::find($id)->delete();

        return redirect()->route('job.index');
    }

    //
}
