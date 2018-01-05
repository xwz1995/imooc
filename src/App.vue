<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body{
  height: 100%;
}
html,body,p,ul,div,h1,h2,h3,h4,h5,h6,ol,li{
  margin: 0;
  padding: 0
}
img{
  font-size: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.clearfix:before,
.clearfix:after {
    display: table;
    line-height: 0;
    content: "";
}
input,button{
outline: none;
  border: 0;
  -webkit-appearance: none;
  border-radius: 0;
  -webkit-appearance: none; 
  -webkit-tap-highlight-color: rgba(255,0,0,0);
}
a,p,span,li,input{
  -webkit-tap-highlight-color: rgba(255,0,0,0);
}
.clearfix:after {
    clear: both;
}
.fr{
  float: right;
}
.fl{
  float: left;
}
</style>
