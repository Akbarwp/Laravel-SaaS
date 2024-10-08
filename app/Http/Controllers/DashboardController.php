<?php

namespace App\Http\Controllers;

use App\Models\UsedFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $usedFeatured = UsedFeature::query()
            ->with(['feature'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia('Dashboard', [
            'usedFeatured' => $usedFeatured
        ]);
    }
}
