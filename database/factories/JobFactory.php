<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::all()->random()->id,
            'position' => $this->faker->text(10),
            'description' => $this->faker->text(100),
            'city' => $this->faker->text(10),
            'phone' => $this->faker->numerify('#########'),


            //
        ];
    }
}
