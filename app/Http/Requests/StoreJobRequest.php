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
            // 'category_id' => 'required|integer|exists:categories,id',
            'position' => 'required|string|min:3|max:50',
            'description' => 'nullable|string|min:3|max:255',
            // 'city' => 'nullable|string|min:3|max:50',
            'phone' => 'required|string|max:11',
            'price' => 'required|string|max:11'

            //
        ];
    }

    public function messages()
    {
        return [
            'position.required' => 'Заполните должность',
            'phone.required' => 'Заполните номер телефона',
            'price.required' => 'Заполните заработную плату',
        ];
    }
}
