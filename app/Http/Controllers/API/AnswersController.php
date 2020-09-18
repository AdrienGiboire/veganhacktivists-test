<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\AnswerStoreRequest;

use App\Answer;
use App\Question;

class AnswersController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Question $question, AnswerStoreRequest $request)
    {
      $answer = new Answer();
      $answer->content = $request->content;
      $question->answers()->save($answer);
      $answer->refresh();

      return $answer;
    }
}
