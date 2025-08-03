import { Menu, MenuProps } from 'antd'
import { matchRoutes, useLocation, useNavigate } from 'react-router'

import { routes } from 'router/routes'
import { MenuInfo } from 'types/App'

import styles from './NavigationBar.module.scss'

const items: MenuProps['items'] = [
    {
        label: 'my account',
        key: '/my-account',
    },
    {
        label: 'my videos',
        key: '/videos',
    },
    {
        label: 'add video',
        key: '/videos/add',
    },
    {
        label: 'analytics',
        key: 'analytics',
    },
]

export const NavigationBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const matches = matchRoutes(routes, location)
    const selectedMenuKeys =
        matches?.map((match) => {
            return `/${match.route.path?.split('/')[1]}` || ''
        }) ?? []

    const handleMenuClick = ({ key }: MenuInfo) => {
        navigate(key)
    }

    return (
        <Menu
            onClick={handleMenuClick}
            selectedKeys={selectedMenuKeys}
            mode="horizontal"
            items={items}
            className={styles.accountNavigation}
        />
    )
}
