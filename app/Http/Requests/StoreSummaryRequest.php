<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSummaryRequest extends FormRequest
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
            'first_name' => 'required|string|min:4|max:20',
            'last_name' => 'required|string|min:4|max:20',
            'position' => 'required|string|min:5',
            'city' => 'nullable|string|min:5',
            'experienec' => 'required|string|min:3|max:50',
            'education' => 'required|string|min:10|max:250'

        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Заполните имя',
            'last_name.required' => 'Заполните фамилию',
            'position.required' => 'Заполните должность',
            'experienec.required' => 'Заполните Ваш опыт работы',
            'education.required' => 'Заполните заполните описание'
        ];
    }
}
