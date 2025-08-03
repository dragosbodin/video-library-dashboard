import { Alert, Button, Flex, Select, Space, Typography } from 'antd'
import React, { useState } from 'react'

import { sortOptions } from 'constants/constants'
import { VideoList } from 'pages/VideosPage/components/VideoList'
import { useVideos } from 'pages/VideosPage/useVideos'
import { VideoSortOption } from 'types/App'
import { PageTitle } from 'ui/PageTitle'

export const VideosPage = () => {
    const [sortBy, setSortBy] = useState<VideoSortOption>('created_at-desc')
    const { videos, videosLoading, videosError, refetchVideos } = useVideos({ sortBy })

    const handleChangeSortBy = (value: VideoSortOption) => {
        setSortBy(value)
    }

    return (
        <>
            <PageTitle title="my videos" />
            <div className="page">
                <Flex gap={24} vertical>
                    <Space>
                        <Typography.Text>sort by</Typography.Text>
                        <Select
                            value={sortBy}
                            onChange={handleChangeSortBy}
                            options={sortOptions}
                        />
                    </Space>
                    {videosError && (
                        <Alert
                            message="Failed to retrieve videos"
                            showIcon
                            description="Please try again later."
                            type="error"
                            action={
                                <Button
                                    size="small"
                                    onClick={() => refetchVideos()}
                                    danger
                                >
                                    Retry
                                </Button>
                            }
                        />
                    )}
                    <VideoList isLoading={videosLoading} videos={videos} />
                </Flex>
            </div>
        </>
    )
}
