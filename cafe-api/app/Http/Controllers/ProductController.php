<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private function rules(): array
    {
        return [
            'name' => 'required|string|max:120',
            'category' => 'required|string|max:60',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ];
    }

    public function index()
    {
        return Product::orderByDesc('id')->get();
    }

    public function store(Request $r)
    {
        return response()->json(Product::create($r->validate($this->rules())), 201);
    }

    public function update(Request $r, Product $product)
    {
        $product->update($r->validate($this->rules()));
        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
