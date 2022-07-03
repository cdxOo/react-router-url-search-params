import 'url-search-params-polyfill';
import { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';

export const useURLSearchParams = (bag = {}) => {
    let { defaults } = bag;

    let history = useHistory()
    let location = useLocation();

    let paramsPOJO = useMemo(() => {
        let params = new URLSearchParams(location.search);
        
        let paramsPOJO = { ...defaults };
        for (let key of params.keys()) {
            paramsPOJO[key] = params.get(key);
        }

        return paramsPOJO;
    }, [ location, defaults ])

    let updateParams = useCallback((obj, options = {}) => {
        let {
            // TODO deprecate 'push true' in favor of action = 'none'
            push = true,
            action = 'push',
        } = options;

        let stringified = (new URLSearchParams(obj)).toString();
        
        switch (action) {
            case 'push':
                if (push) {
                    history.push({
                        pathname: location.pathname,
                        search: stringified
                    });
                }
                break;
            case 'replace':
                history.replace({
                    pathname: location.pathname,
                    search: stringified
                });
                break;
            case 'none':
                break;
            default:
                throw new Error(`unknown action "${action}"`);
        }

        return stringified;
    }, [ history, location ])

    return [ paramsPOJO, updateParams ];
}

export default useURLSearchParams;
