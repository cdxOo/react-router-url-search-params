import React from 'react';
import ReactDOM from 'react-dom';
import { screen, render, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory as createHistory } from 'history';
import { Router, Route } from 'react-router';

import useURLSearchParams from './index.js'

describe('useURLSearchParams()', () => {
    test('gets search params from url', () => {
        const history = createHistory({
            initialEntries: [ '/?foo=bar' ]
        });

        const Component = () => {
            let [ query, updateQuery ] = useURLSearchParams();
            return (<div>{ query.foo }</div>)
        }

        const { getByText } = render(
            <Router history={ history }>
                <Route>
                    <Component />
                </Route>
            </Router>
        );

        expect(getByText('bar')).toBeTruthy();
    });

    test('pushes history when updateQuery is called', () => {
         const history = createHistory({
            initialEntries: [ '/?foo=bar' ]
        });

        const Component = () => {
            let [ query, updateQuery ] = useURLSearchParams();
            let handle = () => {
                updateQuery({ foo: 'baz' })
            }
            return (
                <div>
                    <a onClick={ () => handle() }>click</a>
                    { query.foo }
                </div>)
        }

        const { getByText } = render(
            <Router history={ history }>
                <Route>
                    <Component />
                </Route>
            </Router>
        );

        expect(getByText('bar')).toBeTruthy();
        fireEvent.click(getByText('click'));
        expect(getByText('baz')).toBeTruthy();
    })
});
