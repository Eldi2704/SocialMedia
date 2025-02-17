<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable=[
        'title',
    ];

    public function contents() {
        return $this->hasMany(Content::class);
    }

    public function user() {
        return $this->hasOne(User::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
