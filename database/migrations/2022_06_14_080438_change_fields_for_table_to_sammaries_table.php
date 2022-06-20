<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFieldsForTableToSammariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sammaries', function (Blueprint $table) {
            $table->string('first_name')->nullable()->change();
            $table->string('last_name')->nullable()->change();
            $table->string('position')->nullable()->change();
            $table->string('city')->nullable()->change();
            $table->string('experienec')->nullable()->change();
            $table->text('education')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sammaries', function (Blueprint $table) {
            //
            $table->string('first_name')->change();
            $table->string('last_name')->change();
            $table->string('position')->change();
            $table->string('city')->change();
            $table->string('experienec')->change();
            $table->text('education')->change();
        });
    }
}
