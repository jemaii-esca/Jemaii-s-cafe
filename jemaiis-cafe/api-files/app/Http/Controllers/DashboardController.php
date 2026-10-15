<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return [
            'total_products' => Product::count(),
            'total_stock' => (int) Product::sum('stock'),
            'categories' => Product::distinct()->count('category'),
            'low_stock' => Product::where('stock', '<=', 5)->count(),
            'inventory_value' => (float) Product::selectRaw('COALESCE(SUM(price * stock), 0) as v')->value('v'),
            'users' => User::count(),
        ];
    }
}
