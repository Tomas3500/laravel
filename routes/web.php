<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('layout/app');
// });
//example lesson-1
Route::get('/', function () {
    return view('home');
});


Route::get('/user', [UserController::class, 'index',])->name('users.index');
Route::get('/home', [UserController::class, 'home',])->name('home.index');
// юзер контроллер

//-----работодатель контроллер

// Route::group([
//     'as' => 'employers.',
//     'prefix' => 'employers'
// ], function () {
//     Route::get('/{id}', [EmployerController::class, 'show'])->name('show');
//     Route::get('/', [EmployerController::class, 'index', 'show'])->name('index');
//     //создание вакансии
//     Route::get('/creat', [EmployerController::class, 'creat'])->name('creat');
//     Route::post('/', [EmployerController::class, 'store'])->name('store');
//     //редактировать вакансию
//     Route::get('/{id}/edit', [EmployerController::class, 'edit'])->name('edit');
//     Route::put('/{id}', [EmployerController::class, 'update'])->name('update');
// });


Route::resource('summary', SummaryController::class);
//почитать!

//резюме контроллер

Route::group([
    'as' => 'summary.', // name rout
    'prefix' => 'summary' // url
], function () {
    Route::get('/{id}', [SummaryController::class, 'show'])->name('show');
    Route::get('/', [SummaryController::class, 'index'])->name('index');
    //создать резюме
    Route::get('/creat', [SummaryController::class, 'create'])->name('create');
    Route::post('/', [SummaryController::class, 'store'])->name('store');
    //редактирование резюме
    Route::get('/{id}/edit', [SummaryController::class, 'edit'])->name('edit');
    Route::put('/{id}', [SummaryController::class, 'update'])->name('update');
});


// rout Job

Route::group([
    'as' => 'job.',
    'prefix' => 'job'
], function () {
    Route::get('/', [JobController::class, 'index'])->name('index');
    Route::get('/{id}', [JobController::class, 'show'])->name('show');
    //создать вакансию
    Route::get('/creat', [JobController::class, 'create'])->name('create');
    Route::post('/', [JobController::class, 'store'])->name('store');
    //редактирование вакансию
    Route::get('/{id}/edit', [JobController::class, 'edit'])->name('edit');
    Route::put('/{id}', [JobController::class, 'update'])->name('update');
});
