<?php

namespace CodeBills\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class FindBetweenDateBRCriteria
 *
 * @package namespace CodeBills\Criteria;
 */
class FindBetweenCreatedAtBRCriteria implements CriteriaInterface
{
    /**
     * @var
     */
    private $dateInString;

    /**
     * FindBetweenDateBRCriteria constructor.
     *
     * @param $dateInString
     */
    public function __construct($dateInString)
    {
        $this->dateInString = $dateInString;
    }

    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        $dates = explode('-', $this->dateInString);

        if (count($dates) > 1) {
            $formatBR = 'd/m/Y';
            $format = 'Y-m-d';
            list($dateStart, $dateEnd) = $dates;
            $dateStart = \DateTime::createFromFormat($formatBR, trim($dateStart));
            $dateEnd = \DateTime::createFromFormat($formatBR, trim($dateEnd));

            if ($dateStart && $dateEnd) {
                $model = $model->orWhere(function ($query) use ($dateStart, $dateEnd, $format) {
                    return $query->whereBetween('created_at', [
                        $dateStart->format($format),
                        $dateEnd->format($format),
                    ]);
                });
            }
        }

        return $model;
    }
}
