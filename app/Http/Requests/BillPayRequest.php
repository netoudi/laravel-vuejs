<?php

namespace CodeBills\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BillPayRequest extends FormRequest
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
        $client = \Auth::guard('api')->user()->client;

        return [
            'date_due' => 'required|date_format:Y-m-d',
            'name' => 'required|max:255',
            'value' => 'required|numeric',
            'done' => 'boolean',
            'bank_account_id' => Rule::exists('bank_accounts', 'id')
                                     ->where(function ($query) use ($client) {
                                         return $query->where('client_id', $client->id);
                                     }),
            'category_id' => Rule::exists('category_expenses', 'id')
                                 ->where(function ($query) use ($client) {
                                     return $query->where('client_id', $client->id);
                                 }),
            'repeat_number' => 'required_if:repeat,true|integer|min:0',
            'repeat_type' => 'required_if:repeat,true|in:1,2',
        ];
    }
}
