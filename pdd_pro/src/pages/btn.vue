<template>
    <div class="box">
        <button class="btn" @click="dealClick(msg)">点击</button>
    </div>
</template>
<script>
    export default {
        name: "btn",
        methods: {
            dealClick: function (msg) {
                alert(msg);
                this.$emit('toParent', this.data1);
            }
        },
      props:{
          msg: String
      },
      data(){
          return {
            data1: "你好父组件！"
          }
      }
    }
</script>
<style scoped>
    .btn{
        width: 300px;
        height: 26px;
        background-color: green;
    }
</style>
