<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/questions', 'API\QuestionsController@store');
Route::get('/questions', 'API\QuestionsController@index');
Route::get('/questions/{question}', 'API\QuestionsController@show');

Route::post('/questions/{question}/answers', 'API\AnswersController@store');
