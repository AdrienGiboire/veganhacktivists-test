<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Answer as AnswerResource;

class Question extends JsonResource
{
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'content' => $this->content,
      'answers' => AnswerResource::collection(
        $this->answers()
             ->orderBy('created_at', 'ASC')
             ->get()
      )
    ];
  }
}
