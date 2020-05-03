<template>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="data in list" :key="data.id" class="infinite-list-item" @click="go(data.id)">
      <section>
      <el-avatar shape="square" :size=100 fit="scale-down" :src="data.avatar"></el-avatar>
      </section>
      <!--<header class="shop_detail_header"></header>-->
      <div class="shop_right">
      <h4 class="seller"> {{data.seller}} </h4>
      <div class="rating_order_num">
        <section class="rating_order_num_left">
          <section class="rating_section">
          <el-rate
            v-model = "data.score"
            disabled
            show-score
            text-color="#ff9900">
          </el-rate>
          </section>
          <section class="order_section">
            月售{{data.ratingCount}}单
          </section>
        </section>
      </div>
        <div class="fee_distance">
          <p class="fee">
            ¥{{data.minPrice}}起送
            <span class="segmentation">/</span>
            配送费约{{data.deliveryPrice}}元
          </p>
          <p class="deliveryTime">
            <span>约{{data.deliveryTime}}分钟送达</span>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        item: [],
        id: 0,
        size: 3,
        list: [],
        score: ''
      }
    },
    computed: {
      // getscore() {
      //   return this.item[0].score
      // }
    },
    methods: {
      go(id) {
        this.$router.push({ path: '/Seller', query: { id: id } })
      },
      load () {
        for (let i = 0; i < this.size; i++) {
          axios.get('http://localhost:3000/api/getSellerID', { params: { id: this.id } })
            .then((res) => {
              if (res.data[0]) {
                this.item = res.data[0]
                this.list.push(this.item)
              }
            })
          this.id++
        }
      }
    }
  }
</script>
<style>
  .shop_right{
    flex: auto;
  }
  .shop_detail_header{
    display: flex;
    justify-content: space-between;
  }
  .infinite-list-item{
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }
  .seller{
    width: 200px;
    height: 16px;
    color: #333;
    padding-left: 6px;
    font-size:14px;
    font-weight: bold;
  }
  .rating_order_num_left {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .rating_section{
    display: flex;
  color: #ff6000;
  }
  .order_section{
    transform: scale(.8);
    margin-left: -0.2rem;
    font-size: 14px;
    color: black;
    float: bottom;
  }
  .fee_distance {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #333;
  }
  .fee{
    transform: scale(.9);
    font-size: 14px;
    color: #666;
  }
  .deliveryTime {
    color: dodgerblue;
    margin-left: -0.2rem;
    transform: scale(.9);
    float: bottom;
  }

</style>
