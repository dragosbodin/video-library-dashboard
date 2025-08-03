import { useQuery } from '@tanstack/react-query'

import { useTrpcContext } from 'core/hooks/useTrpcContext'
import { VideoSortOption } from 'types/App'

type UseVideosOptions = {
    sortBy: VideoSortOption
}

export const useVideos = ({ sortBy }: UseVideosOptions) => {
    const trpc = useTrpcContext()
    const {
        data: videosData,
        isLoading: videosLoading,
        isError: videosError,
        refetch: refetchVideos,
    } = useQuery(trpc.video.index.queryOptions({ sortBy }))
    const videos = videosData ?? []

    return {
        videos,
        videosLoading,
        videosError,
        refetchVideos,
    }
}
