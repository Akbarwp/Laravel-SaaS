<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsedFeature extends Model
{
    use HasFactory;

    protected $table = "used_features";
    protected $fillable = [
        'credits',
        'feature_id',
        'user_id',
    ];

    public function feature()
    {
        return $this->belongsTo(Feature::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function casts()
    {
        return [
            'data' => 'array',
        ];
    }
}
