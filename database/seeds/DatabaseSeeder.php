<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    factory(App\Question::class, 50)->create()->each(function ($question) {
      factory(App\Answer::class, rand(0, 10))->make()->each(function ($answer) use ($question) {
        $question->answers()->save($answer);
      });
    });
  }
}
