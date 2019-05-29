<template>
    <div class="paly" :style="{background:`url(${songs.pic}) no-repeat center`}">
        <div class="paly-box">
            <!-- 顶部返回栏 -->
            <van-nav-bar :title="songs.name" left-arrow
            fixed @click-left="back" @click-right="download" right-text="下载" >
            </van-nav-bar>
            <!-- 歌曲名称 -->
            <div class="music-name">
                <p class="name">{{songs.name}}</p>
                <p class="singer">{{songs.singer}}</p>
            </div>
            <!-- 图片播放 -->
            <div class="paly-img">
                <img :src="songs.pic" alt="图片加载失败" >
            </div>
            <!-- 歌词部分 -->
            
            <div class="lrc-box"> 
                <div class="songs-lrc"> 
                   <div class="lrcText" id="lrcText"
                    v-for="(item,index) in txt" :key="index">
                        {{item}}
                    </div>
                </div>
            </div>
            <!-- 播放按钮部分 -->
            <div class="btn-box">
               <audio id="audio" :src="songs.url" autoplay loop/>
                <!-- 进度条部分 -->
               <div class="range">  
                   <div class="start">01:12</div> 
                   <div class="input">
                       <div class="input-color" ></div>
                   </div>
                   <div class="end">{{time}}</div>
                </div>
                <!-- 下面三个按钮 -->
                <div class="music-box">
                    <div class="left">
                        <img src="../assets/上一曲.png" />
                    </div>
                    <div class="broad" @click="playMusic">
                        <van-icon name="play-circle-o" v-show="isFalse"/>
                        <van-icon name="pause-circle-o" v-show="!isFalse"/>
                    </div>
                    <div class="right">
                        <img src="../assets/下一曲.png" />
                    </div>
                </div>
                
            </div>

         </div>
    </div>
</template>

<script>
import { NavBar } from 'vant';
import Valuefrom from './valueFrom/valueFrom.js';

export default {
    name:'palymusic',
    data () {
        return {
            songs:[],
            music:'',
            lrc:'',
            tie:'',
            time:'',
            txt:[],
            isFalse:false
        }
    },
    created(){
        // 获取歌曲信息
        this.axios.get("https://api.itooi.cn/music/netease/song?key=579621905&id=" + this.$route.params.id + "" )
        .then(data => {
            this.songs = data.data.data
            // console.log('data ==> ',this.songs)
            this.tie = this.songs.time;
        },() => {
            window.console.log('请求失败')
        })
        //  获取歌词
        this.axios.get("https://api.itooi.cn/music/netease/lrc?key=579621905&id=" + this.$route.params.id + "" )
        .then(data => {
            this.lrc = data.data; 
            this.playlrc()
            console.log('str ===> ',this.lrc);
        }, () => {
            Valuefrom.alert('请输入正确歌名、专辑、艺术名')
        })
       
    },
    methods:{
        // 音乐播放控制
        playMusic () {
            var audio = document.getElementById('audio');      
            if(audio.paused)                     {                 
                audio.play();// 这个就是播放  
                this.isFalse = false;
            }else{
                audio.pause();// 这个就是暂停
                this.isFalse = true;
            }
            
        },
        // 歌词时间和歌词分离
        playlrc () {
            var s = this.tie;
            var MM = parseInt(s / 60);
            var SS = s % 60;
            if (MM < 10){
                MM = "0" + MM;
            }
            if (SS < 10){
            SS = "0" + SS;
            }
            
            this.time = MM + ":" + SS;  
            var str =  this.lrc.split(/\n/);
            
            if (str == '' | str == undefined){
                return;
            }
            // console.log('歌词获取 ==> ',str)
            for(var i = 0; i < str.length; i++ ){
                if(str[i] == null | str == '') {
                    str.splice(i,1);
                    i = i-1;
                }else{
                    var m = str[i].match(/\[(.*)\](.*)/)
                    this.txt.push(m[2]);    
                }
            } 
            window.console.log(this.txt)
            
        },
        // 下载链接
        download(){
            window.open(this.songs.url);
        },
        //返回上一层
        back(){
            this.$router.go(-1);
        }
        
    },
    components:{
        [NavBar.name]:NavBar
    }
    
}
</script>

<style lang="less" scoped>
    .paly{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-x:hidden ;
        background-size: 1000px 1000px !important;

        .paly-box{
            width: 100%;
            height: 100%;
            background:rgba(65, 63, 63, 0.7);
        }
    }
    
    // 顶部返回栏
    .van-hairline--bottom{
        position: sticky;
    }
    .paly .van-hairline--bottom{

        background: rgba(66, 64, 64, 0.5);
        box-shadow: 0.0811rem 0.0811rem 0.2703rem #333;
        z-index: 10;
        margin-bottom: 0.0811rem;

        .van-icon-arrow-left,.van-icon-add-o{
        color: rgba(248, 247, 247, 0.9);
        font-size: 0.6486rem;
        }
        .van-nav-bar__text{
            color: #fff;
            font-size:16px;
        }
        .van-nav-bar__title{
        color: rgba(250, 248, 246, 0.9);
        font-size: 0.4865rem;
        }
       
    }
    // 歌曲名称
    .paly .paly-box .music-name{
        width: calc(100% - 40px);
        padding:15px 20px;
        text-align:center;
        color:#fff;
        p{
            overflow: hidden;
            max-width: 180px;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin:0 auto;
        }
        .name{
            font-size:17px;
            margin-bottom: 5px;
        }
        .singer{
            font-size:14px;
        }
    }
    .paly .paly-img{
        width: 190px;
        height: 190px;
        margin:0 auto;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    // 歌词部分
    .lrc-box{
        color: #fff;
        width: 240px;
        height: 180px;
        overflow: auto;
        margin:20px auto;

        .songs-lrc{
            width: 240px;
            text-align: center;
            font-size: 14px;
        }
        .lrcText:first-child{
            color:rgb(255, 103, 0,.5);
            margin:5px 0;
            text-shadow: 1px 1px 5px;
            font-size: 17px;
        }
    }
    
    // 播放进度条
    .paly-box .btn-box{
        color: #fff;
        width: 100%;
        text-align: center;
        
        div.start{
            margin: 5px;
            float: left; 
            
        }
        div.end{
            float: right; 
            margin: 5px;
            height: 100%;
            
        }
        .range{
            width: 100%;
            border-radius: 15px;
            display:flex;
            width: 80%;
            margin: 0 auto;
            border:1px solid rgb(184, 180, 180);
            // background: #fff;
            .input{
                margin: 9px 0;
                float: left;
                border:1px solid #ddd;
                width: 70%;
                height: 5px;
                background: rgba(255, 255, 255,0.4);
                border-radius: 10px;
            //  background: linear-gradient(left ,#ff6700 10%, #fff 100%);
                
                .input-color{
                    height: 5px;
                    width: 30%;
                    background: #ff6700;
                }
               
            }

        }
    }

    // 下面三个按钮
    .btn-box .music-box{
        width: 80%;
        height: 50px;
        text-align: center;
        padding: 10px 0 0;
        margin: 0 auto;
        img{
            height: 45px;
        }
        div{
            padding-left: 10%;
            width: calc(33.3% - 10%);
            display: flex;
            float: left;
            .van-icon{
                font-size: 44px;
                color: rgb(255, 103, 0,.5);
            }
        }
        div.right{
            float: right;
        
        }
    }
</style>
