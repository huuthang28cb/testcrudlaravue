<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = $request->input('token');
            if (!empty($request) && !empty($request->header('token'))) {
                $token = $request->header('token');
            }
            $t = JWTAuth::getJWTProvider()->decode($token);

            // $user = JWTAuth::setToken($token)->toUser();
            // JWTAuth::authenticate();

            // tgbao custom check token 20210630
            $exist = User::where('token', $token)->exists();

            if (!$exist) {
                throw new TokenInvalidException();
            }

        } catch (TokenExpiredException $te) {
            return response()->json([
                'status' => 401,
                'body' => [
                    'C_E_004',
                ]
            ], 401);
        } catch (TokenInvalidException $tie) {
            return response()->json([
                'status' => 401,
                'body' => [
                    'C_E_005',
                ]
            ], 401);
        } catch (JWTException $je) {
            return response()->json([
                'status' => 401,
                'body' => [
                    'C_E_006',
                ]
            ], 401);
        } catch (TokenBlacklistedException $tbe) {
            return response()->json([
                'status' => 401,
                'body' => [
                    'C_E_007',
                ]
            ], 401);
        }

        return $next($request);
    }
}
