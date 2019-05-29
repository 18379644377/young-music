<template>
    <div class="index">

        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white" class="playimg">
            <van-swipe-item><img src="../assets/1.jpg" alt=""></van-swipe-item>
            <van-swipe-item><img src="../assets/2.jpg" alt=""></van-swipe-item>
            <van-swipe-item><img src="../assets/3.jpg" alt=""></van-swipe-item>
            <van-swipe-item><img src="../assets/4.jpg" alt=""></van-swipe-item>
        </van-swipe>

        <!-- 推荐歌单 -->
            <div class="index-song">热门歌单 </div>
            <div class="index-box"  >
                    <div class="index-one"  @click="goState({name:'Songlist',params:{dataList:data.id}})"
                     v-for="(data,index) in dataSongList" :key="index"> 
                        <div class="index-img">
                            <img :src="data.coverImgUrl" />
                            <span class="playcode">
                                <van-icon name="audio" />
                                {{playNum(data.playCount)}}
                            </span>
                        </div>
                        <p class="text">
                            {{data.title}}
                        </p>   
                    </div> 
            </div>
            <div class="index-box"  >
                
                    <div class="index-one" @click="goState({name:'Songlist',params:{dataList:data.id}})"
                     v-for="(data,index) in dataSongList1" :key="index">
                        <div class="index-img">
                            <img :src="data.coverImgUrl" />
                            <span class="playcode">
                                <van-icon name="audio" />
                                {{playNum(data.playCount)}}
                            </span>
                        </div>
                        <p class="text">
                            {{data.title}}
                        </p>  
                    </div> 
               
            </div>
        <!-- 最新歌曲 -->
        <div class="index-newSing">
            <span class="index-song">
                热门歌曲
            </span>
            <div class="song-box" v-for="(data,index) in dataSongs"
            @click="goState({name:'Playmusic',params:{id:data.id}})" :key="index">
                <div class="index-single">
                    <div class="sing">{{data.name}}</div>
                    <div class="sing-title">
                        <i></i>
                        {{data.name}}-{{data.singer}}
                    </div>
                </div>
                
                <div  class="play"  @click.stop>
                  <a :href="data.url" :download="data.singer">  <img src="../assets/下载.png" alt="下载">  </a>
                </div> 
            </div>
            
        </div>

    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import Valuefrom from './valueFrom/valueFrom.js';


export default {
    name:'Index',
    data(){
        return{
            // 歌单存储
            dataSongList:[],
            dataSongList1:[],
            // 歌曲存储
            dataSongs:[]
        }
    },
    methods:{
        // 获取歌单函数
        goState(path){
            this.$router.push(path)
        },
        getSongList(){
            this.axios.get( "https://api.itooi.cn/music/netease/hotSongList?key=579621905&cat=全部&limit=20&offset=0")
            .then( data => {
                var songsLists = JSON.stringify(data.data.data.slice(7,10));
                var songsLists1 = JSON.stringify(data.data.data.slice(10,13));
                localStorage.setItem('songsList',songsLists);
                localStorage.setItem('songsList1',songsLists1);
                this.dataSongList = JSON.parse(localStorage.getItem('songsList'));
                this.dataSongList1 = JSON.parse(localStorage.getItem('songsList1'));
            },() => {
                Valuefrom.alert('数据请求失败，请检查网络');
                this.dataSongList = JSON.parse(localStorage.getItem('songsList1'));
                this.dataSongList1 = JSON.parse(localStorage.getItem('songsList'));  
            })
        },
        // 获取歌曲函数
        getSongs(){
            this.axios.get( " https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0")
            .then( data => {
                
                var songs = JSON.stringify(data.data.data.songs.slice(0,50));
                localStorage.setItem('songs',songs);
                this.dataSongs = JSON.parse(localStorage.getItem('songs')); 
            }, () => {
                 Valuefrom.alert('数据请求失败，请检查网络');
                 this.dataSongs = JSON.parse(localStorage.getItem('songs')); 
            })  
        },
        // 播放量化为万
        playNum(number){
            return number > 9999 ? parseInt(number / 10000) + '万' : number; 
        },
        // 下载链接
        download(){
            window.open(this.dataSongs.url);
        }
       
    }
    ,
     created(){
        this.getSongList();
        this.getSongs();
    },
    components:{
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem
    }
}
</script>

<style lang="less" scoped>

    .playimg img{
        width: 100%;
    }

    div.index{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-x:hidden ;
        padding-top:1.4865rem;
        z-index: 10;
    }

    // 前标题一块
    .index-song{
        margin-bottom:11px;
        display: block;
        width:100%;
        font-size: 0.4865rem;
        border-left: 0.0541rem solid #ff6700;
        padding-left:0.2703rem;
    }
        
    // 歌单样式
    .index-one:first-child{
        
        padding-right:0 0.0811rem 0 0.1622rem;
        
    }
    .index-one:last-child{
        padding-left: 0.1081rem;
    }
    // 大盒子
    .index-box{
        display: block;
        width: 100%;
        padding: 0 0.1892rem 0.2973rem;
        overflow: auto;
        
        .index-one{
            display: block;
            width: calc(30% - 0.0811rem);
            float: left;
            margin:0 5px;
            
            // 图片和播放量
            .index-img{
                display: block;
                // overflow: hidden;
                width: 100%;
                min-height: 2.973rem;
                position: relative;

                img{
                    position: absolute;
                    width: 100%;
                    z-index: 1;   
                }
                .playcode{
                    font-size: 0.3784rem;
                    position: absolute;
                    right: 0.1351rem;
                    top:0.0811rem;
                    color: #ffffff;
                    z-index: 9;
                }    
            }
        } 
        // 歌单名字
        p.text{
            color:#000;
            font-size: 0.3514rem;
            margin:0;
            padding:0.1892rem 0 0 0.1351rem;
        }
        
    }


    div.index-newSing{
        width: 100%;
        overflow: hidden;
        .index-single{
            width: calc(100% - 1.4865rem)
        }
        // 歌曲盒子
        .song-box{
            display: flex;
            width: 100%;
            border-bottom: 0.027rem solid #ddd;
            padding:0.1351rem;

           .sing{
               white-space: nowrap;
               text-overflow: ellipsis;
               overflow: hidden;
               font-size: 0.4324rem;
               padding-bottom: 0.1081rem;
               max-width: 8.1081rem;
            }
            .sing-title{
                font-size: 0.3243rem;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 8.1081rem;
                i{
                    line-height: 0.2703rem;
                    display: inline-block;
                    width: 0.3243rem;
                    height: 0.2433rem;
                    background: url('../assets/sq.png') no-repeat;
                    background-size: cover;
                }        
            }
            // 播放按钮
            div.play{         
                width: 1.3514rem;
                text-align: center;
                padding:0.2703rem;
                img{
                    width:0.8108rem;    
                }
                
            }
           
        }
    }
    
</style>
