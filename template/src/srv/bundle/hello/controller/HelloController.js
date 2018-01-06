export default class DashboardController {

    async renderIndex(ctx, next) {
        await ctx.render(
            'index',
            {
                serverState: {}
            }
        );
    }
}


