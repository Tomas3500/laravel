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


        DB::table('roles')->insert([
            ['name' => 'Соискатель'],
            ['name' => 'Работодатель'],
        ]);

        DB::table('categories')->insert([
            ['title' => 'ИТ, компьютеры,интернет'],
            ['title' => 'Бухгалтерия, аудит'],
            ['title' => 'Автобизнес']
        ]);

        DB::table('cities')->insert([
            ['name' => 'Краматорск'],
            ['name' => 'Киев'],
            ['name' => 'Харьков']
        ]);

        DB::table('currencies')->insert([
            ['name' => 'UA'],
            ['name' => 'USD'],
            ['name' => 'EUR']
        ]);


        // User::factory(1)->create();
        // Job::factory(1)->create();

    }
    // \App\Models\User::factory(10)->create();

}
