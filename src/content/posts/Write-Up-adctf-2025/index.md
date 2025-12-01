---
title: The Write Up of ADCTF 2025
published: 2025-11-28T04:40:26.381Z
tags: [WriteUp]
category: WriteUp
draft: false
---
# 前言
这是我的第一篇WriteUp,可能有很多纰漏,欢迎纠正
![](HOME.png)
# AI
## [Easy]RKK问答
:::note[描述]
与 RKK 对话，探索 TA 的世界。
:::
### 解题思路:
#### 错误示范(弯路):
不断尝试prompt注入\
包括但不限于:伪装身份,覆盖认知等\
此处给出我们出题人[teru](https://keqing.moe)在赛后给出的防注入提示词
![](RKK-AI.png)
#### 正确示范:
根据对[RKK](https://blog.rkk.moe/)的了解,不难猜出其数字孪生的喜好\
我们只需不断发送```[图片]```即可让RKK-AI乖乖吐出FLAG
![HDR有BUG截屏是这样](RKK-AI2.png)
# crypto
## [Hard]codeForRkk
:::note[描述]
RKK 为了报复時雨てる先前把 ta 做成 AI 还出进题目里，特地搭建了 Codeforkk 平台。時雨てる果然中招！安全意识薄弱的 ta 在 Codeforkk 上提交了一段有漏洞的代码！为了一雪前耻，请你帮助 RKK，对 ta 的代码发起攻击吧！
:::
### 解题思路:
进入页面看到代码中出现了```unordered_map```容器,使用哈希表实现,
这意味着我们只需要在范围内构造大量的质数即可造成哈希冲突,让它的效率大幅下降乃至超时\
在这里我选择使用C++编写一个程序,通过筛法得到题目范围内的2e4个质数并以题目规范格式排列输出\
将内容作为接下来交给teru程序的输入
```
#include<bits/stdc++.h>
using namespace std;
using ll=long long;
constexpr ll MAX=10000000;
bool NPrime[MAX];
int main(){
    freopen("test.txt","w",stdout);
    ll cnt=0;
    vector<ll> prime;
    cout<<(ll)2e4<<endl;
    for(ll i=2;i<MAX&&prime.size()<(ll)2e4;i++) {
        if(NPrime[i])continue;
        cout<<i<<endl;
        prime.push_back(i);
        for(ll j=2;j*i<=MAX;j++) {
            NPrime[j*i]=true;
        }
    }
    cout<<prime.size()<<endl;
    for (auto i : prime) {
        cout<<i<<endl;
    }
    return 0;
}
```
如此即可解决本题
## [Normal]leak_dp
### 解题思路:
没什么好说的\
交给AI直接跑一遍\
![](leak_dp.jpg)

# osint
## [Normal]我们一起回去好不好
### 解题思路
首先,我们通过图片的角度可以知道,飞机此时朝向西南,在大学城岛的南边\
第二,我们通过看到翼尖小翼上有航司的logo,搜索中国国内航司的logo进行比对,不难得出是桂林航空\
第三,我们查询桂林航空官网,查看他们的飞行节点都有哪些,注意到在飞机朝向上的节点只有珠海、南宁、海口\
我们在flightaware对这三个机场进行筛选检查\
我们再查看发视频的人的抖音IP——海南\
再看视频发布时间——9.14的凌晨\
我们可以确定其大概为9月中上旬的飞抵海口机场的夜晚航班
很快我们就筛选出了```GT1116```号航班\
在航旅纵横上查询其实际轨迹\
完美符合我们的照片\
接下来查看飞行记录,存在9.13的夜间航班\
最后我们在航旅纵横上通过航班号就可以查询到飞行器注册号\
那么flag就出来了```flag{B1061-GT1116-20250913}```

# web
## [Normal]PacmanOL

:::note[描述]
pacman -S pacman-ol

🐧 ~~来使用 Arch Linux 吧(并非)~~

👻 来玩吃豆人（Pacman）吧！

🏆 拿到 300 分就有奖励哦～
:::
### 解题思路:
调最高倍速老老实实玩游戏达到300分即可喵