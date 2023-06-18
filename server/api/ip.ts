export default defineEventHandler(async (event) => {
    const ip = event.node.req.headers["x-forwarded-for"];
    // When on localhost, comment the url with the ip and use the other one
    const url = useRuntimeConfig().public.apiBaseUrl + `/internal/tools/geoip/${ip}`
    // const url = `https://app.dev.unlocator.com/api/v2/web/tools/geoip/`
    return await $fetch(url, {
        method: 'GET'
    }).then((res) => {
        // @ts-ignore
        return res.success
    }).catch((err) => {
        console.log(err)
    });
});
