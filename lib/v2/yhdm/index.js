const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const rootUrl = 'http://www.yinghuacd.com';
    const idUrl = ctx.params.id;
    const currentUrl = `${rootUrl}/show/${idUrl}.html`;
    const response = await got({
        method: 'get',
        url: currentUrl,
    });
        const $ = cheerio.load(response.data);
        let items = $('.movurl>ul>li>a')
        .toArray()
        .map((item) => {
            item = $(item);

            
            return {
                title: item.text(),
                link: `${rootUrl}/${item.attr('href')}`,
            };
        });
 
    ctx.state.data = {
        title: '更新信息',
        link: currentUrl,
        item: items,
    };
};
