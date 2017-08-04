# wxj-cli


## 使用说明
- npm install -g wxj-cli (已完成)
- wxj-cli create (template) (name) "template是github上面的user/repo ,name是文件夹名 (已完成)
- cd (name) && wxj-cli compile (type) 将当前模板编译成目标模板,type可以为vue,react,wxxcx.... (未开发)


### cli命令
- npm install -g wxj-cli
- wxj-cli create (template) (name)
- cd (name)
- wxj-cli build


### template编译内容(demo)
- 将@click变为wx:tap
- 将<repeat w:for="nameArr" w:item="name" w:index="i" class="toggle">{{name}}</repeat>编译为<repeat wx:for="(name,i) in nameArr" class="toggle">{{name}}</repeat>
- 将`<div w:class="{hello:isHe}"></div>`转换
- 将`<div w:style="{'font-size':'12px','color':'#eee'}"></div>`转换