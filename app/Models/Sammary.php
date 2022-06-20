<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sammary extends Model
{
    use HasFactory;

    protected $table = 'sammaries';

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'position',
        'city',
        'experienec',
        'education',
        'file'
    ];

    public function user()
    {

        return $this->belongsTo(User::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
