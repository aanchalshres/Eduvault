<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/courses', [ApiController::class, 'getCourses']);
Route::post('/enroll', [ApiController::class, 'enroll']);
Route::post('/schedule-session', [ApiController::class, 'scheduleSession']);
Route::post('/payment', [ApiController::class, 'processPayment']);
Route::post('/ai-tutor', [ApiController::class, 'aiTutor']);
Route::post('/contact', [ApiController::class, 'contact']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
