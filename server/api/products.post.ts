
export default defineEventHandler(async (event) => {
    const mainConfig = useRuntimeConfig();
    const body = await readBody(event);
    const ip = body.ip;
    return await $fetch(mainConfig.public.apiBaseUrl + '/internal/products', {
        method: 'get',
        params: {
            'category': 'web',
            'gateway': 'paddle',
            'ip': ip
        },
    }).then((res) => {
        // @ts-ignore
        return res.success
    }).catch((err) => {
        console.log(err)
    });
})
