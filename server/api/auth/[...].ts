import {NuxtAuthHandler} from '#auth'
import useCustomFetch from "~/composables/useCustomFetch";
import {object, string} from "yup";
import {hasProperty} from "dot-prop";

const mainConfig = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    providers: [
        {
            id: 'passport',
            name: 'Passport',
            type: 'oauth',
            version: '2.0',
            authorization: {
                url: mainConfig.oauthLoginUrl,
                params: {
                    scope: '',
                    prompt: 'front',
                },
            },
            clientSecret: 'awd',
            clientId: mainConfig.oauthClientId,
            token: {
                url: mainConfig.oauthTokenUrl,
            },
            userinfo: {
                url: mainConfig.oauthUserUrl,
            },
            checks: ['pkce', 'state'],
            profile(profile: { success: { user: any } }) {
                const data = profile.success.user
                return {
                    id: data.id,
                    name: data.user_details?.first_name + " " + data.user_details?.last_name,
                    email: data.email,
                };
            },
            idToken: false,
        }
    ],
    cookies: {},
    callbacks: {
        async jwt({token, account, user}) {
            if (account && user) {
                return {
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    accessTokenExpires: account.expires_at,
                    user
                }
            }
            // @ts-ignore
            if (Date.now() < token.accessTokenExpires * 1000) {
                return token
            }

            return await refreshAccessToken(token);
        },
        async session({session, token}) {
            // @ts-ignore
            session.user = token.user
            // @ts-ignore
            session.access_token = token.access_token
            // @ts-ignore
            session.error = token.error
            return session
        },
    },
    events: {
        async signOut({session, token}) {
            try {
                let access_token: string | null = null;
                if (token.access_token && typeof (token.access_token) == "string") {
                    access_token = token.access_token;
                }
                // @ts-ignore
                else if(session.hasOwnProperty("access_token") && typeof (session.access_token) == "string")
                {
                    // @ts-ignore
                    access_token = session.access_token;
                }

                await useCustomFetch('/oauth/tokens/revoke', {
                    method: 'POST'
                }, access_token).then((response: any) => {
                });
            } catch (e) {
                console.log(e);
            }
        },
    }
})

async function refreshAccessToken(token: any) {
    try {
        const url = mainConfig.oauthTokenUrl;

        // @ts-ignore
        const refreshedToken: AuthResponse = await $fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: {
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token,
                client_id: mainConfig.oauthClientId
            }
        });
        token.access_token = refreshedToken.access_token;
        token.accessTokenExpires = Date.now() + refreshedToken.expires_at * 1000;
        token.refresh_token = refreshedToken.refresh_token;
        return {
            ...token
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError2",
        }
    }
}

interface AuthResponse {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_at: number,
}
