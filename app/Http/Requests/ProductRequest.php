<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required'
        ];
    }

    public function messages(){
        return [
            'name.required' => 'Name khong duoc bo trong',
            'description.required' => 'Description khong duoc bo trong',
            'price.required' => 'Price khong duoc bo trong',
        ];
    }
}
