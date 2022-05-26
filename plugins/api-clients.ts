import { Context } from "@nuxt/types"
import { AuthenticationClient } from "@svindicium/indicium-components/api/clients/Authentication"
import { authenticationClient, gateway } from "@svindicium/indicium-components/api"

export default (_: Context, inject: any): void => {
    inject("gateway", gateway)
    inject(AuthenticationClient.NAME, authenticationClient)
}
