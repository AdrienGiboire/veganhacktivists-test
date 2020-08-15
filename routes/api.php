<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Resources\Question as QuestionResource;

use App\Answer;
use App\Question;

Route::post('/questions', function (Request $request) {
  $question = new Question;
  $question->content = $request->content;
  $question->save();
  $question->refresh();

  return $question;
});

Route::get('/questions', function () {
  return QuestionResource::collection(Question::orderBy('created_at', 'DESC')->get());
});

Route::post('/questions/{question}/answers', function (Question $question, Request $request) {
  $answer = new Answer();
  $answer->content = $request->content;
  $question->answers()->save($answer);
  $answer->refresh();

  return $answer;
});

Route::get('/questions/{question}', function (Question $question) {
  return new QuestionResource($question);
});
