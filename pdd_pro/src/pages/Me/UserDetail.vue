<template>
  <div class="user-detail">
    <div class="user-top">
      <span @click="backSetting">< 个人资料</span>
    </div>
    <div class="user-inner" style="margin-bottom: 15px">
      <div class="user-img">
        <div>
          <i class="itlike-3"></i>
          <span>淘宝头像</span>
        </div>
        <div class="user-img-right">
          <img src="./images/me_icon.png" alt="">
          <i class="itlike-uniE909"></i>
        </div>
      </div>
      <MeSell left-icon="itlike-1" left-title="会员名" :rightTitle= "userinfo.user_cname"/>
      <MeSell left-icon="itlike-2" left-title="淘宝昵称" :rightTitle="userinfo.user_cname"/>
      <MeSell left-icon="itlike-3" left-title="我的二维码图片"/>
    </div>
    <div class="user-inner" @click="SheetVisible=true">
      <MeSell left-icon="itlike-1" left-title="性别" :right-title="userSexAge.user_sex || userinfo.user_sex" />
    </div>
    <div class="user-inner" @click="$refs.picker.open()">
      <MeSell left-icon="itlike-2" left-title="生日" :right-title="userSexAge.user_age || userinfo.user_age "/>
    </div>
    <!--// 选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="SheetVisible"
    >
    </mt-actionsheet>
    <!-- 选择出生年月-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :start-date="startDate"
      :end-date="endDate"
      @confirm="hadleBirthDay"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import moment from 'moment'
  import MeSell from './MeSell'
  import { mapState } from 'vuex'
  import { updateInfo} from '../../api/index'
  export default {
    name: "UserDetail",
    components: {
      MeSell
    },
    methods:{
        async updateData(){
        // 1.0 插入 性别 出生日期
        let result =  await updateInfo(this.userinfo.id, this.birthDay, this.sex);
         this.userSexAge = result.message;
        },
      backSetting(){
        this.$router.replace('./me');
      },
      selectSex(props){
        this.sex = props.name;
        // 及时插入选择的数据
        this.updateData();
      },
      hadleBirthDay(date){
        // console.log(date);
        this.birthDay = moment(date).format("YYYY-MM-DD");

        // 及时插入选择的数据
        this.updateData();
      }
    },
    computed:{
      ...mapState(['userinfo'])
    },
    data(){
      return{
        SheetVisible: false,
        actions: [
          {name: '男', method: this.selectSex},
          {name: '女', method: this.selectSex},
        ],
        sex: "",
        birthDay: '',
        userSexAge:{},
        startDate: new Date('1990-01-01'),
        endDate: new Date()
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail
    width: 100%
    height: 100%
    background-color: #f5f5f5
    position fixed
    top 0
    bottom 0
    z-index 1000
    .user-top
      height: 45px
      display flex
      align-items center
      padding-left 20px
      font-size 20px
    .user-inner
      .user-img
        display flex
        align-items center
        justify-content space-between
        height: 60px
        padding 0 20px 0 10px
        background-color: #fff
        border-bottom 1px solid #ccc
        img
          height: 50px
          width: 50px
          border-radius 50%
        .user-img-right
          display flex
          align-items center
          justify-content center
</style>
