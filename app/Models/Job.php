<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'city_id',
        'position',
        'phone',
        'city',
        'description',
        'price'
    ];


    protected $table = 'jobs';


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {

        return $this->belongsTo(Category::class);
    }

    public function city()
    {

        return $this->belongsTo(City::class);
    }
}
