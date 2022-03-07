<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreSummaryRequest;
use App\Models\Role;
use App\Models\Sammary;
use App\Models\User;
use BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SummaryController extends Controller
{


    //index
    public function index()

    {
        $summaries = Sammary::all();

        return view('summary.index', ['summaries' => $summaries]);
    }


    public function create()

    {
        return view('summary.create');
    }

    //show

    public function show($id)

    {
        $sammary = Sammary::findOrfail($id);

        return view('summary.show',  ['sammary' => $sammary]);
    }

    //store

    public function store(StoreSummaryRequest $request)
    {

        // $data = $request->validate();
        $data = $request->except('_token');
        Sammary::create($data);
        return redirect()->route('summary.index');
    }

    //edit


    public function edit($id)
    {

        $sammary = Sammary::findOrfail($id);

        // dd(1111);

        return view('summary.edit', ['sammary' => $sammary]);
    }


    //update

    public function update(StoreSummaryRequest $request, $id)
    {

        $data = $request->except('_token', '_method');
        $sammary = Sammary::findOrfail($id);
        $sammary->update($data);

        return redirect()->route('summary.show', $sammary->id);
    }

    ///destroy
    public function destroy($id)
    {
        $sammary = Sammary::find($id);

        $sammary->delete();

        return redirect()->route('summary.index');
    }
}
