<?php

namespace App\Jobs;

use App\Models\City;
use App\Models\Job as ModelsJob;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNewJobsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $info;

    /**
     * Create a new job instance.
     *
     *
     * @return void
     */
    public function __construct(array $info)
    {


        $this->info = $info;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {


        $jobs =  ModelsJob::all();


        Mail::send('emails.mail', ['jobs' => $jobs], function ($message) {
            $message->to($this->info['email'])->subject('Вакансии');
            $message->from('palmo.example@gmail.com', 'From Palmo');
        });
    }
}
