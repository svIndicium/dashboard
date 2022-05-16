declare module NodeJS {
    interface Global {
        config?: {
            developmentMode?: boolean
        }
        apiConfig?: {
            authenticationRootUrl?: string
            eventsRootUrl?: string
        }
    }
}
