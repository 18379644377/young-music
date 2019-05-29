<template>
    <div class="search">

        <!-- 搜索栏 -->
        <van-search
            v-model="value"
            placeholder="输入歌曲、专辑、艺术名搜索"
            show-action
            shape="round"
            search
            value           
            @change="getSongs"
            >
            <div slot="action" class="sea-btn" >搜索</div>
        </van-search>

            <!-- 热搜盒子 -->
        <div class="hot-box" v-show="valShow">
            <!-- 搜索历史 -->
            <div class="search-history" v-show="isfalse">
                <p>搜索历史</p>
                    <li class="li" :v-model="historyValue" @click="focusLi(index)"
                    v-for="(tiem,index) in allValue" :key="index">{{tiem}}</li>
                    
            </div>
            <!-- 热搜词汇 -->
            <p class="hot-title">最近搜索热词</p>

            <div class="hotSearch">
                <div class="hot-index">
                    1
                </div>
                <van-cell title="绿色" is-link />
            </div>
            <div class="hotSearch">
                    <div class="hot-index">
                        2
                    </div>
                    <van-cell title="爱你一万年" is-link />
            </div>
            <div class="hotSearch">
                    <div class="hot-index">
                        3
                    </div>
                    <van-cell title="痘痘那边" is-link />
            </div>
            <div class="hotSearch">
                    <div class="hot-index">
                        4
                    </div>
                    <van-cell title="多想在乎你" is-link />
            </div>
            <div class="hotSearch">
                    <div class="hot-index">
                        5
                    </div>
                    <van-cell title="出山" is-link />
            </div>
            <div class="hotSearch">
                    <div class="hot-index">
                        6
                    </div>
                    <van-cell title="金秋的你" is-link />
            </div>
            <div class="hotSearch">
                    <div class="hot-index">
                        7
                    </div>
                    <van-cell title="爱你无悔" is-link />
            </div>
        </div>

        <!-- 搜索歌曲 -->
        <div class="song-box" v-show="!valShow"
        @click="goState({name:'Playmusic',params:{id:data.id}})"
         v-for="(data,index) in dataText" :key="index">
            <div class="list-index">
                {{index + 1}}
            </div>
            <div class="index-listle">
            <div class="list">{{data.name}}</div>
            <div class="list-title">
                <i></i>
                {{data.name}}-{{data.singer}}
            </div>      
            </div>
            <!-- 播放按钮  -->
            <div class="play">
                <a :href="data.url">
                    <van-icon name="play-circle-o" size="0.7027rem" color="#888" />
                </a> 
            </div>
        
      </div>

    </div>
</template>

<script>
import { Search } from 'vant';
import { Cell, CellGroup } from 'vant';
import Valuefrom from './valueFrom/valueFrom.js';

export default {
    name:'Search',
    data () {
        return{
           
            value:'',

            valShow:true,

            // 搜索歌曲
            dataText:[],

            // 搜索历史
            allValue:[], 
            isfalse:false,
            historyValue:""
        }
    },
    methods:{
        goState(path){
            this.$router.push(path);
        },
        getSongs(){
                // 判断搜索框是否为空
            if (this.value == '') {
                this.valShow = true;
                return;     
            }

            // 获取网络数据
            this.axios.get( "https://api.itooi.cn/music/netease/search?key=579621905&s=" + this.value 
            + "&type=song&limit=30&offset=0")
            .then((data) => {
                  this.valShow = false;
                  this.dataText = data.data.data.slice(0,20);
            },() => {
                Valuefrom.alert('请输入正确歌名、专辑、艺术名')
            })

            this.allValue.push(this.value);

            // 判断搜索历史是否为空
            this.isSearch ()
        },

        // 获取li的指
        focusLi (index) {
            var li = document.getElementsByClassName('li')
            this.value = li[index].innerHTML;
            this.getSongs();
        },

        // 判断搜索历史是否为空
        isSearch () {
            if (this.allValue.length != 0) {
               this.isfalse = true ;
            }else{
                this.isfalse = false ;
            }
        }
    },
    created () {
        
    },
    components: {
        [Search.name]:Search,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup
    }
}
</script>

<style lang="less" scoped>
    
    .search{
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-x:hidden ;
        padding-top:1.3784rem;
        background: #fff;
        padding-bottom: 1.8919rem;
    }
    
    // 搜索框
    .search .sea-btn{
        background: rgba(255, 103, 0,.9);
        padding:0 0.2703rem;
        border-radius: 0.1351rem;
        color: #fff;
    }
    p.hot-title{
        color:#ff6700;
        padding-left:0.2703rem;
    }
    // 热门搜索词
    .hotSearch{
        width: 100%;
        border-bottom:0.027rem solid rgb(218, 215, 213);
        display: flex;
        margin-top:0.1351rem;
        overflow: hidden;

            // 热门搜索下标
        div.hot-index{
            width: 9%;
            float: left;
            font-size: 0.4865rem;
            text-align: right;
            padding: 0.2703rem 0;
            margin-right: 0.0811rem;
            color:#ff6700;
            font-style: italic; 
        }
        // 热门所搜后部
        .van-cell--clickable{
            font-size: 0.4865rem;
            float: left;
            width: 91%;

            .van-cell__title{
                max-width: 95%;
                overflow-x: hidden;
                white-space: nowrap;
            }
            
            .van-cell__right-icon{
                font-size: 0.5946rem;

            }
        }
    }
    
        //   搜索歌曲
    .search .song-box{
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

        // 歌曲名称
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
            // font-size: 0.6486rem;
            padding:0.2703rem;
        }
        a{
            display: flex;
        }
    }
    // 歌曲前面下标
    .search .list-index{
        text-align: right;
        margin: 0 0.4054rem 0 0;
        color:#e66108;
        font-size: 0.4865rem;
        width: 7%;
        height: 100%;
        font-style: italic;
    }
    // 历史搜索
    .search .hot-box .search-history{       
        max-height: 5.4054rem;
        overflow-y: hidden;
        padding:0 0.2703rem 0.2703rem;
        background: #f6f6f6;
        border-radius: 0.2703rem;
        p{
            font-size: 0.3514rem;
            color: #ff6700;
        }
        li{
            display: inline-block;
            list-style: none;
            padding:0 0.3784rem;
            background: #fff;
            margin: 0 0.2703rem 0.2703rem 0;
            white-space: nowrap;
            font-size: 0.4324rem;
            color:#666;
            border-radius: 0.5405rem;
        } 
    }

   
</style>


