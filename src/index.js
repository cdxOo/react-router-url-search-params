import 'url-search-params-polyfill';
import { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';

const useURLSearchParams = () => {
    let history = useHistory()
    let location = useLocation();

    let paramsPOJO = useMemo(() => {
        let params = new URLSearchParams(location.search);
        
        let paramsPOJO = {};
        for (let key of params.keys()) {
            paramsPOJO[key] = params.get(key);
        }

        return paramsPOJO;
    }, [ location ])

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

    return [ paramsPojo, updateParams ];
}

export default useURLSearchParams;
