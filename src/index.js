export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    const { success } = await env.RATE_LIMITER.limit({ key: pathname })
    if (!success) {
      return new Response(`429 Failure — rate limit exceeded for ${pathname}`, { status: 429 })
    }

    return new Response(`Success!`)
  }
}
