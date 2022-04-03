<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
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




Route::get('/', [UserController::class, 'index',])->name('index');


Route::group([
    'as' => 'summary.', // name rout
    'prefix' => 'summary', // url
], function () {
    Route::get('/', [SummaryController::class, 'index'])->name('index');
    //создать резюме
    Route::get('/create', [SummaryController::class, 'create'])->name('create');
    Route::post('/', [SummaryController::class, 'store'])->name('store');
    Route::get('/{id}', [SummaryController::class, 'show'])->name('show');
    //редактирование резюме
    Route::get('/{id}/edit', [SummaryController::class, 'edit'])->name('edit');
    Route::patch('/{id}', [SummaryController::class, 'update'])->name('update');
    Route::post('/{id}', [SummaryController::class, 'destroy'])->name('destroy');
});

// rout Job

Route::group([
    'as' => 'job.',
    'prefix' => 'job',
], function () {
    Route::get('/', [JobController::class, 'index'])->name('index');
    Route::get('/all', [JobController::class, 'all'])->name('all');
    Route::get('/search', [JobController::class, 'search'])->name('search');
    //создать вакансию
    Route::get('/create', [JobController::class, 'create'])->name('create');
    Route::post('/', [JobController::class, 'store'])->name('store');

    Route::get('/{id}', [JobController::class, 'show'])->name('show');

    //редактирование вакансию
    Route::get('/{id}/edit', [JobController::class, 'edit'])->name('edit');
    Route::patch('/{id}', [JobController::class, 'update'])->name('update');
    Route::post('/{id}', [JobController::class, 'destroy'])->name('destroy');
});



Route::group([
    'as' => 'filter.',
    'prefix' => 'filter'
], function () {
    Route::get('/filter', [FilterController::class, 'index'])->name('index');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
