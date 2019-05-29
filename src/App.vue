<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App',
  data(){
    return{
      dataSongs:[]
    }
  },
  methods:{
    

  },
  created(){
      
    
        
  }
}
</script>


<style lang="less">
#app{
  display: block;
  position:absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto; 
  max-width: 640pX;
  overflow-x:hidden; 
 
}
</style>
