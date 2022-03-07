<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Role;
use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\Sequence;
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


        // Role::factory(2)->create();
        DB::table('roles')->insert([
            ['name' => 'Соискатель'],
            ['name' => 'Работодатель'],
        ]);
        User::factory(1)->create();
        Job::factory(1)->create();






        // dd($user);
    }
    // \App\Models\User::factory(10)->create();

}
