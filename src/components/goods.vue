<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side=true
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
        @change="changeHandler"
        @sticky-change="stickyChangeHandler"
      >
        <template slot="bar">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="label"
            :txts="barTxts"
            :current="current"
            @change="changeHandler"
          >
            <template slot-scope="data">
              <div class="text">
                <span>{{data.txt.name}}</span>
                <span class="num" v-if="data.txt.count">
                  <bubble :num="data.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="item in type"
          :key="item.name"
          :label="item.name"
          :title="item.name">
          <ul>
            <li
              v-for="food in item.foods"
              :key="food.name"
              class="food-item"
              @click="selectFood(food)"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.info}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellnum}}份</span><span>评分{{food.score}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldprice">￥{{food.oldprice}}</span>
                </div>
                <!--<div class="cart-control-wrapper">-->
                <!--<cart-control @add="onAdd" :food="food"></cart-control>-->
                <!--</div>-->
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <!--<div class="shop-cart-wrapper">-->
      <!--<shop-cart-->
        <!--ref="shopCart"-->
        <!--:select-foods="selectFoods"-->
        <!--:delivery-price="seller.deliveryPrice"-->
        <!--:min-price="seller.minPrice"></shop-cart>-->
    <!--</div>-->
  </div>
</template>

<script>
  import axios from 'axios'
  // import ShopCart from './shop-cart'
  // import Button from 'cube-ui/src/components/button/button'
  export default {
    // components: { ShopCart },
    props: {
      sellerid: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        current: '',
        goods: [],
        goodsType: [],
        temp: [],
        type: [
          {
            name: '',
            foods: [
              {
                name: '',
                icon: '',
                image: ''
              }
            ]
          }],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        },
        data: {
          type: Object,
          default () {
            return {
              txt: {
                type: '1',
                name: '2',
                count: '3'
              },
              index: '4',
              active: '5',
              label: '6'
            }
          }
        },
        label: []
      }
    },
    methods: {
      changeHandler(label) {
        console.log('changed to:', label)
      },
      stickyChangeHandler(current) {
        console.log('sticky-change', current)
      },
      selectFood (food) {
        this.selectedFood = food
        this._showFood()
        this._showShopCartSticky()
      },
      onAdd (target) {
        this.$refs.shopCart.drop(target)
      },
      _showFood () {
        this.foodComp = this.foodComp || this.$createFood({
          $props: {
            food: 'selectedFood'
          },
          $events: {
            add: (target) => {
              this.shopCartStickyComp.drop(target)
            },
            leave: () => {
              this._hideShopCartSticky()
            }
          }
        })
        this.foodComp.show()
      },
      _showShopCartSticky () {
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: this.seller.deliveryPrice,
            minPrice: this.seller.minPrice,
            fold: true
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartSticky () {
        this.shopCartStickyComp.hide()
      },
      fetch() {
        axios.get('http://localhost:3000/api/getGoods', { params: { id: this.sellerid } })
          .then((res) => {
            var count, num
            var temp = []
            this.goods.push(res.data)
            count = res.data.length
            for (let i = 0; i < count; i++) {
              axios.get('http://localhost:3000/api/getGoodsType', { params: { id: this.goods[0][i].goods_id } })
                .then((res) => {
                  temp = res.data
                  num = res.data.length
                  for (let q = 0; q < num; q++) {
                    this.goodsType.push(temp[q])
                    this.temp.push(temp[q])
                  }
                  for (let j = 0; j < this.goodsType.length; j++) {
                    if (this.label.indexOf(this.goodsType[j].type) == -1 || this.label.length == 0) {
                      this.label.push(this.goodsType[j].type)
                      const pushobj = {
                        name: this.goodsType[j].type,
                        foods: [
                          {
                            name: '',
                            icon: '',
                            image: ''
                          }
                        ]
                      }
                      this.type.push(pushobj)
                    }
                  }
                  this.type.forEach((value, index, array) => {
                    for (let j = 0; j < this.temp.length; j++) {
                      const pushobj = {
                        name: this.temp[j].goods_name,
                        icon: this.temp[j].icon,
                        price: this.temp[j].price,
                        oldprice: this.temp[j].oldprice,
                        score: this.temp[j].score,
                        info: this.temp[j].info,
                        sellnum: this.temp[j].sellnum,
                        image: this.temp[j].image
                      }
                      if (value.name == this.temp[j].type && value.name) {
                        value.foods.push(pushobj)
                        this.temp[j] = {}
                      }
                    }
                  })
                  // this.type.splice(this.type.indexOf(0), 1)
                  this.type.forEach((value, index, array) => {
                    if (value.foods[0].name == '') {
                      value.foods.splice(0, 1)
                    }
                  })
                })
            }
            this.type.splice(this.type.indexOf(0), 1)
            console.log('goods', this.goods)
            console.log('goodstype', this.goodsType)
            console.log('this.type', this.type)
            console.log('this.label', this.label)
          })
      }
    },
    mounted() {
      this.fetch()
      this.refresh()
    },
    computed: {
      selectFoods () {
        var foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      },
      barTxts () {
        var ret = []
        this.type.forEach((good) => {
          const type = good.type
          const name = good.name
          const foods = good.foods
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../common/variable.styl"
  @import "../common/mixin.styl"
  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width 100%
      top: 0
      left: 0
      bottom: 50px
    >>> .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      overflow: hidden
    >>> .cube-scroll-nav-bar-item
      padding: 0 10px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: $fontsize-small
      background: $color-background-ssss
      .text
        flex: 1
        position: relative
      .num
        position: absolute
        right: -8px
        top: -10px
    >>> .cube-scroll-nav-bar-item_active
      background: $color-white
      color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid $color-col-line
      font-size: $fontsize-small
      color: $color-grey
      background: $color-background-ssss
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
        img
          height: auto
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: $fontsize-medium
          color: $color-dark-grey
        .desc, .extra
          line-height: 10px
          font-size: $fontsize-small-s
          color: $color-light-grey
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: $fontsize-medium
            color: $color-red
          .old
            text-decoration: line-through
            font-size: $fontsize-small-s
            color: $color-light-grey
      .cart-control-wrapper
        position: absolute
        right: 0
        bottom: 12px
    .shop-cart-wrapper
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
</style>
