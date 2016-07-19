# 知乎日报
1. 最新推荐
请求方式: get
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
      get"id": 8585811
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

2. 单条消息详细内容
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