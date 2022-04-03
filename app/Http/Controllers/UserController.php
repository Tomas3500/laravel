<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Job;
use App\Models\Role;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {

        $categories = Category::all();
        return view('home', ['categories' => $categories]);
    }
}
