<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchJobOnCityRequest extends FormRequest
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

            'search_jobs' => 'required|string|min:3|max:50',
        ];
    }

    public function messages()
    {
        return [
            'search_jobs.required' => 'некоректно введено название города',

        ];
    }
}
