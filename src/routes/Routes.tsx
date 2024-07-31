import { useRoutes } from 'react-router-dom'
import { AppRoutes } from '.'

export default function Routes() {
    return useRoutes([...AppRoutes])
}
