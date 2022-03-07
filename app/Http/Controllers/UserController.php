<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function home()
    {

        return view('home');
    }
}
