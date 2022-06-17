<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileStoreRequest;
use App\Models\Sammary;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser;
use Barryvdh\DomPDF\Facade\Pdf;


class FileController extends Controller
{
    //

    public function store(FileStoreRequest $request)
    {
        $validated = $request->validated();

        $path = Storage::putFileAs('files', $request->file('file'), $request->file('file')->getClientOriginalName());

        $validated['file'] = $path;
        $validated['user_id'] = auth()->user()->id;

        Sammary::create($validated);

        return  redirect()->route('summary.index');
    }

    public function download($id)
    {
        $dl = Sammary::find($id);

        if (Storage::exists($dl->file)) {
            return Storage::download($dl->file);
        }
        return abort(404);
    }
}
