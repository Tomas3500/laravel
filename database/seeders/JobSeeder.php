<?php

namespace Database\Seeders;

use App\Models\Job;
use GuzzleHttp\Promise\Create;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Job::factory(10)->create();

        //
    }
}
