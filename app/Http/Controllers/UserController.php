<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {

        return view('registrations.registration');
    }

    public function home()
    {
        return view('home');
    }
}
