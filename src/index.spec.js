import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory as createHistory } from 'history';
import { Router, Route } from 'react-router';

import useURLSearchParams from './index.js'

describe('useURLSearchParams()', () => {
    const node = document.createElement('div');

    const StrictMode = (
        React.StrictMode
        ? React.StrictMode
        : (ps) => {
            return props.children || null;
        }
    );

    const renderStrict = (stuff) => {
        ReactDOM.render(<StrictMode>{ stuff }</StrictMode>, node)
    }

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(node);
    });

    test('gets search params from url', () => {
        const history = createHistory({
            initialEntries: [ '/?foo=bar' ]
        });

        const Component = () => {
            let [ query, updateQuery ] = useURLSearchParams();

            return (<div>{ query.foo }</div>)
        }

        renderStrict(
            <Router history={ history }>
                <Route>
                    <Component />
                </Route>
            </Router>
        );

        expect(node.innerHTML).toContain('bar');
    });
});
