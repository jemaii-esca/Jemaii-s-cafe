<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['Espresso', 'Coffee', 'Rich, bold single shot.', 90, 40],
            ['Café Latte', 'Coffee', 'Smooth espresso with steamed milk.', 130, 35],
            ['Caramel Macchiato', 'Coffee', 'Vanilla, milk, espresso and caramel drizzle.', 150, 30],
            ['Iced Spanish Latte', 'Coffee', 'Sweet, creamy and chilled.', 155, 25],
            ['Matcha Latte', 'Non-Coffee', 'Earthy matcha with creamy milk.', 145, 20],
            ['Blueberry Cheesecake', 'Pastry', 'Creamy slice with blueberry topping.', 140, 10],
            ['Butter Croissant', 'Pastry', 'Flaky and freshly baked.', 85, 4],
            ['Chocolate Chip Cookie', 'Pastry', 'Soft-baked and gooey.', 60, 18],
            ['Club Sandwich', 'Meals', 'Triple-decker with chicken and egg.', 175, 12],
        ];

        foreach ($items as [$name, $category, $description, $price, $stock]) {
            Product::create(compact('name', 'category', 'description', 'price', 'stock'));
        }
    }
}
