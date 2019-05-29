const url = "https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0"

module.exports = {
    configureWebpack:{
        devServer:{
            port:8000,
            proxy:{
                "/api":{
                    target: "https://api.itooi.cn",
                    changeOrigin:true
                }
            }
        }
    }
} 