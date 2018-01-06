export default function getConfig() {
    if (process.env.NODE_ENV === 'development') {
        return require('../bootstrap-development');
    }
    return require('../bootstrap-production');
}