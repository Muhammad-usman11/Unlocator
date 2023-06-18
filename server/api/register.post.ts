export default defineEventHandler(async (event) => {
  const mainConfig = useRuntimeConfig();
  const body = await readBody(event);
  const ip = event.node.req.headers['x-forwarded-for'];
  const userAgent = event.node.req.headers['user-agent'];
  body.source = 'web-checkout';
  body.ip = ip;
  body.gateway = 'paddle';
  body.user_agent = userAgent;

  let result;

  const resp = await $fetch(
    mainConfig.public.apiBaseUrl + '/internal/user/register',
    {
      method: 'POST',
      body: body,
    }
  )
    .then((res: any) => {
      console.log(res);
      //@ts-ignore
      result = res.success;
      return res.success;
    })
    .catch((err) => {
      console.log(err);
      result = err.data;
      throw createError({
        statusCode: 400,
        statusMessage: err.data.message,
      });
    });

  return result;
});
