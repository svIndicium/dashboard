import { Context } from "@nuxt/types"

import { eventBus } from "@svindicium/components/api"

export default (_: Context, inject: any): void => {
    inject("eventBus", eventBus)
}
