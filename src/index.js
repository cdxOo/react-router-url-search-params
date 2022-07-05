import 'url-search-params-polyfill';
import { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';

const defaultParse = (queryRaw) => {
    return queryRaw;
}

const defaultPrepare = (obj) => {
    return obj;
}

export const useURLSearchParams = (bag = {}) => {
    let {
        defaults,
        parseReceived = defaultParse,
        prepareUpdate = defaultPrepare,
    } = bag;

    let history = useHistory()
    let location = useLocation();

    let query = useMemo(() => {
        let params = new URLSearchParams(location.search);
        
        let paramsPOJO = { ...defaults };
        for (let key of params.keys()) {
            paramsPOJO[key] = params.get(key);
        }

        var parsed = parseReceived(paramsPOJO);

        return parsed;
    }, [ location ])

    let updateQuery = useCallback((obj, options = {}) => {
        let {
            // TODO deprecate 'push true' in favor of action = 'none'
            push = true,
            action = 'push',
            mergedUpdate = false,
        } = options;

        if (mergedUpdate) {
            obj = { ...query, ...obj };
        }

        var prepared = prepareUpdate(obj);
        let stringified = (new URLSearchParams(prepared)).toString();
        
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

    return [ query, updateQuery ];
}

export default useURLSearchParams;
