# 知乎个人信息

### 粉丝列表

请求方式: `post`

接口地址: `https://www.zhihu.com/node/ProfileFolloweesListV2`

必须headers: `Cookie` 和 `X-Xsrftoken` (注:直接使用看到的即可,暂时未发现有问题)

必须参数: `body`

```json
{
    method: 'next',
    params: '{"offset":40,"order_by":"created","hash_id":"8e54246e804fef8aa43434190f1c1870"}'//其中offset代表数据量,
}
```

返回数据:

```json
{
    r: 0,
    msg: []//内部数据,需要自行解析,每次20个数据,都为html片段。
}
```

### 获得赞数以及关详细信息

这部分的前提是已经抓取到个人页面。

需要自行解析html。这里以jquery(cheerio)为例进行获取数据。

`$('.zm-profile-header-user-agree>strong').text()` 获取获得的赞数

`$('.zm-profile-header-user-thanks>strong').text()` 获取获得的感谢数

`$('.profile-navbar .num').text(function foo (i, v) {console.log(v)})` 分别获取提问,回答数,文章,收藏,公共编辑

`$('.zm-profile-side-following strong:first').text()` 关注数。

# 知乎日报

### 最新推荐

请求方式: `get`

接口地址:`http://news-at.zhihu.com/api/4/news/latest`

返回数据:

```json
{
  "date": "20160720",
  "stories": [
    {
      "title": "微信观光指南：四川佛罗里达， 贵州劳伦斯，湖北布里斯托",
      "ga_prefix": "072007",
      "images": [
        "http://pic3.zhimg.com/33b60a7216be8acc3fc46dc6f3856d3a.jpg"
      ],
      "multipic": true,
      "type": 0,
      "id": 8585811
    },
    ...
  ],
  "top_stories": [
    {
      "image": "http://pic2.zhimg.com/f111d2aa5b8154261bfe977fd7192e95.jpg",
      "type": 0,
      "id": 8587002,
      "ga_prefix": "072007",
      "title": "读读日报 24 小时热门 TOP 5 · 手机之王，不是英特尔，是 ARM"
    }
    ...
  ]
}
```

### 单条消息详细内容

请求方式: get

接口地址: `http://news-at.zhihu.com/api/4/news/:id`

返回数据:

```json
{
  "body": "<div class="main-wrap content-wrap">...</div>",
  "image_source": "Angel Abril Ruiz / CC BY",
  "title": "卖衣服的新手段：把耐用品变成「不停买新的」",
  "image": "http://p4.zhimg.com/30/59/30594279d368534c6c2f91b2c00c7806.jpg",
  "share_url": "http://daily.zhihu.com/story/3892357",
  "js": [],
  
  "ga_prefix": "050615",
  "images": [
    "http://p3.zhimg.com/69/d0/69d0ab1bde1988bd475bc7e0a25b713e.jpg"
  ],
  "type": 0,
  "id": 3892357,
  "css": [
    "http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"
  ]
}
```
# 话题广场