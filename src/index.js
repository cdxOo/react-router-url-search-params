import 'url-search-params-polyfill';
import { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';

export const useURLSearchParams = ({
    defaults
} = {}) => {
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

    let updateParams = useCallback((obj, { push = true } = {}) => {
        let stringified = (new URLSearchParams(obj)).toString();
        
        if (push) {
            history.push({
                pathname: location.pathname,
                search: stringified
            });
        }

        return stringified;
    }, [ history, location ])

    return [ paramsPOJO, updateParams ];
}

export default useURLSearchParams;
