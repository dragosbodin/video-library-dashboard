export interface PageModel {
    apiUrl: string
    basePath: string
    environment: string
    env: string
    applicationVersion: string
}

export interface MenuInfo {
    key: string
    keyPath: string[]
}

export type User = {
    id: number
    name: string
    email: string
    emailVerifiedAt: string | null
    twoFactorConfirmedAt: string | null
    createdAt: string
    updatedAt: string
    profilePhotoUrl: string
}

export type VideoSortOption = 'created_at-asc' | 'created_at-desc'
