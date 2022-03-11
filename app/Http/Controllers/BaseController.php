<?php

use App\Services\Sammary\Service;


class BaseController
{
    protected $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }
}
