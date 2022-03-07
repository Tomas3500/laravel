<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'position',
        'phone',
        'city',
        'description',
        'price'
    ];


    protected $table = 'jobs';


    public function job()
    {
        return $this->belongsTo(User::class);
    }
}
