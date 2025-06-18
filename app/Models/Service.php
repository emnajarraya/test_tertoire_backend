<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'image',
        'slug'
    ];

    public function seoSetting(): HasOne
    {
        return $this->hasOne(SeoSetting::class);
    }

    public function catalogues(): HasMany
    {
        return $this->hasMany(Catalogue::class);
    }
}
