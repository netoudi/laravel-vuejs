<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ClientsTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        // $this->call(BanksTableSeeder::class);
        $this->call(BankAccountsTableSeeder::class);
        $this->call(BillPaysTableSeeder::class);
        $this->call(BillReceivesTableSeeder::class);
    }
}
