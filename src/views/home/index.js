import './index.scss'
import 'src/components/header'
import 'src/components/footer'

let array = ['1', '2', '3']

if (array.includes('2')) {
  console.log('有')
}

$(function () {
  console.log('123=>', 123)
  const milestones = [
    {
      info: '与 BMW 、英菲尼迪等品牌厂方展开业务合作；与山东远通、无锡东方首开合资公司经营合作模式',
    },
    {
      info: '与超过 70％百强经销商集团开展业务合作，如利星行、广汇、润东、通源、恒信德隆、轿辰、远通、东方、大昌行等',
    },
    {
      info: '汽车街与中国百强经销商集团“四巨头”—广汇、利星行、恒信、大昌行以及二手车市场“全国双强”北京市旧机动车交易中心、上海二手车交易中心在CADA海口年会上签订战略合作协议',
    },
    {
      info: '汽车街获腾讯&京东战略投资',
    },
    {
      info: '汽车街与利星行、东风日产、一汽丰田、广汽丰田以及上汽通用等签订战略合作协议',
    },
    {
      info: '汽车街与一汽马自达、一汽大众、小鹏汽车、东风启辰、长城汽车、长安福特及全国各认证二手车中心签订战略合作协议，并对物流服务进行了全面升级',
    },
  ]
  // 选项卡
  $('.years li').click(function () {
    var index = $(this).index()
    $(this).addClass('current').siblings().removeClass('current')
    $('.milestones .years-text').text($(this).data('year'))
    $('.milestones .arrow').removeClass('disabled')
    if (index === $('.years li').length - 1) {
      $('.milestones .arrow-right').addClass('disabled')
    } else if (index === 0) {
      $('.milestones .arrow-left').addClass('disabled')
    }
    $('.years-info').text(milestones[index].info)
    $('.tab_con li').eq(index).show().siblings().hide()
  })
  $('.arrow').click(function () {
    if ($(this).hasClass('disabled')) return
    const year = $('.years-text').text()
    if ($(this).hasClass('arrow-left')) {
      $('.year' + (+year - 1)).trigger('click')
    } else {
      $('.year' + (+year + 1)).trigger('click')
    }
  })

  //楼层
  $('#left-list').click(function (e) {
    if (e.target.tagName.toLowerCase() == 'li') {
      // 取data-n值
      const n = $(e.target).data('n')
      // []属性选择器
      const contentPart = $('.floor[data-n=' + n + ']')
      // 滚动
      if (n === 'floor1') {
        document.documentElement.scrollTop = contentPart.offset().top - 498
      } else {
        document.documentElement.scrollTop = contentPart.offset().top - 200
      }
    }
  })
  var $floors = document.querySelectorAll('.floor')
  var lis = document.querySelectorAll('#left-list li')
  var offsetTopArr = []
  for (let i = 0; i < $floors.length; i++) {
    if (i === 0) {
      offsetTopArr.push($floors[i].offsetTop - 570)
    } else if (i === $floors.length - 1) {
      offsetTopArr.push($floors[i].offsetTop - 562)
    } else {
      offsetTopArr.push($floors[i].offsetTop - 200)
    }
  }
  // 为了方便比较，追加无穷大
  offsetTopArr.push(Infinity)
  // 监听卷动
  var nowFloor = -1
  window.onresize = function () {
    var nowScrollTop = document.documentElement.scrollTop
    if (nowScrollTop > 400) {
      $('header').addClass('header-status-2')
      $('#left-list').css('top', 190)
    } else {
      $('header').removeClass('header-status-2')
      $('#left-list').css('top', 590 - nowScrollTop)
    }
  }
  window.onscroll = function (e) {
    var nowScrollTop = document.documentElement.scrollTop
    if (nowScrollTop > 400) {
      $('header').addClass('header-status-2')
      $('#left-list').css('top', 190)
    } else {
      $('header').removeClass('header-status-2')
      $('#left-list').css('top', 590 - nowScrollTop)
    }
    // break的i值即为盒子数组下标
    for (var i = 0; i < offsetTopArr.length; i++) {
      // console.log(nowScrollTop, offsetTopArr[i], offsetTopArr[i + 1])
      if (
        nowScrollTop >= offsetTopArr[i] &&
        nowScrollTop < offsetTopArr[i + 1]
      ) {
        break
      }
    }
    // 楼层不等，进行样式更改
    if (nowFloor != i) {
      nowFloor = i
      for (var j = 0; j < lis.length; j++) {
        if (j == i) {
          // 当前楼层添加样式
          lis[j].className = 'current'
        } else {
          // 去掉其他楼层的样式
          lis[j].className = ''
        }
      }
    }
  }
})
