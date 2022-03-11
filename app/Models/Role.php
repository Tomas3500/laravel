<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    //const !!!! role

    const ID_ROLE_EMPLOYER = 'employer';
    const ID_ROLE_APPLICANT = 'applicant';

    protected $fillable = [];
    protected $table = 'roles';

    public function users()
    {

        return $this->hasMany(User::class);
    }
}
