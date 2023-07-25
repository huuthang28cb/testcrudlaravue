<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ApiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [];
    }

    /**
     * Define validate error
     *
     * @return  array
     */
    public function messages()
    {
        return [];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        $errorFormat = [];
        foreach ($errors as $error) {
            array_push($errorFormat, $error[0]);
        }
        throw new HttpResponseException(response()->json(
            [
                'status' => JsonResponse::HTTP_BAD_REQUEST,
                'body' => $errorFormat,
            ],
            JsonResponse::HTTP_BAD_REQUEST
        ));
    }
}
