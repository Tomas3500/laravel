<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
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
        return [
            'user_id' => 'required|integer|exists:users,id',
            'city_id' => 'required|integer|exists:cities,id',
            'currency_id' => 'required|integer|exists:currencies,id',
            'position' => 'required|string|min:8',
            'description' => 'required|string|min:3|max:255',
            'phone' => 'required|string|min:11',
            'price' => 'required|string|max:11'

            //
        ];
    }

    public function messages()
    {
        return [
            'position.required' => 'Заполните должность полее не менне 8 символов',
            'phone.required' => 'Заполните номер телефона полее не менне 11 символов',
            'price.required' => 'Заполните заработную плату',
            'description.required' => 'Заполните заработную плату',
        ];
    }
}
