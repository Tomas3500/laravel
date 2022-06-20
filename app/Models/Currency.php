<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;
    protected $table = 'currencies';
    protected $fillable = ['name'];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function sammary()
    {
        return $this->belongsTo(Sammary::class);
    }
}
