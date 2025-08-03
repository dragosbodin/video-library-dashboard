import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import cx from 'classnames'

import styles from './Loader.module.scss'

type LoaderProps = {
    size?: 'small' | 'medium' | 'large'
    spinning?: boolean
    className?: string
    children?: React.ReactNode
}

export const Loader = ({
    size = 'medium',
    spinning,
    className,
    children,
}: LoaderProps) => {
    if (!spinning && !!children) {
        return children
    }

    return (
        <Spin
            indicator={<LoadingOutlined spin />}
            className={cx(styles.loader, className, styles[`loader--${size}`])}
        />
    )
}
