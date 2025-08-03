import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { useAppContext } from 'core/hooks'
import { useTrpcContext } from 'core/hooks/useTrpcContext'
import { VideoField } from 'pages/CreateVideoPage/components/VideoForm'
import { paths } from 'router/routes'

export const useCreateVideo = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { notify } = useAppContext()
    const trpc = useTrpcContext()

    const {
        mutateAsync: mutateCreateVideo,
        isPending: createVideoPending,
        error: createVideoError,
    } = useMutation(trpc.video.create.mutationOptions())
    const createVideo = async (video: VideoField) => {
        await mutateCreateVideo({
            title: video.title,
            thumbnail_url: `https://picsum.photos/seed/video${Math.floor(Math.random() * (100 - 50 + 1)) + 50}/300/200`,
            duration: Math.floor(Math.random() * (720 - 10 + 1)) + 10,
            tags: video.tags.join(','),
        })
        notify.success({
            message: 'Video created successfully',
        })
        await queryClient.invalidateQueries({ queryKey: trpc.video.index.queryKey() })
        navigate(paths.videos)
    }

    return {
        createVideo,
        createVideoPending,
        createVideoError,
    }
}
