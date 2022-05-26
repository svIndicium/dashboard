import { Context } from "@nuxt/types"
import { AuthenticationClient } from "~/api/clients/Authentication"
import { authenticationClient, gateway } from "~/api"

export default (_: Context, inject: any): void => {
    inject("gateway", gateway)
    inject(AuthenticationClient.NAME, authenticationClient)
}
