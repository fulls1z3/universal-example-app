import { Injectable } from '@angular/core';
import { EMPTY_UNIQUE_ID, ERROR__NO_PAYLOAD } from '@fulls1z3/shared/util-store';
import { Actions, Effect } from '@ngrx/effects';
import { flow, get, isEmpty, isNil, negate } from 'lodash/fp';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { airlineActions } from './airline.actions';
import { AirlineService } from './airline.service';

const validateGetOne = payload => !isEmpty(payload);

const validateCreateOne = payload => flow(get('resource'), negate(isNil))(payload);

const validateUpdateOne = payload => flow(get('id'), negate(isNil))(payload.resource);

const validateDeleteOne = payload => !isNil(payload.id);

@Injectable()
export class AirlineEffects {
  @Effect() readonly getMany$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalGetManyAirlines),
    switchMap(() =>
      this.airline.getMany$().pipe(
        map(airlineActions.airUniversalGetManyAirlinesSuccess),
        catchError(error => of(airlineActions.airUniversalGetManyAirlinesFail(error.message)))
      )
    )
  );

  @Effect() readonly getOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalGetOneAirline),
    map(get('payload')),
    switchMap(payload =>
      validateGetOne(payload)
        ? this.airline.getOne$(payload).pipe(
            map(airlineActions.airUniversalGetOneAirlineSuccess),
            catchError(error => of(airlineActions.airUniversalGetOneAirlineFail(error.message)))
          )
        : of(airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message))
    )
  );

  @Effect() readonly createOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalCreateOneAirline),
    map(get('payload')),
    switchMap(payload =>
      validateCreateOne(payload)
        ? this.airline.createOne$(payload.resource).pipe(
            map(airlineActions.airUniversalCreateOneAirlineSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              of(
                airlineActions.airUniversalCreateOneAirlineFail({
                  id: EMPTY_UNIQUE_ID,
                  error: error.message
                })
              )
            )
          )
        : of(
            airlineActions.airUniversalCreateOneAirlineFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() readonly updateOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalUpdateOneAirline),
    map(get('payload')),
    switchMap(payload =>
      validateUpdateOne(payload)
        ? this.airline.updateOne$(payload.resource).pipe(
            map(airlineActions.airUniversalUpdateOneAirlineSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              of(
                airlineActions.airUniversalUpdateOneAirlineFail({
                  id: payload.resource.id,
                  error: error.message
                })
              )
            )
          )
        : of(
            airlineActions.airUniversalUpdateOneAirlineFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() readonly deleteOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalDeleteOneAirline),
    map(get('payload')),
    switchMap(payload =>
      validateDeleteOne(payload)
        ? this.airline.deleteOne$(payload.id).pipe(
            map(airlineActions.airUniversalDeleteOneAirlineSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              of(
                airlineActions.airUniversalDeleteOneAirlineFail({
                  id: payload.id,
                  error: error.message
                })
              )
            )
          )
        : of(
            airlineActions.airUniversalDeleteOneAirlineFail({
              id: payload.id,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  constructor(private readonly actions$: Actions, private readonly airline: AirlineService) {}
}
