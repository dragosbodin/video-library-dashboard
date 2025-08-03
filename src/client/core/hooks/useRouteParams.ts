import { useParams } from 'react-router'

export const useRouteParams = (...params: string[]) => {
    const routeParams = useParams()

    return Object.keys(routeParams).map((key, index) => {
        return routeParams[params[index]] ?? ''
    })
}
