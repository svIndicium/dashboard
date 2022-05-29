import { merge } from "lodash-es"

import baseTranslations from "@svindicium/components/i18n/nl-NL"

const translations = {
    name: {
        full: "Studievereniging Indicium",
        short: "Indicium"
    },
    general: {
        username: "Gebruikersnaam",
        password: "Wachtwoord",
        yes: "ja",
        no: "nee"
    },
    enums: {},
    layout: {
        header: {
            title: "@:(name.full)"
        },
        sidebar: {
            home: "Home",
            events: "Activiteiten"
        },
        dashboard: {
            widgets: {
                welcome: {
                    title: "Welkom"
                },
                comingEvents: {
                    title: "Aankomende activiteiten"
                }
            }
        }
    },
    pages: {
        login: {
            title: "Inloggen",
            subtitle: "Log hier in met jouw Indicium account",
            alerts: {
                loginFailed: "Inloggen mislukt, probeer opnieuw"
            },
            buttons: {
                login: "Inloggen"
            }
        },
        events: {
            create: {
                title: "Naam van de activiteit",
                description: "Beschrijving van de activiteit",
                slug: "Unieke activiteitsnaam",
                startDateTime: "Start van de activiteit",
                endDateTime: "Eind van de activiteit"
            }
        }
    }
}

export default merge(baseTranslations, translations)
