<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="home-box" >
      <van-icon @click="goPath({name:'HelloWorld'})" name="wap-nav" color="#999" size="25.9999px" />
      <div  v-for="(item,index) in menus" :key="index" 
        @click="goState(item,index)">
        <span :class="{active:item.isCheck}">{{item.title}}</span>
      </div>

      <!-- 底部播放栏 -->
      <!-- <div class="home-play">
        图片
        <div class="img">
          <img src="../assets/123love.jpg"/>
        </div>
        歌曲信息
        <div class="sing">
          <p class="singname">多想在平庸的生活拥抱你</p>
          <p class="song" >隔壁老樊</p>
        </div>
        <div class="play-key keys">
          <van-icon name="play-circle-o" size="29.0006px" color="#ff6700" />
        </div>
        <div class="more-sing keys">
          <van-icon name="bars" size="29.0006px" color="#000"/>
        </div>

      </div>
     -->
    </div>

    <!-- 二级路由 -->
  <router-view/>
  </div>
</template>

<script>

import { Tab, Tabs } from 'vant';


export default {
  name: 'Home',
  data(){
    return{
      active:0,
      menus:[
        {title:'推荐音乐',path:{name:'Index'},isCheck:true},
        {title:'精品歌单',path:{name:'Hot'},isCheck:false},
        {title:'搜索',path:{name:'Search'},isCheck:false}
        
      ]
        
    }
  },
  methods:{
    goPath(path){
      this.$router.push(path);
    },
    goState(item,index){
      if (this.active == index) {
        return;
      }
      this.menus[index].isCheck = true;
      this.menus[this.active].isCheck = false;
      this.active = index;
      this.$router.push(item.path);
    }
  },
  components:{
    [Tab.name]:Tab,
    [Tabs.name]:Tabs
  }
  
}
</script>



<style lang="less" scoped>

  .home{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 99; 
  }

  // 导航栏
  .home-box{
    position: sticky;
    top:0;
    width: 100%;
    height: 1.3514rem;
    border-bottom: 0.027rem solid #ddd;
    color: #666;
    border-radius: 0.1081rem 0.1081rem 0.2703rem gray;
    box-shadow: 0rem 0.0541rem 0.0811rem #ddd;
    background:#fff;
    z-index: 999;

      // 面包样式
    .van-icon-wap-nav{
      position: relative;
      top:0.1622rem;
      left: 0.5405rem;
      width: 1.8919rem;
    }

    >div{
      width: 2.4324rem;
      display: inline-block;
      text-align: center;
      font-size: 0.4595rem;
      line-height: 1.3514rem;
      
    }
    span{
      display: inline-block;  
    }
    .active{
      color:#ff6700;
      border-bottom: 0.0541rem solid #ff6700;
    }
  }

// 底部播放栏
  /* .home .home-play{
    max-width:640Px;
    margin:0 auto;
    display: flex;
    position: fixed;
    bottom: 0;
    width:100%;
    height: 1.6216rem;
    background:#fff;
    box-shadow: 1px 1px 10px gray;
    border-radius:5px;
    
    // 歌曲图片
    .img{
      width: 1.3514rem;
      height: 1.3514rem;
      margin:0.1351rem;
      img{
        width: 100%;
      }
    }
    
    // 歌曲信息
    .sing{
      padding:0.1351rem 0.2703rem 0;
      width: 55%;
      max-width: 5.4054rem;
      height: 100%;
      text-align: left;
     

      p{
        height: 30%;
        line-height: 0.8108rem;
        padding-bottom:0.1351rem; 
        margin: 0;
        color: #000;
        font-size: 0.3514rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .singname{
        font-size: 0.4054rem;
      }
    }
    .keys{
      width: 1.3514rem;
      height: 100%;
      padding: 0.2703rem 0;
      float: right;
    }
  } */

</style>

