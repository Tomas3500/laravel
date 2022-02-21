<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{

    public function index()

    {

        $jobs = Job::all();

        // dd($jobs);

        return view('job.list', ['jobs' => $jobs]);
    }

    public function show()

    {
    }

    public function create()
    {
    }

    public function store()
    {
    }

    public function edit()
    {
    }

    public function update()
    {
    }



    //
}
