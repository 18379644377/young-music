<template>
  <div class="song-list">

    <!-- 顶部返回栏 -->
    <van-nav-bar
      :title="tag"
      left-arrow
      fixed
      @click-left="back"
    />
    
    <!-- 歌曲头部信息 -->
    <div class="list-box">
      <div class="list-topC">
        <div class="list-img">
          <!-- 榜单图片 -->
          <img :src="dataText.songListPic" />
          <span class="img-play">
            <!-- 播放量 -->
            <van-icon name="play-circle-o" />
            {{playNum(dataText.songListPlayCount)}}
          </span>
        </div>
        <div class="list-text">
          <!-- 标题 -->
          <p class="title">{{dataText.songListName}}</p>
          <p class="updata-time">
            <!-- 详细介绍 -->
            {{dataText.songListDescription}}
          </p>
        </div>
          
      </div>

        <!-- 歌曲部分 -->
      <div class="song-box" v-for="(data,index) in dataSongs" :key="index"
      @click="goState({name:'Playmusic',params:{id:data.id}})">
        <div class="list-index">
          {{index + 1}}
        </div>
        <div class="index-listle">
          <div class="list">{{data.name}}</div>
          <div class="list-title">
            <i></i>
              <!-- {{data.name}}- -->{{data.singer}}
          </div>      
        </div>
        <div class="play" @click.stop @click="download">
          <img src="../assets/下载.png" alt="下载">  
        </div> 
        
      </div> 

    </div>
  </div>
</template>

<script>

import { NavBar } from 'vant';
import Valuefrom from './valueFrom/valueFrom.js';


export default {
  name:'Songlist',
  data(){
    return{
      dataList:null,
      // 所有歌曲数据获取
      dataSongs:[],

      // 歌单数据获取
      dataText:[],

      // 歌曲标题获取
      tag:''

    }
  },
  methods:{
      goState(path){
        this.$router.push(path)
      },
      back(){
        this.$router.go(-1);//返回上一层
      },
      getSongs(){

            this.axios.get( " https://api.itooi.cn/music/netease/songList?key=579621905&id=" 
            + this.$route.params.dataList + "&limit=55&offset=0")
            .then( data => {
                 // 歌单数据获取
              this.dataText = data.data.data
              // 歌曲标题获取
              this.tag = this.dataText.songListName.slice(0,4)
              // 所有歌曲数据获取
              this.dataSongs = data.data.data.songs.slice(0,50) 
            },() => {
              Valuefrom.alert('数据请求失败，请检查网络')
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

  },
  created(){
    this.getSongs()
  },
  components:{
    [NavBar.name]:NavBar
  }
  
}
</script>

<style lang="less" scoped>
  .song-list{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x:hidden ;
    background: #fafafa;
    // padding-top:1.7568rem;
  }

  // 顶部返回栏
  .van-hairline--bottom{
      position: sticky;
  }
  .song-list .van-hairline--bottom{
    background: rgb(252, 249, 249);
    box-shadow: 0.0811rem 0.0811rem 0.2703rem #333;
    z-index: 10;

    .van-icon-arrow-left{
      color: #ff6700;
      font-size: 0.6486rem;
    }
    .van-nav-bar__title{
      color: #ff6700;
      font-size: 0.4865rem;
    }
    margin-bottom: 0.0811rem;
  }
  
  // 榜单图片
  .list-topC{
    background: -webkit-linear-gradient(bottom right,
     rgba(209, 85, 2, 0.75) ,
      rgba(2, 161, 189, 0.756),
       rgba(179, 3, 3, 0.75)); 
    width: 100%;
    height: 4.8649rem;
    margin-bottom: 0.1351rem;
    
        // 图片播放量部分
    .list-img{
      position: relative;
      top:0.8108rem;
      margin: 0 0.5405rem;
      width: 3.5946rem;
      img{
        position:absolute;
        z-index: 0;
        width: 100%;
      
      }
      // 播放量
      span{
        font-size: 0.3243rem;
        padding: 0.1081rem;
        color: #fff;
        position:absolute;
        text-align: right;
        width: calc(100% - 0.2162rem);
        z-index: 1;
        overflow: hidden;
        .van-icon{
          font-size: 0.3784rem;
        }
      }
    } 
  } 
   
  // 更新时间和标题
  .list-topC .list-text{
    float: right;
    width: 50%;
    height: calc(100% - 1.0811rem);
    padding: 0.5405rem;
    // 标题
    p.title{
      font-size: 0.5405rem;
      margin-top: 0.2703rem;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      
    }
      // 详细介绍
    p.updata-time{
      font-size: 0.3243rem;
      color: #fff;
      max-height: 2.1622rem;
    }
    p{
      max-width: 4.8649rem;
      overflow:hidden;
    }
  }
  // 歌曲盒子
  .list-box .song-box{
      display: flex;
      width: 100%;
      border-bottom: 0.027rem solid #ddd;
      padding:0.1351rem;

      .list{
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 0.4324rem;
          padding-bottom: 0.1081rem;
          max-width: 6.7568rem;
      }
      .list-title{
          font-size: 0.3243rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 6.7568rem; 
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
          position: absolute;   
          right:  0; 
          width: 1.3514rem;
          text-align: center;
          padding:0.2703rem;
          img{
            width:30.0007px;    
          }
      }
      
  }
  // 歌曲前面下标
  .list-box .list-index{
    text-align: right;
    margin: 0 0.4054rem 0 0;
    color:#e66108;
    font-size: 0.4865rem;
    width: 7%;
    height: 100%;
    font-style: italic;
  }
</style>

