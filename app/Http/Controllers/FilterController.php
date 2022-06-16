<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Job;
use Illuminate\Http\Request;

class FilterController extends Controller
{


    public function index(Request $request)


    {
        $categories = Category::all();
        $cities = City::all();


        $querys = $request->except('_token');

        if (isset($request)) {
            $querys = Job::where('city_id', '=', $request->city_id)
                ->orWhere('category_id', '=', $request->category_id)
                ->orWhere('price', '=', $request->price);
        };

        $jobs = $querys->get();

        return view('job.filter', [
            'jobs' => $jobs,
            'categories' => $categories,
            'cities' => $cities
        ]);
    }
}
