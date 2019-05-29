<template>
  <div class="hello">
    <div class="end">
      {{songs.lrc}}
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Helloworld',
  data () {
    return{
      songs:[],
      lrc:''
    }
    
  },
  methods:{
    getSongs(){
            this.axios.post("https://github.com/cnwutianhao/DoubanMovie/blob/master/app/src/main/java/com/haocent/android/doubanmovie/ui/subject/MovieSubjectInfoActivity.java")
            .then( data => {
                
                // this.songs = data
                
                this.lrc = data
                window.console.log(this.lrc)
            })
                
      },

      
      
  },
  created(){
    this.getSongs()
    // this.geci()
  }
  
}
</script>


<style scoped lang="less">

</style>
