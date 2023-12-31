<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/{vue_capture?}',function () {    //--here,"vue_capture" is just a random_variable
//     return view('welcome');                 //--if we hit with random route,it will go 'welcome' page
// })->where('vue_capture', '[\/\w\.-]*');

Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');

// Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);
