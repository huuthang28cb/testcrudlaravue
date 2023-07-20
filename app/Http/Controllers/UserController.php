<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $loginUser                = null;
        $userInfo                 = [];
        $userInfo['password']     = $request['password'];
        // Check by email
        $loginUser            = User::where("email", $request['email'])->first();
        $userInfo['email']    = $request['email'];


        // check user exists
        if ($loginUser == null) {
            throw new LogicGException('USER_NOT_EXISTS');
        }

        // do check login
        $token = $this->createToken($userInfo);
        if (!$token) {
            throw new LogicGException('WRONG_PASS');
        }

        JWTAuth::setToken($token);

        // save new token
        $loginUser->token           = $token;
        $loginUser->refresh_token = $this->createRefreshToken($loginUser);
        $loginUser->update();

        $tokenClaims                = JWTAuth::getJWTProvider()->decode($loginUser->token);
        $refreshTokenClaims         = JWTAuth::getJWTProvider()->decode($loginUser->refresh_token);

        $loginUser->token_expire         = $tokenClaims['exp'];
        $loginUser->refresh_token_expire = $refreshTokenClaims['exp'];

        return response()->json($loginUser);
    }

    public function createToken($userInfo)
    {
        if (is_object($userInfo)) {
            return JWTAuth::fromUser($userInfo);
        }
        JWTFactory::setTTL(config('ttl', 60));
        return JWTAuth::attempt($userInfo);
    }

    public function createRefreshToken($userInfo)
    {
        JWTFactory::setTTL(config('jwt.refresh_ttl', 20160));
        $refreshToken = JWTAuth::refresh(JWTAuth::fromUser($userInfo));
        return $refreshToken;
    }
}
