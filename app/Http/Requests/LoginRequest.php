<?php

namespace App\Http\Requests;

use App\Http\Requests\ApiRequest;

class LoginRequest extends ApiRequest
{
    /**
     * Get validate riles that apply to request.
     *
     * @return  array
     */
    public function rules()
    {
        return [
            'email'               => 'required',
            'password'           => 'required',
        ];
    }
    /**
     * Define validate error
     *
     * @return  array
     */
    public function messages()
    {
        return [
            'email.required'              => 'Login_E_001',
            'password.required'          => 'Login_E_002',
        ];
    }
}
