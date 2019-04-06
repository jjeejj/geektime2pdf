/**
 *  生成 PDF 的工具方法
 */
const puppeteer = require('puppeteer');
// const devices = require('puppeteer/DeviceDescriptors');
const path = require('path');
// const iPhone = devices['iPhone 6'];
const utils = require('./utils');
const config = require('./config.js');

/**
 * 生成 pdf
 * @param {Object} data 生产 pdf 需要的文章数据
 * @param {String} filename 生成 pdf 的名称
 * @param {dirname} dirname 生成 pdf 存放的文件夹 名称
 * @param {Oject} options ejs 渲染模版的配置项
 */
async function generaterPdf (data, filename = 'example.pdf', dirname = __dirname, options = {}) {
    console.log('generater pdf start');
    let browser, page;
    try {
        browser = await puppeteer.launch({
            //   headless: false
        });
        page = await browser.newPage();

        await page.setContent(utils.renderEjsArticle2Html(data, options));

        await utils.sleep(1);
        await page.pdf({path: path.resolve(dirname, filename)});
        console.log('generater pdf success');
        // 关闭浏览器资源
        await page.close();
        await browser.close();
    }catch (err){
        console.log('generater pdf err', err);
        await page ? page.close(): '';
        await browser ? browser.close(): '';
    };
};

/**
generaterPdf({
    "articleTitle": "08 | 玩转鼠标操作",
    "articalUrl": "https://time.geekbang.org/column/article/40650",
    "articleCtime": "2018-10-2",
    "articleCover": "https://static001.geekbang.org/resource/image/d5/c7/d5b9907b8e3e860cd16f5297d82336c7.jpg",
    "authorName": "吕鹏",
    "articleNeighbors": {
        "left": {
            "article_title": "37 | 插件开发（六）：VS Code插件维护和发布要点",
            "id": 71299
        },
        "right": []
    },
    "articleContent": "<p>之前我一直说VS Code 非常注重编码中的键盘体验。换句话来说就是，VS Code 非常关心你能不能够使用键盘完成绝大部分操作，从而无需将手从键盘上移动到别的输入设备上。但是这并不意味着 VS Code 只关心键盘的使用体验，毕竟大部分用户都是非常熟悉和喜欢使用鼠标的，更不要说 Mac 上让人无法割舍的触控板体验了。</p>\n<p>那今天我们就一起来聊一聊，如何在 VS Code 中通过鼠标或者触控设备来完成代码阅读和编辑操作。在今天的内容中，我们使用鼠标来代表各种类似鼠标的触控设备。</p>\n<h2>文本选择</h2>\n<p>首先我们来看一下如何使用鼠标快速地选择文本。最简单的方式，也是我们每个人最熟悉的方式，就是按住鼠标左键，然后拖动鼠标，直到选中所有我们想要选择的文字为止，再松开鼠标即可。</p>\n<p>我们在前面的章节学习过，如何通过键盘快捷键快速选中单词行和全文，这在很大程度上提高了我们的编码效率。那是不是说鼠标用户要完成类似的操作，就只能“一点、二拖、三松手”呢？当然不是，VS Code 其实给鼠标也配备了类似的快捷键。</p>\n<p>我们继续使用一段 JavaScript 代码来举例，如下：</p>\n<pre><code>function foo() {\n bar(&quot;Hello World&quot;);\n}\n\nfoo()\n\nfunction bar() {\n \n}\n</code></pre>\n<p>这段代码还是很简单的，你可以把他复制到你的编辑器中和我一起练习。</p>\n<p><span class=\"orange\">在VS Code中，你单击鼠标左键就可以把光标移动到相应的位置。而双击鼠标左键，则会将当前光标下的单词选中。连续三次按下鼠标左键，则会选中当前这一行代码。最后是连续四次按下鼠标左键，则会选中整个文档。</span></p><!-- [[[read_end]]] -->\n<p><img src=\"https://static001.geekbang.org/resource/image/36/d2/36c5b5ef03cb92dc89463c9bf93d0cd2.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">通过鼠标左键完成选中操作</span></center>\n<p>到这里你可能会问，如果我想要使用鼠标，选中其中的多行代码该怎么办？VS Code也考虑到了这个情况，在编辑器的最左边，显示的是每一行的行号。如果你单击行号，就能够直接选中这一行。如果你在某个行号上按下鼠标，然后上下移动，则能够选中多行代码。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/6b/c2/6b857a66d8174d3250ea120d9c06fec2.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">拖动行号栏，选中指定代码行</span></center>\n<h2>文本编辑</h2>\n<p>在 VS Code中，我们除了能够使用鼠标来选择文本以外，还能够使用鼠标对文本进行一定程度的修改，我们把它称为<strong>拖放功能（drag and drop）</strong>。</p>\n<p>比如在今天的示例代码中，我们选中 <code>bar</code> 这个函数，然后将鼠标移到这段选中的代码之上，按下鼠标左键不松开。这时你可以看到，鼠标指针已经从一条竖线，变成了一个箭头。这时候我们移动鼠标的话，就可以把这段文本拖拽到我们想要的位置。</p>\n<p>在移动的过程当中，我们能够在编辑器中看到一个由虚线构成的光标，当我们松开鼠标左键的时候，这段文本就会被移动到这个虚拟的光标所在的位置。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/80/81/80d77242b58c566d10aba989f57e4a81.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">通过鼠标左键移动代码位置</span></center>\n<p>在上面的动图里，我们把 <code>bar</code>这个函数，从文档的末尾移动到了第四行。这个功能就相当于使用键盘进行的“剪切+粘贴”。</p>\n<p>那么能不能使用鼠标进行“复制+粘贴”呢？别担心，VS Code 肯定也会考虑到这个情况的，所以答案是：必须能。</p>\n<p>如果我们在拖拽这段文本的同时，按下 Option 键（Windows 上是 Ctrl 键），鼠标指针上会多一个加号，这时候我们再移动鼠标或虚拟光标至我们想要的位置，然后当我们松开鼠标左键的时候，这段文本将会被复制粘贴到虚拟光标所在的位置，也就是我们既定的目标位置。</p>\n<p>你看，在移动鼠标的过程中，多按了个 Option 键（Windows 上是 Ctrl 键），操作结果就由原来的“剪切+粘贴”变为“复制+粘贴”了。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/87/92/87ede96c10208031ac518e004bc64892.gif\" alt=\"\" /></p>\n<center>鼠标左键拖拽+Option键，复制粘贴代码块</center>\n<h2>多光标</h2>\n<p>在前面第6篇文章中，我们已经学习了如何使用鼠标添加多光标。不得不承认，在鼠标的帮助下，多光标的创建显得格外便捷。我们只需按下 Option 键，然后在需要创建新光标的地方，按下鼠标左键即可。简言之，就是按住 Option 键，然后哪里需要点哪里。</p>\n<p>不过，VS Code 中还有一个更加便捷的鼠标创建多光标的方式。当然，这首先要求你的鼠标拥有中键。你只需按下鼠标中键，然后对着一段文档拖出一个框，在这个框中的代码就都被选中了，而且每一行被选中的代码，都拥有一个独立的光标。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/a8/15/a87e79da2bbfb3ff2d64fae76d01b415.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">利用鼠标中键添加多光标</span></center>\n<p>在第6篇文章中，我们已经尝试了用多种方法去创建光标然后修改代码，现在我们又为鼠标用户多提供了一种更为便捷的操作方式。尝试掌握它们吧，我相信这些便捷操作肯定能为你的高效编程之路尽一份力的。</p>\n<h2>悬停提示窗口</h2>\n<p>相信你在 VS Code 的编辑器里使用鼠标的过程中，早就发现了，当你的鼠标移动到某些文本上之后，稍待片刻就能看到一个悬停提示窗口。这个窗口里会显示跟鼠标下文本相关的信息。</p>\n<p>比如，在我们的示例代码中，当我们把鼠标移动到第五行 <code>foo</code> 上后，悬停提示窗口里展示了 <code>foo</code>的类型信息，它告诉我们 <code>foo</code>是一个函数，不需要任何的参数，返回值是 <code>void</code>。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/d0/c6/d08476ae64108ed9c4b1abeea56890c6.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">了解函数的类型信息</span></center>\n<p>如果我们把鼠标移动到 <code>foo</code> 上面时，按下 Cmd 键（Windows 上是 Ctrl），则能够在悬停提示窗口里直接看到 <code>foo</code>的实现。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/e0/07/e0e08e1dc598cc6e55aeebada0e60f07.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">按下Cmd键，辅助以鼠标，查看函数实现 </span></center>\n<p>我们能看到这样的信息，是因为这个功能也被包含在了 VS Code 的语言接口之中。VS Code 会告诉语言服务，当前鼠标所在位置的信息，语言服务会根据当前的项目情况和代码提供有用的信息。</p>\n<p>在 JavaScript 或者 Java 这样的编程语言中，当我们把鼠标移动到某个变量上时，我们能够看到这个变量的定义信息。而在 CSS 中，当我们把鼠标移动到一个 CSS 规则上时，我们能看到的则是一段能够让这个 CSS 规则生效的 HTML 的样例代码。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/cb/e8/cb79a4548a7452297abce4225effc9e8.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">了解CSS对应的HTML代码样例</span></center>\n<p>当然，除了语言服务，任何 VS Code 上的插件都能够控制悬浮窗口里的内容。</p>\n<h2>代码跳转和链接</h2>\n<p>除了能够使用鼠标进行代码选择、编辑、预览之外，我们还可以借助鼠标来完成跳转操作。不知道你还记得我们之前讲的文件、代码跳转相关的快捷键吗？如果不记得，一定要回去再复习哦。如果记得，今天在这里我再教你如何使用鼠标来完成跳转操作。</p>\n<p>我们还是把鼠标移动到示例代码的第五行 <code>foo</code> 上，然后按下 Cmd 键，这时候 <code>foo</code>下面出现了一个下划线。然后当我们按下鼠标左键，就跳转到了 <code>foo</code>函数的定义处。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/2e/45/2e81558f17eb3390547e6f2af4af9045.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">通过Cmd键和鼠标左键，跳转到函数定义处</span></center>\n<p>当我们在编写 Markdown 这样的非编程语言的文档时，也可以通过 Cmd + 鼠标左键（Windows 上是 Ctrl + 鼠标左键）来打开超级链接。</p>\n<p><img src=\"https://static001.geekbang.org/resource/image/9a/af/9a36a636bc6757fef8ced354b6c48baf.gif\" alt=\"\" /></p>\n<center><span class=\"reference\">通过Cmd键和鼠标左键，打开超级链接</span></center>\n<h2>小结</h2>\n<p>以上就是 VS Code 编辑器中常用的鼠标操作，相对比较简单，当然这并不是全部。之后的章节中，在介绍 VS Code 的其他 UI 组件时，我也还会介绍相应的鼠标快捷操作。</p>\n<p>这一节的内容你还是需要多加练习，然后希望它们能成为你的肌肉记忆。这样，不管你使用任何编辑器，在有鼠标操作的时候，你都可以试试上面的小技巧是否生效。</p>\n<p>最后，欢迎在评论区给我留言，你可以分享对于鼠标操作，你自己珍藏的小技能。当然，有疑问同样可以写到留言区，我会第一时间给你反馈。</p>\n<hr />\n<p><img src=\"https://static001.geekbang.org/resource/image/92/06/92862660523add24b3168f22954fa506.jpg\" alt=\"\" /></p>\n",
    "audioDownloadUrl": "https://res001.geekbang.org/resource/audio/a3/d6/a31321bec73bafeef366f50ae1ac71d6.mp3",
    "audioTitle": "吕鹏8_01_01"
}, '08 | 玩转鼠标操作.pdf', path.resolve(__dirname, config.columnName));
 */

module.exports = generaterPdf;