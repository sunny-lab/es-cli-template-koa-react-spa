export default class HelloController {

    async renderIndex(ctx, next) {
        await ctx.render(
            'index',
            {
                serverState: {}
            }
        );
    }
}


