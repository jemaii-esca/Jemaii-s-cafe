<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $r)
    {
        $data = $r->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('cafe')->plainTextToken,
        ], 201);
    }

    public function login(Request $r)
    {
        $r->validate(['email' => 'required|email', 'password' => 'required']);
        $user = User::where('email', $r->email)->first();

        if (!$user || !Hash::check($r->password, $user->password)) {
            return response()->json(['message' => 'Invalid email or password.'], 422);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('cafe')->plainTextToken,
        ]);
    }

    public function logout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
