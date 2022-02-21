<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Role;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {


        Role::factory(1)->create();
        User::factory(1)->create();
        Role::factory()->create();






        // dd($user);
    }
    // \App\Models\User::factory(10)->create();

}
