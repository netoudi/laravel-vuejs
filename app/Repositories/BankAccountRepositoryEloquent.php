<?php

namespace CodeBills\Repositories;

use CodeBills\Criteria\LockTableCriteria;
use CodeBills\Events\BankAccountBalanceUpdatedEvent;
use CodeBills\Models\BankAccount;
use CodeBills\Presenters\BankAccountPresenter;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class BankAccountRepositoryEloquent
 *
 * @package namespace CodeBills\Repositories;
 */
class BankAccountRepositoryEloquent extends BaseRepository implements BankAccountRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
        'agency' => 'like',
        'account' => 'like',
        'bank.name' => 'like',
    ];

    public function addBalance($id, $value)
    {
        $skipPresenter = $this->skipPresenter;
        $this->skipPresenter(true);

        \DB::beginTransaction();
        $this->pushCriteria(new LockTableCriteria());
        $model = $this->find($id);
        $model->balance = $model->balance + $value;
        $model->save();
        \DB::commit();

        if (!app()->runningInConsole()) {
            broadcast(new BankAccountBalanceUpdatedEvent($model));
        }

        $this->popCriteria(LockTableCriteria::class);
        $this->skipPresenter = $skipPresenter;

        return $this->parserResult($model);
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return BankAccount::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function presenter()
    {
        return BankAccountPresenter::class;
    }
}
