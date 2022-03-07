<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchJobOnCityRequest;
use App\Http\Requests\StoreJobRequest;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Facade;

class JobController extends Controller
{

    public function index()

    {

        $jobs = Job::all();

        return view('job.index', ['jobs' => $jobs]);
    }

    public function all()

    {

        $jobs = Job::all();

        return view('job.list', ['jobs' => $jobs]);
    }

    public function search(SearchJobOnCityRequest $request)

    {
        $jobsQuery = Job::query();

        if ($request->filled('search_jobs')) {

            $jobsQuery->where('city', '=', $request->search_jobs);
        }


        $jobs =  $jobsQuery->get();

        return view('job.list', ['jobs' => $jobs]);
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
        return view('job.create');
    }


    //store
    public function store(StoreJobRequest $request)

    {

        // $data = $request->validate();
        $data = $request->except('_token');
        Job::create($data);
        return redirect()->route('job.index');
    }

    //edit
    public function edit($id)
    {

        $job = Job::findOrfail($id);

        return view('job.edit', ['job' => $job]);
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

        $job = Job::find($id)->delete();

        // $job->delete();

        return redirect()->route('job.index');
    }

    //
}
