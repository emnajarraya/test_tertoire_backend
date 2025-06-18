<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SeoSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'meta_title',
        'meta_description',
        'keywords'
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
