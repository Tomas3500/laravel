<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\EmployerController;
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

//Route::get('/', function () {
//    return view('welcome');
//});
//example lesson-1
Route::get('/test', function () {
    $arr = ['a' => 1, 'b' => 2];
    dump($arr);
    dd(123);
});

// юзер контроллер
Route::get('/my{id}', [UserController::class, 'index',])->name('users.index_my');
//-----работодатель контроллер
Route::get('/employers{id}', [EmployerController::class, 'index', 'show'])->name('employers.index_employer');

//создание вакансии
Route::get('/employers{id}/creat', [EmployerController::class, 'creat', 'show'])->name('employers.creat_employer');
//редактировать вакансию
Route::get('/employers/{empoloyer}/edit', [EmployerController::class, 'edit', 'show'])->name('employers.edit_employer');

//резюме контроллер
Route::get('/summary/{id}', [SummaryController::class, 'index', 'show'])->name('summarys.index_summary');
//создать резюме
Route::get('/summary/{id}/creat', [SummaryController::class, 'creat', 'show'])->name('summarys.creat_summary');
//редактирование резюме
Route::get('/summarys/{summary}/edit', [SummaryController::class, 'edit', 'show'])->name('summarys.edit_summary');







