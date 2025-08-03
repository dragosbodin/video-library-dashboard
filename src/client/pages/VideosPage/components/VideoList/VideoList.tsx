import { PlusCircleOutlined } from '@ant-design/icons'
import { Video } from '@prisma/client'
import { Col, Flex, Row, Tag, Typography } from 'antd'
import cx from 'classnames'
import dayjs from 'dayjs'
import { Link } from 'react-router'

import { paths } from 'router/routes'
import { Loader } from 'ui/Loader'

import styles from './VideoList.module.scss'

type VideoListProps = {
    videos: Video[]
    isLoading: boolean
    className?: string
}

export const VideoList = ({ videos, isLoading, className }: VideoListProps) => {
    return (
        <Row gutter={[24, 24]} className={cx(styles.videos, className)}>
            {isLoading && (
                <Col flex="240px" className={cx(styles.video, styles['video--add'])}>
                    <div className={cx(styles.video__thumb, styles['video__thumb--add'])}>
                        <Loader size="medium" />
                    </div>
                </Col>
            )}
            {videos.map((video) => {
                const tags = video.tags ? video.tags.split(',') : []

                return (
                    <Col flex="240px" key={video.id} className={styles.video}>
                        <div className={styles.video__thumb}>
                            <img src={video.thumbnail_url} alt={video.title} />
                            {tags.length > 0 && (
                                <Flex gap="2px" wrap className={styles.video__tags}>
                                    {tags.map((tag) => (
                                        <Tag color="magenta" key={tag}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </Flex>
                            )}
                        </div>
                        <Typography.Title level={5} className={styles.video__name}>
                            {video.title}
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            {dayjs(video.created_at).format('MMM D, YYYY - HH:mm')}
                        </Typography.Text>
                        <Link
                            to={`/videos/${video.id}`}
                            className={styles.video__action}
                        />
                    </Col>
                )
            })}
            <Col flex="240px" className={cx(styles.video, styles['video--add'])}>
                <div className={cx(styles.video__thumb, styles['video__thumb--add'])}>
                    <PlusCircleOutlined />
                </div>
                <div className={styles.video__add}>add a video</div>
                <Link to={paths.addVideo} className={styles.video__action} />
            </Col>
        </Row>
    )
}
