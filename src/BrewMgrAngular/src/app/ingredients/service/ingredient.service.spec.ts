/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { TestBed, async, inject } from '@angular/core/testing';
import { IngredientService } from './ingredient.service';
import {
    BaseRequestOptions, RequestOptions, Response,
    ResponseOptions, ConnectionBackend, Http
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {default as testdata} from './testdata';
import { Hop } from '../model/hop.model';

describe('Ingredient Service component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: RequestOptions, useClass: BaseRequestOptions },
                { provide: ConnectionBackend, useClass: MockBackend },
                Http,
                IngredientService
            ]
        });
    });

    it('should return some hops',
        inject([ConnectionBackend, IngredientService],
            (backend: MockBackend, service: IngredientService) => {
                //Setup
                let items: Hop[] = null;


                backend.connections.subscribe((c: MockConnection) => {
                    expect(c.request.url).toEqual('/api/ingredient/hops');
                    c.mockRespond(new Response(
                        new ResponseOptions(
                            {
                                body: JSON.stringify(testdata)
                            })));
                });

                //Do it
                service.getHops().subscribe((q) => {
                    items = q;
                });

                //Assert
                backend.verifyNoPendingRequests();
                expect(items.length).toBe(1);
                assert.equal(items[0].name,'Admiral','Should have been Admral!!');
            }));
});
