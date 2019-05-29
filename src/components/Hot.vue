<template>
    <div class="hot">
        
            <ul> 
                   
                 <li class="list-box" v-for="(item,index) in dataList" :key="index"
                 @click="goState({name:'Songlist',params:{dataList:item.id}})">
                    <div class="hot-img" >
                        <img :src="item.coverImgUrl" />
                    </div>
                    <div class="hot-text">
                        <span class="title">{{item.tag}}</span>
                        <span class="text">{{item.title}}</span>
                    </div>
                    <div class="music-number">
                        
                        <span>{{item.songNum}}</span>
                    </div>
                </li> 
            </ul>
        </div>
    
</template>

<script>
import Valuefrom from './valueFrom/valueFrom.js';

export default {
    name:'Hot',
    data(){
        return{
            dataList:[]
        }   
    },
    methods:{
        goState(path){
            this.$router.push(path)
        },
        getSongsList(){

            this.axios.get( "https://api.itooi.cn/music/netease/highQualitySongList?key=579621905&cat=全部&limit=30")
            .then((data) => {
                var songlist = JSON.stringify(data.data.data.playlists.slice(3,30))
                localStorage.setItem('songLists',songlist)
                this.dataList = JSON.parse(localStorage.getItem('songLists')) 
            },() => {
                this.dataList = JSON.parse(localStorage.getItem('songLists'))
                Valuefrom.alert('数据请求失败，请检查网络')
            })
        }
    },
    created(){
        this.getSongsList()
    }
}
</script>

<style lang="less" scoped>
    .hot{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-x:hidden ;
        padding:1.4865rem 0 1.6216rem;;
    }
        // 单个歌单样式

    ul{
        overflow: auto;
         background:#dadada;
    }
    .hot li.list-box{
        width: clac(100% - 0.8108rem);
        display: block;
        padding:0.1351rem 0.4054rem;
        margin:0 0 0.0541rem;
        overflow: auto;
        background: #fff;
       
        // 歌单图片
        .hot-img{
            width: 20%;
            float: left;
            list-style: none;
            img{
                width: 100%;
            }
        }
    }
    // 歌单文本部分
    .hot .hot-text{
        width: calc(65% - 0.5405rem);
        float: left;
        padding: 0 0.2703rem;
        color:#6a6a6a;
        
        span{
            display: block;
            width: 100%;
        }
        span.title{
            font-size: 0.4865rem;
            margin:0.2703rem 0 ;
            color: #ff6700;
        }  
        span.text{
            max-width: 5.9459rem;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    
    // 后面歌曲数量
    .hot .music-number{
        width: 15%;
        display: block;
        float: left;
        padding:1.0811rem 0 0; 
        font-size: 0.4324rem;
        color: #6a6a6a;
        text-align: right;  
    }
    

</style>
