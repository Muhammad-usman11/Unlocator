module.exports = {
    apps: [
        {
            name: 'Unlocator',
            port: '80',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
