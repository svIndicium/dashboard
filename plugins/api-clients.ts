import { Context } from "@nuxt/types"

import { EventClient } from "@svindicium/components/api/clients/Events"
import { AuthenticationClient } from "@svindicium/components/api/clients/Authentication"
import { authenticationClient, gateway, eventClient } from "@svindicium/components/api"

export default (_: Context, inject: any): void => {
    inject("gateway", gateway)
    inject(AuthenticationClient.NAME, authenticationClient)
    inject(EventClient.NAME, eventClient)
}
