# @cdxoo/react-router-url-search-params

Hook to access and update url search params in conjunction with react-router.

## Installation

    npm install --save @cdxoo/react-router-url-search-params
    
## Usage

```jsx
import React from 'react';
import useURLSearchParams from '@cdxoo/react-router-url-search-params';

// in this component updateQuery pushes the history with
// the updated search params when button is clicked
const MyComponent = () => {
    let [ query, updateQuery ] = useURLSearchParams({ defaults: {
        foo: 'bar',
    }});

    let handleClick = () => {
        updateQuery({ foo: 'baz', other: 'some-value' });
    }

    return (
        <div>
            <button onClick={ handleClick }>click</button>
            <div>{ query.foo }</div>
            <div>{ query.other }</div>
        </div>
    );
}

// you can disable the automatic history push in updateQuery
// in case you want to use the updated search query string elsewhere
// e.g. in <a href='...'>
const OtherComponent = () => {
    let [ query, updateQuery ] = useURLSearchParams({ defaults: {
        foo: 'bar',
    }});

    let nextSearchQuery = updateQuery({ other: 'next' })
    return (
        <div>
            <div>{ query.foo }</div>
            <div>{ query.other }</div>
            <a href={ `/my-url/${nextSearchQuery}`}>
        </div>
    )
}
