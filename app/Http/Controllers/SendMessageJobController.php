<?php

namespace App\Http\Controllers;

use App\Jobs\SendNewJobsJob;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendMessageJobController extends Controller
{
    //
    public function messege(Request $request)
    {


        $request->validate([
            'email' => 'required|email:rfc,dns'
        ]);


        $info = [
            'email' => $request->email
        ];


        SendNewJobsJob::dispatch($info);

        return redirect()->route('index');
    }
}
