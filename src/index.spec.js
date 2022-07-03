import React, { useState } from 'react';
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

        expect(history.entries.length).toEqual(2);
    });

    test('replaces on updateQuery(..., { action: "replace" })', () => {
         const history = createHistory({
            initialEntries: [ '/?foo=bar' ]
        });

        const Component = () => {
            let [ query, updateQuery ] = useURLSearchParams();
            let handle = () => {
                updateQuery({ foo: 'baz' }, { action: 'replace' })
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

        expect(history.entries.length).toEqual(1);
    });
    test('updateQuery does not push history when disabled', () => {
        const history = createHistory({
            initialEntries: [ '/?foo=bar' ]
        });

        const Component = () => {
            let [ query, updateQuery ] = useURLSearchParams();
            let [ state, setState ] = useState('XXX');
            let handle = () => {
                let str = updateQuery({ foo: 'baz' }, { push: false });
                setState(str);
            }
            return (
                <div>
                    <a onClick={ () => handle() }>click</a>
                    <span>{ query.foo }</span>
                    <span>{ state }</span>
                </div>
            )
        }

        const { getByText } = render(
            <Router history={ history }>
                <Route>
                    <Component />
                </Route>
            </Router>
        );

        expect(getByText('bar')).toBeTruthy();
        expect(getByText('XXX')).toBeTruthy();

        fireEvent.click(getByText('click'));
        
        expect(getByText('bar')).toBeTruthy();
        expect(getByText('foo=baz')).toBeTruthy();
    })

    test('merges given default values', () => {
        const history = createHistory({
            initialEntries: [ '/?foo=bar' ]
        });

        const Component = () => {
            let [ query, updateQuery ] = useURLSearchParams({ defaults: {
                user: 'alice',
            }});
            return (
                <div>
                    <span>{ query.foo }</span>
                    <span>{ query.user }</span>
                </div>
            )
        }

        const { getByText } = render(
            <Router history={ history }>
                <Route>
                    <Component />
                </Route>
            </Router>
        );

        expect(getByText('bar')).toBeTruthy();
        expect(getByText('alice')).toBeTruthy();

    })


    test('updateQuery does not trigger history when action "none"', () => {
        const history = createHistory({
            initialEntries: [ '/?foo=bar' ]
        });

        const Component = () => {
            let [ query, updateQuery ] = useURLSearchParams();
            let [ state, setState ] = useState('XXX');
            let handle = () => {
                let str = updateQuery({ foo: 'baz' }, { action: 'none' });
                setState(str);
            }
            return (
                <div>
                    <a onClick={ () => handle() }>click</a>
                    <span>{ query.foo }</span>
                    <span>{ state }</span>
                </div>
            )
        }

        const { getByText } = render(
            <Router history={ history }>
                <Route>
                    <Component />
                </Route>
            </Router>
        );

        expect(getByText('bar')).toBeTruthy();
        expect(getByText('XXX')).toBeTruthy();

        fireEvent.click(getByText('click'));
        
        expect(getByText('bar')).toBeTruthy();
        expect(getByText('foo=baz')).toBeTruthy();
    })
});
