import { FormInstance } from 'antd'
import { useRef } from 'react'

import { VideoField, VideoForm } from 'pages/CreateVideoPage/components/VideoForm'
import { useCreateVideo } from 'pages/CreateVideoPage/useCreateVideo'
import { paths } from 'router/routes'
import { PageTitle } from 'ui/PageTitle'

export const CreateVideoPage = () => {
    const { createVideo, createVideoPending, createVideoError } = useCreateVideo()

    const formRef = useRef<FormInstance<VideoField> | null>(null)

    const handleFormFinish = async (video: VideoField) => {
        void createVideo(video)
    }

    return (
        <>
            <PageTitle
                title="my videos"
                heading="Add a new video"
                backLink={paths.videos}
            />
            <div className="page">
                <VideoForm
                    formRef={formRef}
                    videoPending={createVideoPending}
                    videoError={createVideoError}
                    onFinish={handleFormFinish}
                />
            </div>
        </>
    )
}
