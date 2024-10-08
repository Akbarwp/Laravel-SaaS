<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Package;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin admin',
            'email' => 'admin@gmail.com',
        ]);

        Feature::create([
            'image' => 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
            'route_name' => 'feature1.index',
            'name' => 'Calculate Sum',
            'description' => 'Calculate two of number',
            'required_credits' => 3,
            'active' => true,
        ]);
        Feature::create([
            'image' => 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
            'route_name' => 'feature2.index',
            'name' => 'Calculate Difference',
            'description' => 'Calculate the difference between two of number',
            'required_credits' => 3,
            'active' => true,
        ]);

        Package::create([
            'name' => 'Nova',
            'price' => 50000,
            'credits' => 20,
        ]);
        Package::create([
            'name' => 'Titan',
            'price' => 150000,
            'credits' => 50,
        ]);
        Package::create([
            'name' => 'Zenith',
            'price' => 300000,
            'credits' => 200,
        ]);
    }
}
