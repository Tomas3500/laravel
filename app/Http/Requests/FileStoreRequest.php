<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileStoreRequest extends FormRequest
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

            'file' => 'required|file|max:5000|mimes:pdf'
            //
        ];
    }
    public function messages()
    {
        return [
            'file.required' => 'добавьте файл'
        ];
    }
}
