import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link, Outlet } from 'react-router'

import { useAppContext } from 'core/hooks'
import { paths } from 'router/routes'
import { Loader } from 'ui/Loader'

import styles from './Layout.module.scss'

type LayoutProps = {
    navigationBar: React.ReactNode
}

export const Layout = ({ navigationBar }: LayoutProps) => {
    const { userLoading } = useAppContext()

    return (
        <>
            {navigationBar}
            <div className={styles.layout}>
                <div className={styles.sidebar}>
                    <Link to={paths.videos} className={styles.sidebar__logo}>
                        <img
                            src="/logo.svg"
                            alt="Video Library Dashboard"
                            className={styles.sidebar__logoImage}
                        />
                    </Link>
                    <div className={styles.sidebar__actions}>
                        <div className={styles.sidebar__action}>
                            <Button type="text" icon={<UserOutlined />} size="large" />
                        </div>
                        <div className={styles.sidebar__action}>
                            <Button type="text" icon={<LogoutOutlined />} size="large" />
                        </div>
                    </div>
                </div>
                <main className={styles.main}>
                    {userLoading ? (
                        <Loader size="large" className={styles.main__loader} />
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </>
    )
}
